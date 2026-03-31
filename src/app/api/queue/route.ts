import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { emitQueueUpdate, emitCallSinger, emitGetReady } from '@/lib/socket'


// GET full queue for an event
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const eventId = searchParams.get('eventId')
  if (!eventId) return NextResponse.json({ error: 'Missing eventId' }, { status: 400 })

  const registrations = await prisma.registration.findMany({
    where: { eventId },
    orderBy: { position: 'asc' },
    include: {
      song: true,
      event: { select: { status: true } },
    },
  })
  return NextResponse.json(registrations)
}

// PATCH — update a registration (status, call singer, reorder)
export async function PATCH(req: Request) {
  const body = await req.json()
  const { action, registrationId, eventId, newPositions } = body

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
      include: { song: true },
    })
    emitQueueUpdate(eventId, { type: 'reorder', registrations })
    return NextResponse.json({ ok: true })
  }

  if (action === 'call' && registrationId) {
    const reg = await prisma.registration.update({
      where: { id: registrationId },
      data: { status: 'CALLED' },
      include: { song: true },
    })
    emitCallSinger(reg.eventId, reg.singerName, reg.song.title)

    // Notify the next WAITING singer to get ready
    const allWaiting = await prisma.registration.findMany({
      where: { eventId: reg.eventId, status: 'WAITING' },
      orderBy: { position: 'asc' },
    })
    if (allWaiting.length > 0) {
      emitGetReady(reg.eventId, allWaiting[0].singerName)
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
    emitQueueUpdate(reg.eventId, { type: 'cancel', registrationId, songId: reg.songId })
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
