import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { emitQueueUpdate, emitCallSinger, emitGetReady } from '@/lib/socket'
import { cookies } from 'next/headers'
import { isAdmin } from '@/lib/admin-auth'
import { singersOf } from '@/lib/groups'


// GET full queue for an event (only confirmed, non-random registrations)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const eventId = searchParams.get('eventId')
  const random = searchParams.get('random') === 'true'
  if (!eventId) return NextResponse.json({ error: 'Missing eventId' }, { status: 400 })

  const registrations = await prisma.registration.findMany({
    where: { eventId, isRandom: random },
    orderBy: { position: 'asc' },
    include: {
      song: true,
      members: { orderBy: { createdAt: 'asc' } },
      event: { select: { status: true } },
    },
  })
  return NextResponse.json(registrations)
}

// PATCH — update a registration (status, call singer, reorder)
export async function PATCH(req: Request) {
  const body = await req.json()
  const { action, registrationId, eventId, newPositions } = body

  // Participants may only cancel their own registration; everything else is admin-only
  const admin = await isAdmin()
  if (!admin && action !== 'cancel') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  if (action === 'reorder' && newPositions) {
    // newPositions: Array<{ id: string, position: number }>
    await prisma.$transaction(
      newPositions.map(({ id, position }: { id: string; position: number }) =>
        prisma.registration.update({ where: { id }, data: { position } })
      )
    )
    // Re-fetch and broadcast updated queue
    const registrations = await prisma.registration.findMany({
      where: { eventId },
      orderBy: { position: 'asc' },
      include: { song: true, members: { orderBy: { createdAt: 'asc' } } },
    })
    emitQueueUpdate(eventId, { type: 'reorder', registrations })
    return NextResponse.json({ ok: true })
  }

  if (action === 'call' && registrationId) {
    const reg = await prisma.registration.update({
      where: { id: registrationId },
      data: { status: 'CALLED' },
      include: { song: true, members: { orderBy: { createdAt: 'asc' } } },
    })
    emitCallSinger(reg.eventId, singersOf(reg), reg.song.title)

    // Notify the next WAITING singer to get ready
    const allWaiting = await prisma.registration.findMany({
      where: { eventId: reg.eventId, status: 'WAITING' },
      orderBy: { position: 'asc' },
      include: { members: true },
    })
    if (allWaiting.length > 0) {
      emitGetReady(reg.eventId, singersOf(allWaiting[0]))
    }

    return NextResponse.json(reg)
  }

  if (action === 'sung' && registrationId) {
    const reg = await prisma.registration.update({
      where: { id: registrationId },
      data: { status: 'SUNG' },
      include: { song: true },
    })
    // Mark event song as sung
    await prisma.eventSong.update({
      where: { eventId_songId: { eventId: reg.eventId, songId: reg.songId } },
      data: { status: 'SUNG' },
    })
    emitQueueUpdate(reg.eventId, { type: 'sung', registrationId })
    return NextResponse.json(reg)
  }

  if (action === 'reset' && registrationId) {
    const reg = await prisma.registration.update({
      where: { id: registrationId },
      data: { status: 'WAITING' },
    })
    emitQueueUpdate(reg.eventId, { type: 'reset', registrationId })
    return NextResponse.json(reg)
  }

  if (action === 'cancel' && registrationId) {
    const reg = await prisma.registration.findUnique({
      where: { id: registrationId },
    })
    if (!reg) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (!admin) {
      // The register route sets this cookie to the singer's name
      const cookieStore = await cookies()
      const owner = cookieStore.get(`karaoke_registered_${reg.eventId}`)?.value
      if (!owner || owner.toLowerCase().trim() !== reg.singerName.toLowerCase().trim()) {
        return NextResponse.json({ error: 'No podés cancelar la inscripción de otra persona' }, { status: 403 })
      }
    }
    // Only allow cancel if not already called or sung
    if (reg.status === 'CALLED' || reg.status === 'SUNG') {
      return NextResponse.json({ error: 'No podés bajarte cuando ya te llamaron o ya cantaste' }, { status: 400 })
    }
    await prisma.$transaction([
      prisma.registration.delete({ where: { id: registrationId } }),
      prisma.eventSong.update({
        where: { eventId_songId: { eventId: reg.eventId, songId: reg.songId } },
        data: { status: 'AVAILABLE' },
      }),
    ])

    // Delete anti-cheat cookie
    if (!admin) {
      const cookieStore = await cookies()
      cookieStore.delete(`karaoke_registered_${reg.eventId}`)
    }

    emitQueueUpdate(reg.eventId, { type: 'cancel', registrationId, songId: reg.songId })
    return NextResponse.json({ ok: true })
  }

  // Admin removes someone who isn't going to sing (left, no-show): the song is freed
  // and, for a group, everyone in it is out
  if (action === 'remove' && registrationId) {
    const reg = await prisma.registration.findUnique({ where: { id: registrationId } })
    if (!reg) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (reg.status === 'SUNG') {
      return NextResponse.json({ error: 'Ya cantó; para eso está Resetear cantantes' }, { status: 400 })
    }
    await prisma.$transaction([
      prisma.registration.delete({ where: { id: registrationId } }),
      prisma.eventSong.updateMany({
        where: { eventId: reg.eventId, songId: reg.songId, status: 'TAKEN' },
        data: { status: 'AVAILABLE' },
      }),
    ])
    emitQueueUpdate(reg.eventId, { type: 'remove', registrationId, songId: reg.songId })
    return NextResponse.json({ ok: true })
  }

  // Admin takes one companion out of a group; the rest keep their turn
  if (action === 'remove_member' && body.memberId) {
    const member = await prisma.groupMember.findUnique({
      where: { id: body.memberId },
      include: { registration: true },
    })
    if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    await prisma.groupMember.delete({ where: { id: member.id } })
    emitQueueUpdate(member.registration.eventId, { type: 'group_leave', registrationId: member.registrationId })
    return NextResponse.json({ ok: true })
  }

  // Singers who already sang can sign up again; their songs stay used
  if (action === 'reset_singers' && eventId) {
    const { count } = await prisma.registration.deleteMany({
      where: { eventId, status: 'SUNG' },
    })
    emitQueueUpdate(eventId, { type: 'reset_singers' })
    return NextResponse.json({ ok: true, count })
  }

  // Sung songs go back on the list; singers who sang keep their "Cantó" record
  if (action === 'reset_songs' && eventId) {
    const { count } = await prisma.eventSong.updateMany({
      where: { eventId, status: 'SUNG' },
      data: { status: 'AVAILABLE' },
    })
    emitQueueUpdate(eventId, { type: 'reset_songs' })
    return NextResponse.json({ ok: true, count })
  }

  if (action === 'call_random' && eventId) {
    // Pick from isRandom registrations that are still WAITING
    const randomRegs = await prisma.registration.findMany({
      where: { eventId, isRandom: true, status: 'WAITING' },
      include: { song: true },
    })
    if (randomRegs.length === 0) {
      return NextResponse.json({ error: 'No hay nadie en el pool random' }, { status: 404 })
    }
    const chosen = randomRegs[Math.floor(Math.random() * randomRegs.length)]

    // Promote to confirmed: clear isRandom flag and mark as CALLED
    await prisma.registration.update({
      where: { id: chosen.id },
      data: { isRandom: false, status: 'CALLED' },
    })

    emitCallSinger(eventId, [chosen.singerName], chosen.song.title)
    emitQueueUpdate(eventId, { type: 'random_called', singerName: chosen.singerName })

    return NextResponse.json({ singerName: chosen.singerName, songTitle: chosen.song.title })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
