'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSocket } from '@/hooks/useSocket'

interface Registration {
  id: string
  singerName: string
  status: string
  song: { title: string; artist: string }
}

interface ActiveEvent {
  id: string
  name: string
}

export default function BigScreenPage() {
  const router = useRouter()
  const [activeEvent, setActiveEvent] = useState<ActiveEvent | null>(null)
  const [queue, setQueue] = useState<Registration[]>([])

  const { on } = useSocket(activeEvent?.id)

  const loadQueue = useCallback(async (eventId: string) => {
    const res = await fetch(`/api/queue?eventId=${eventId}`)
    const data = await res.json()
    setQueue(Array.isArray(data) ? data.filter((r: Registration) => r.status !== 'SUNG') : [])
  }, [])

  useEffect(() => {
    fetch('/api/events/active').then(r => r.json()).then(ev => {
      setActiveEvent(ev)
      if (ev?.id) loadQueue(ev.id)
    })
  }, [loadQueue])

  useEffect(() => {
    if (!activeEvent?.id) return
    const unsub = on(`queue:update:${activeEvent.id}`, () => loadQueue(activeEvent.id))
    return unsub
  }, [activeEvent?.id, on, loadQueue])

  const current = queue.find(r => r.status === 'CALLED') || queue.find(r => r.status === 'WAITING')
  const upcoming = queue.filter(r => r.id !== current?.id && r.status === 'WAITING').slice(0, 5)

  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{ background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #0a0a0f 100%)' }}
    >
      {/* Exit button */}
      <button
        onClick={() => router.push('/admin/dashboard')}
        className="absolute top-4 right-4 text-slate-700 text-xs hover:text-slate-500 z-10"
      >
        ✕ Salir
      </button>

      {/* Header */}
      <div className="text-center pt-12 pb-6 px-8">
        <p className="font-display text-2xl text-slate-600 tracking-widest mb-2">
          {activeEvent?.name || 'KARAOK'}
        </p>
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>

      {/* Current singer */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {current ? (
          <>
            <p className="text-slate-500 text-lg font-semibold tracking-widest uppercase mb-4">
              {current.status === 'CALLED' ? '🎤 Ahora canta' : '🎵 A continuación'}
            </p>
            <div className="big-screen-singer mb-4">
              {current.singerName}
            </div>
            <p className="text-white text-3xl font-bold mb-2">{current.song.title}</p>
            <p className="text-slate-400 text-xl">{current.song.artist}</p>
          </>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">🎤</div>
            <p className="font-display text-4xl text-slate-500">Esperando cantantes...</p>
          </div>
        )}
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div className="px-8 pb-12">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-6" />
          <p className="text-slate-600 text-sm font-semibold tracking-widest uppercase text-center mb-4">
            Próximos
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {upcoming.map((r, i) => (
              <div key={r.id} className="text-center">
                <p className="text-slate-600 text-xs mb-1">#{i + 2}</p>
                <p className="text-slate-300 font-semibold">{r.singerName}</p>
                <p className="text-slate-500 text-sm">{r.song.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
