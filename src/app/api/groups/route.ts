import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { isAdmin } from '@/lib/admin-auth'
import { findActiveTurn, MAX_GROUP_SIZE } from '@/lib/groups'
import { emitQueueUpdate } from '@/lib/socket'

const participantCookie = (eventId: string) => `karaoke_registered_${eventId}`

const sameName = (a: string, b: string) => a.toLowerCase().trim() === b.toLowerCase().trim()

// GET ?registrationId= — the group code, only for the titular who owns it (or an admin)
export async function GET(req: Request) {
  const registrationId = new URL(req.url).searchParams.get('registrationId')
  if (!registrationId) return NextResponse.json({ error: 'Missing registrationId' }, { status: 400 })

  const reg = await prisma.registration.findUnique({
    where: { id: registrationId },
    omit: { joinCode: false },
  })
  if (!reg) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const owner = (await cookies()).get(participantCookie(reg.eventId))?.value
  if (!(owner && sameName(owner, reg.singerName)) && !(await isAdmin())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }
  return NextResponse.json({ joinCode: reg.joinCode })
}

// POST { action: 'join', eventId, singerName, code } — join a friend's song with their code
// POST { action: 'leave', eventId } — a companion leaves the group they joined
export async function POST(req: Request) {
  const { action, eventId, singerName, code } = await req.json()
  if (!eventId) return NextResponse.json({ error: 'Missing eventId' }, { status: 400 })
  const cookieStore = await cookies()

  if (action === 'join') {
    const name = typeof singerName === 'string' ? singerName.trim() : ''
    if (!name || typeof code !== 'string' || !/^\d{4}$/.test(code)) {
      return NextResponse.json({ error: 'Ingresá el código de 4 números' }, { status: 400 })
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } })
    if (!event || event.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'Event not active' }, { status: 400 })
    }
    if (event.registrationPaused) {
      return NextResponse.json({ error: 'Las inscripciones están pausadas por el momento.' }, { status: 403 })
    }

    // Only groups still waiting to be called accept people; the random pool has no codes
    const reg = await prisma.registration.findFirst({
      where: { eventId, joinCode: code, status: 'WAITING', isRandom: false },
      include: { members: true, song: true },
    })
    if (!reg) {
      return NextResponse.json({ error: 'Código incorrecto, o ese grupo ya no acepta gente' }, { status: 404 })
    }
    if (sameName(reg.singerName, name) || reg.members.some((m) => sameName(m.singerName, name))) {
      return NextResponse.json({ error: 'Ya estás en este grupo' }, { status: 409 })
    }
    if (reg.members.length + 1 >= MAX_GROUP_SIZE) {
      return NextResponse.json({ error: `El grupo está completo (máximo ${MAX_GROUP_SIZE})` }, { status: 409 })
    }

    const turn = await findActiveTurn(eventId, name, { allowSungOwn: true })
    if (turn) {
      return NextResponse.json(
        { error: turn.kind === 'own' ? 'Ya tenés una canción anotada' : 'Ya estás en otro grupo' },
        { status: 409 }
      )
    }

    const member = await prisma.groupMember.create({ data: { registrationId: reg.id, singerName: name } })

    // Two people joining at the same moment could overfill the group
    const size = await prisma.groupMember.count({ where: { registrationId: reg.id } })
    if (size + 1 > MAX_GROUP_SIZE) {
      await prisma.groupMember.delete({ where: { id: member.id } })
      return NextResponse.json({ error: `El grupo está completo (máximo ${MAX_GROUP_SIZE})` }, { status: 409 })
    }

    // Identifies this phone as the companion, so only they can leave the group
    cookieStore.set({
      name: participantCookie(eventId),
      value: name,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    })

    emitQueueUpdate(eventId, { type: 'group_join', registrationId: reg.id })
    return NextResponse.json(
      { registrationId: reg.id, songId: reg.songId, songTitle: reg.song.title, titular: reg.singerName },
      { status: 201 }
    )
  }

  if (action === 'leave') {
    const name = cookieStore.get(participantCookie(eventId))?.value
    if (!name) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

    const membership = await prisma.groupMember.findFirst({
      where: {
        singerName: { equals: name, mode: 'insensitive' },
        registration: { eventId, status: { not: 'SUNG' } },
      },
      include: { registration: true },
    })
    if (!membership) return NextResponse.json({ error: 'No estás en ningún grupo' }, { status: 404 })
    if (membership.registration.status === 'CALLED') {
      return NextResponse.json({ error: 'No podés bajarte cuando ya los llamaron' }, { status: 400 })
    }

    await prisma.groupMember.delete({ where: { id: membership.id } })
    emitQueueUpdate(eventId, { type: 'group_leave', registrationId: membership.registrationId })
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
