import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { emitQueueUpdate } from '@/lib/socket'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      eventSongs: {
        include: { song: true },
        orderBy: { song: { title: 'asc' } },
      },
      registrations: {
        orderBy: { position: 'asc' },
        include: { song: true },
      },
    },
  })
  if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(event)
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const { status, name, date } = body

  const event = await prisma.event.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(name && { name }),
      ...(date && { date: new Date(date) }),
    },
  })

  // If activating, close all other active events
  if (status === 'ACTIVE') {
    await prisma.event.updateMany({
      where: { id: { not: id }, status: 'ACTIVE' },
      data: { status: 'CLOSED' },
    })
    emitQueueUpdate(id, { type: 'event:activated', eventId: id })
  }

  return NextResponse.json(event)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.event.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
