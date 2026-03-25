import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { eventId, singerName, songId } = await req.json()
  if (!eventId || !singerName || !songId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // Check if song is taken
  const eventSong = await prisma.eventSong.findUnique({
    where: { eventId_songId: { eventId, songId } },
  })
  if (!eventSong || eventSong.status === 'AVAILABLE') {
    return NextResponse.json({ error: 'Song is available, just register directly!' }, { status: 400 })
  }

  // Avoid duplicate waitlist entries
  const existing = await prisma.waitlistItem.findFirst({
    where: { eventId, songId, singerName: { equals: singerName, mode: 'insensitive' } },
  })
  if (existing) {
    return NextResponse.json({ error: 'Already on waitlist' }, { status: 409 })
  }

  const item = await prisma.waitlistItem.create({
    data: { eventId, songId, singerName },
    include: { song: true },
  })
  return NextResponse.json(item, { status: 201 })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const eventId = searchParams.get('eventId')
  const songId = searchParams.get('songId')
  if (!eventId || !songId) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }
  const items = await prisma.waitlistItem.findMany({
    where: { eventId, songId },
    orderBy: { createdAt: 'asc' },
  })
  return NextResponse.json(items)
}
