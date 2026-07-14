import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Add or remove songs from an event
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: eventId } = await params
  const { songId, songIds } = await req.json()

  if (songIds && Array.isArray(songIds)) {
    const data = songIds.map((sid: string) => ({ eventId, songId: sid }))
    await prisma.eventSong.createMany({
      data,
      skipDuplicates: true,
    })
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  if (!songId) {
    return NextResponse.json({ error: 'songId or songIds required' }, { status: 400 })
  }

  const item = await prisma.eventSong.create({
    data: { eventId, songId },
    include: { song: true },
  })
  return NextResponse.json(item, { status: 201 })
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: eventId } = await params
  const { songId, songIds } = await req.json()

  if (songIds && Array.isArray(songIds)) {
    await prisma.eventSong.deleteMany({
      where: { eventId, songId: { in: songIds } },
    })
    return NextResponse.json({ ok: true })
  }

  if (!songId) {
    return NextResponse.json({ error: 'songId or songIds required' }, { status: 400 })
  }

  await prisma.eventSong.delete({
    where: { eventId_songId: { eventId, songId } },
  })
  return NextResponse.json({ ok: true })
}
