import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET — list all singers in the random pool (isRandom registrations)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const eventId = searchParams.get('eventId')
  if (!eventId) return NextResponse.json({ error: 'Missing eventId' }, { status: 400 })

  const entries = await prisma.registration.findMany({
    where: { eventId, isRandom: true },
    orderBy: { createdAt: 'asc' },
    include: { song: true },
  })
  return NextResponse.json(entries)
}
