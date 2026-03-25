'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    })
    if (res.ok) {
      sessionStorage.setItem('admin_auth', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('PIN incorrecto')
    }
    setLoading(false)
  }

  return (
    <div className="gradient-bg min-h-dvh flex items-center justify-center px-6 pb-safe">
      <div className="w-full max-w-sm slide-up">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🔐</div>
          <h1 className="font-display text-5xl neon-text-purple">Admin</h1>
          <p className="text-slate-500 text-sm mt-1">Ingresá el PIN de administrador</p>
        </div>
        <div className="glass-card p-6">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              className="input-neon text-center text-2xl tracking-widest"
              type="password"
              placeholder="● ● ● ●"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              autoFocus
              inputMode="numeric"
            />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button type="submit" className="btn-neon" disabled={!pin || loading}>
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>
        </div>
        <div className="text-center mt-6">
          <button onClick={() => router.push('/')} className="text-slate-600 text-xs hover:text-slate-400">
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  )
}
