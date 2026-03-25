import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET active event
export async function GET() {
  const event = await prisma.event.findFirst({
    where: { status: 'ACTIVE' },
    include: {
      eventSongs: {
        include: { song: true },
        orderBy: { song: { title: 'asc' } },
      },
      registrations: {
        orderBy: { position: 'asc' },
        where: { status: { not: 'SUNG' } },
        include: { song: true },
      },
    },
  })
  return NextResponse.json(event)
}
