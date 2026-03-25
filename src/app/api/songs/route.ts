import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const songs = await prisma.song.findMany({
    orderBy: [{ artist: 'asc' }, { title: 'asc' }],
  })
  return NextResponse.json(songs)
}

export async function POST(req: Request) {
  const { title, artist, genre, lyrics } = await req.json()
  if (!title || !artist) {
    return NextResponse.json({ error: 'title and artist required' }, { status: 400 })
  }
  const song = await prisma.song.create({ data: { title, artist, genre, lyrics } })
  return NextResponse.json(song, { status: 201 })
}
