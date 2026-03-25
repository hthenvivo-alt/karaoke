import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Add or remove a song from an event
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: eventId } = await params
  const { songId } = await req.json()
  const item = await prisma.eventSong.create({
    data: { eventId, songId },
    include: { song: true },
  })
  return NextResponse.json(item, { status: 201 })
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: eventId } = await params
  const { songId } = await req.json()
  await prisma.eventSong.delete({
    where: { eventId_songId: { eventId, songId } },
  })
  return NextResponse.json({ ok: true })
}
