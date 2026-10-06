import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { parseScreenCommand } from '@/lib/screen-commands'
import { emitScreenCommand } from '@/lib/socket'

// POST — relay a control command (view mode, scroll, font size) to the event's big screen
export async function POST(req: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { eventId, command } = await req.json()
  const cmd = parseScreenCommand(command)
  if (!eventId || typeof eventId !== 'string' || !cmd) {
    return NextResponse.json({ error: 'Invalid command' }, { status: 400 })
  }

  emitScreenCommand(eventId, cmd)
  return NextResponse.json({ ok: true })
}
