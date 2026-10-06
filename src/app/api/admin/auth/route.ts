import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { ADMIN_COOKIE, ADMIN_SESSION_SECONDS, createAdminToken, isAdmin } from '@/lib/admin-auth'

// GET — lets admin pages check whether the session cookie is still valid
export async function GET() {
  return NextResponse.json({ ok: await isAdmin() })
}

export async function POST(req: Request) {
  const { pin } = await req.json()
  const adminPin = process.env.ADMIN_PIN

  if (!adminPin) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }

  if (pin !== adminPin) {
    // Slow down PIN guessing
    await new Promise((r) => setTimeout(r, 1000))
    return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set({
    name: ADMIN_COOKIE,
    value: createAdminToken(adminPin),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_SESSION_SECONDS,
  })
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE)
  return NextResponse.json({ ok: true })
}
