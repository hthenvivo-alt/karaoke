import { randomInt } from 'crypto'
import { prisma } from '@/lib/prisma'

export { singersOf } from '@/lib/singers'

export const MAX_GROUP_SIZE = 4 // titular + 3 companions

// What stops someone from taking a new turn:
// - their own registration, even if already sung (that waits for "Resetear cantantes"),
//   unless `allowSungOwn` — someone who sang their own song may still join a group
// - a group they joined that hasn't sung yet (once it sings, the companion is free)
export async function findActiveTurn(eventId: string, singerName: string, { allowSungOwn = false } = {}) {
  const name = { equals: singerName.trim(), mode: 'insensitive' as const }
  const own = await prisma.registration.findFirst({
    where: { eventId, singerName: name, ...(allowSungOwn && { status: { not: 'SUNG' } }) },
  })
  if (own) return { kind: 'own' as const, registration: own }

  const membership = await prisma.groupMember.findFirst({
    where: { singerName: name, registration: { eventId, status: { not: 'SUNG' } } },
    include: { registration: true },
  })
  if (membership) return { kind: 'group' as const, registration: membership.registration }

  return null
}

// A code that no other unsung registration in the event is using
export async function generateJoinCode(eventId: string) {
  for (let attempt = 0; attempt < 20; attempt++) {
    const code = String(randomInt(0, 10000)).padStart(4, '0')
    const clash = await prisma.registration.findFirst({
      where: { eventId, joinCode: code, status: { not: 'SUNG' } },
      select: { id: true },
    })
    if (!clash) return code
  }
  return null
}
