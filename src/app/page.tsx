'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Event {
  id: string
  name: string
  status: string
}

export default function HomePage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check for stored session
    const stored = sessionStorage.getItem('karaoke_session')
    if (stored) {
      const session = JSON.parse(stored)
      router.replace(`/songs?eventId=${session.eventId}&name=${encodeURIComponent(session.singerName)}`)
      return
    }

    fetch('/api/events/active')
      .then((r) => r.json())
      .then((data) => {
        setEvent(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [router])

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !event) return
    setSubmitting(true)
    setError('')

    // Save session
    sessionStorage.setItem(
      'karaoke_session',
      JSON.stringify({ singerName: name.trim(), eventId: event.id })
    )
    router.push(`/songs?eventId=${event.id}&name=${encodeURIComponent(name.trim())}`)
  }

  if (loading) {
    return (
      <div className="gradient-bg flex items-center justify-center min-h-dvh">
        <div className="neon-text-purple text-2xl animate-pulse">Cargando... 🎤</div>
      </div>
    )
  }

  return (
    <div className="gradient-bg min-h-dvh flex flex-col items-center justify-center px-6 pb-safe">
      <div className="w-full max-w-sm slide-up">
        {/* Logo / Header */}
        <div className="text-center mb-10">
          <div className="text-8xl mb-4">🎤</div>
          <h1 className="font-display text-6xl neon-text-pink mb-2">KaraOK</h1>
          <p className="text-slate-400 text-sm">Karaoke en vivo</p>
        </div>

        {!event ? (
          <div className="glass-card p-8 text-center">
            <div className="text-4xl mb-4">😴</div>
            <h2 className="text-xl font-bold text-slate-300 mb-2">Sin evento activo</h2>
            <p className="text-slate-500 text-sm">
              Aún no hay un evento en curso. ¡Volvé cuando empiece la fiesta!
            </p>
          </div>
        ) : (
          <div className="glass-card p-6">
            <div className="text-center mb-6">
              <span className="badge badge-available mb-3">● EN VIVO</span>
              <h2 className="text-xl font-bold text-white">{event.name}</h2>
            </div>

            <form onSubmit={handleJoin} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  ¿Cómo te llamás?
                </label>
                <input
                  className="input-neon"
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={40}
                  autoFocus
                  autoComplete="off"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="btn-neon"
                disabled={!name.trim() || submitting}
              >
                {submitting ? 'Entrando...' : '¡Quiero cantar! 🎵'}
              </button>
            </form>
          </div>
        )}

        {/* Admin link */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push('/admin')}
            className="text-slate-600 text-xs hover:text-slate-400 transition-colors"
          >
            Administrador
          </button>
        </div>
      </div>
    </div>
  )
}
