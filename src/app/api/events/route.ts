import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'desc' },
    include: {
      _count: {
        select: { registrations: true },
      },
    },
  })
  return NextResponse.json(events)
}

export async function POST(req: Request) {
  const { name, date, songIds, maxSingers } = await req.json()
  if (!name || !date) {
    return NextResponse.json({ error: 'name and date are required' }, { status: 400 })
  }

  const event = await prisma.event.create({
    data: {
      name,
      date: new Date(date),
      maxSingers: maxSingers ? parseInt(maxSingers) : 0,
      eventSongs: songIds?.length
        ? {
            create: songIds.map((id: string) => ({ songId: id })),
          }
        : undefined,
    },
    include: { eventSongs: true },
  })

  // If no songs provided, add all active songs to the event
  if (!songIds?.length) {
    const allSongs = await prisma.song.findMany({ where: { active: true } })
    await prisma.eventSong.createMany({
      data: allSongs.map((s) => ({ eventId: event.id, songId: s.id })),
      skipDuplicates: true,
    })
  }

  return NextResponse.json(event, { status: 201 })
}
