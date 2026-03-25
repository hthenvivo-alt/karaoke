import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { pin } = await req.json()
  const adminPin = process.env.ADMIN_PIN

  if (!adminPin) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }

  if (pin === adminPin) {
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 })
}
