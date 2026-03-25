import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { emitSongTaken, emitQueueUpdate } from '@/lib/socket'

export async function POST(req: Request) {
  const { eventId, singerName, songId } = await req.json()

  if (!eventId || !singerName || !songId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // Check if event exists and is active
  const event = await prisma.event.findUnique({ where: { id: eventId } })
  if (!event || event.status !== 'ACTIVE') {
    return NextResponse.json({ error: 'Event not active' }, { status: 400 })
  }

  // Check if song is still available in this event
  const eventSong = await prisma.eventSong.findUnique({
    where: { eventId_songId: { eventId, songId } },
  })
  if (!eventSong || eventSong.status !== 'AVAILABLE') {
    return NextResponse.json({ error: 'Song not available' }, { status: 409 })
  }

  // Check if this singer already has a song
  const existing = await prisma.registration.findFirst({
    where: { eventId, singerName: { equals: singerName, mode: 'insensitive' } },
  })
  if (existing) {
    return NextResponse.json({ error: 'You already registered a song', registration: existing }, { status: 409 })
  }

  // Count existing registrations to set position
  const count = await prisma.registration.count({ where: { eventId } })

  // Enforce capacity limit (0 = unlimited)
  if (event.maxSingers > 0 && count >= event.maxSingers) {
    return NextResponse.json(
      { error: `El evento está lleno (máximo ${event.maxSingers} cantantes)` },
      { status: 409 }
    )
  }


  // Create registration and mark song as taken
  const [registration] = await prisma.$transaction([
    prisma.registration.create({
      data: { eventId, singerName, songId, position: count + 1 },
      include: { song: true },
    }),
    prisma.eventSong.update({
      where: { eventId_songId: { eventId, songId } },
      data: { status: 'TAKEN' },
    }),
  ])

  // Emit real-time events
  emitSongTaken(eventId, songId, singerName)
  emitQueueUpdate(eventId, { type: 'registration', registration })

  return NextResponse.json(registration, { status: 201 })
}
