import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { emitSongTaken, emitQueueUpdate } from '@/lib/socket'
import { cookies } from 'next/headers'
import { findActiveTurn, generateJoinCode } from '@/lib/groups'

export async function POST(req: Request) {
  const { eventId, singerName, songId, isRandom } = await req.json()

  if (!eventId || !singerName || !songId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // Anti-cheat cookie check
  const cookieStore = await cookies()
  const cookieSingerName = cookieStore.get(`karaoke_registered_${eventId}`)?.value
  if (cookieSingerName) {
    const existingFromCookie = await prisma.registration.findFirst({
      where: { eventId, singerName: { equals: cookieSingerName, mode: 'insensitive' } },
    })
    if (existingFromCookie) {
      return NextResponse.json(
        { error: 'Ya te registraste en este evento', registration: existingFromCookie },
        { status: 409 }
      )
    }
  }

  // Check if event exists and is active
  const event = await prisma.event.findUnique({ where: { id: eventId } })
  if (!event || event.status !== 'ACTIVE') {
    return NextResponse.json({ error: 'Event not active' }, { status: 400 })
  }

  if (event.registrationPaused) {
    return NextResponse.json(
      { error: 'Las inscripciones están pausadas por el momento. En un rato te vas a poder seguir anotando.' },
      { status: 403 }
    )
  }

  // Check if song is still available in this event
  const eventSong = await prisma.eventSong.findUnique({
    where: { eventId_songId: { eventId, songId } },
  })
  if (!eventSong || eventSong.status !== 'AVAILABLE') {
    return NextResponse.json({ error: 'Song not available' }, { status: 409 })
  }

  // Check if this singer already has a song (regular or random) or is in a group that hasn't sung
  const turn = await findActiveTurn(eventId, singerName)
  if (turn?.kind === 'own') {
    return NextResponse.json({ error: 'You already registered a song', registration: turn.registration }, { status: 409 })
  }
  if (turn?.kind === 'group') {
    return NextResponse.json(
      { error: 'Ya estás en un grupo. Cuando canten, vas a poder elegir tu canción.' },
      { status: 409 }
    )
  }

  // Random pool entries can't form groups, so they don't get a code
  const joinCode = isRandom ? null : await generateJoinCode(eventId)

  // Count existing NON-random registrations for capacity check
  const count = await prisma.registration.count({ where: { eventId, isRandom: false } })

  // Enforce capacity limit only for confirmed singers (isRandom entries bypass it)
  if (!isRandom && event.maxSingers > 0 && count >= event.maxSingers) {
    return NextResponse.json(
      { error: `El evento está lleno (máximo ${event.maxSingers} cantantes)`, isFull: true },
      { status: 409 }
    )
  }

  // Create registration and mark song as taken
  let registration
  try {
    ;[registration] = await prisma.$transaction([
      prisma.registration.create({
        data: { eventId, singerName, songId, position: count + 1, isRandom: !!isRandom, joinCode },
        include: { song: true, members: true },
        omit: { joinCode: false },
      }),
      prisma.eventSong.update({
        where: { eventId_songId: { eventId, songId } },
        data: { status: 'TAKEN' },
      }),
    ])
  } catch (err) {
    // Someone else grabbed the same song at the same moment
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return NextResponse.json({ error: 'Song not available' }, { status: 409 })
    }
    throw err
  }

  // Set anti-cheat cookie
  cookieStore.set({
    name: `karaoke_registered_${eventId}`,
    value: singerName,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 1 day
  })

  // Emit real-time events
  emitSongTaken(eventId, songId, singerName)
  // The code goes only to the titular, never in the broadcast
  emitQueueUpdate(eventId, { type: 'registration', registration: { ...registration, joinCode: undefined } })

  return NextResponse.json(registration, { status: 201 })
}
