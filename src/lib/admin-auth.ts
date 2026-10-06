import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const ADMIN_COOKIE = 'karaoke_admin'
export const ADMIN_SESSION_SECONDS = 60 * 60 * 12 // 12 hours — covers a full event night

// The PIN doubles as the signing key, so changing ADMIN_PIN logs everyone out
function sign(expiresAt: number, pin: string) {
  return createHmac('sha256', pin).update(`admin:${expiresAt}`).digest('hex')
}

export function createAdminToken(pin: string) {
  const expiresAt = Date.now() + ADMIN_SESSION_SECONDS * 1000
  return `${expiresAt}.${sign(expiresAt, pin)}`
}

export async function isAdmin() {
  const pin = process.env.ADMIN_PIN
  if (!pin) return false

  const token = (await cookies()).get(ADMIN_COOKIE)?.value
  if (!token) return false

  const [expiresRaw, signature] = token.split('.')
  const expiresAt = Number(expiresRaw)
  if (!signature || !Number.isFinite(expiresAt) || expiresAt < Date.now()) return false

  const expected = Buffer.from(sign(expiresAt, pin))
  const given = Buffer.from(signature)
  return expected.length === given.length && timingSafeEqual(expected, given)
}

// Returns a 401 response when the caller is not an admin, otherwise null
export async function requireAdmin() {
  if (await isAdmin()) return null
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}
