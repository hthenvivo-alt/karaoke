import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const song = await prisma.song.findUnique({ where: { id } })
  if (!song) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(song)
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const song = await prisma.song.update({
    where: { id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.artist !== undefined && { artist: body.artist }),
      ...(body.genre !== undefined && { genre: body.genre }),
      ...(body.lyrics !== undefined && { lyrics: body.lyrics }),
      ...(body.active !== undefined && { active: body.active }),
    },
  })
  return NextResponse.json(song)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.song.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
