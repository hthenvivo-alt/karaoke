import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'desc' },
    include: {
      _count: {
        select: { registrations: true, eventSongs: true },
      },
    },
  })
  return NextResponse.json(events)
}

export async function POST(req: Request) {
  const { name, date, songIds, maxSingers, replicateFromEventId } = await req.json()
  if (!name || !date) {
    return NextResponse.json({ error: 'name and date are required' }, { status: 400 })
  }

  let finalSongIds = songIds

  if (replicateFromEventId) {
    const originalEventSongs = await prisma.eventSong.findMany({
      where: { eventId: replicateFromEventId },
      select: { songId: true },
    })
    finalSongIds = originalEventSongs.map((es) => es.songId)
  }

  const event = await prisma.event.create({
    data: {
      name,
      date: new Date(date),
      maxSingers: maxSingers ? parseInt(maxSingers) : 0,
      eventSongs: finalSongIds?.length
        ? {
            create: finalSongIds.map((id: string) => ({ songId: id })),
          }
        : undefined,
    },
  })

  // If no songs provided AND it's not replicated (meaning we want a clean default start),
  // add all active songs to the event.
  if (!replicateFromEventId && !finalSongIds?.length) {
    const allSongs = await prisma.song.findMany({ where: { active: true } })
    await prisma.eventSong.createMany({
      data: allSongs.map((s) => ({ eventId: event.id, songId: s.id })),
      skipDuplicates: true,
    })
  }

  // Refetch to include counts so the dashboard renders the details immediately
  const eventWithCount = await prisma.event.findUnique({
    where: { id: event.id },
    include: {
      _count: {
        select: { registrations: true, eventSongs: true },
      },
    },
  })

  return NextResponse.json(eventWithCount, { status: 201 })
}
