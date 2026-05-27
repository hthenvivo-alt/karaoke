'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSocket } from '@/hooks/useSocket'

interface Registration {
  id: string
  singerName: string
  position: number
  status: 'WAITING' | 'CALLED' | 'SUNG'
  song: { id: string; title: string; artist: string }
}

interface RandomPoolEntry {
  id: string
  singerName: string
}

interface ActiveEvent {
  id: string
  name: string
  registrationPaused: boolean
}

function QueueItem({
  reg,
  index,
  total,
  onCall,
  onSung,
  onReset,
  onMove,
}: {
  reg: Registration
  index: number
  total: number
  onCall: (id: string) => void
  onSung: (id: string) => void
  onReset: (id: string) => void
  onMove: (id: string, direction: 'up' | 'down') => void
}) {
  return (
    <div className={`glass-card p-4 ${reg.status === 'SUNG' ? 'opacity-40' : ''}`}>
      <div className="flex items-center gap-3">
        {/* Up/Down arrows */}
        <div className="flex flex-col gap-1 flex-shrink-0">
          <button
            onClick={() => onMove(reg.id, 'up')}
            disabled={index === 0}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-700 text-slate-400 hover:border-purple-500 hover:text-purple-300 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-90 text-sm"
          >
            ▲
          </button>
          <button
            onClick={() => onMove(reg.id, 'down')}
            disabled={index === total - 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-700 text-slate-400 hover:border-purple-500 hover:text-purple-300 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-90 text-sm"
          >
            ▼
          </button>
        </div>

        {/* Singer info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {reg.status === 'CALLED' && <span className="badge badge-called">¡AHORA!</span>}
            {reg.status === 'WAITING' && <span className="badge badge-waiting">Esperando</span>}
            {reg.status === 'SUNG' && <span className="badge badge-sung">Cantó</span>}
          </div>
          <p className="font-bold text-white">{reg.singerName}</p>
          <p className="text-slate-400 text-sm truncate">{reg.song.title} — {reg.song.artist}</p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          {reg.status !== 'SUNG' && (
            <>
              {reg.status !== 'CALLED' ? (
                <button
                  onClick={() => onCall(reg.id)}
                  className="badge badge-called px-3 py-1.5 text-xs cursor-pointer hover:scale-105 transition-transform"
                >
                  🎤 Llamar
                </button>
              ) : (
                <button
                  onClick={() => onReset(reg.id)}
                  className="badge badge-waiting px-3 py-1.5 text-xs cursor-pointer"
                >
                  ↩ Esperar
                </button>
              )}
              <button
                onClick={() => onSung(reg.id)}
                className="badge badge-sung px-3 py-1.5 text-xs cursor-pointer hover:scale-105 transition-transform"
              >
                ✓ Cantó
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminQueuePage() {
  const router = useRouter()
  const [activeEvent, setActiveEvent] = useState<ActiveEvent | null>(null)
  const [queue, setQueue] = useState<Registration[]>([])
  const [randomPool, setRandomPool] = useState<RandomPoolEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [showSung, setShowSung] = useState(false)
  const [callingRandom, setCallingRandom] = useState(false)
  const [lastCalledRandom, setLastCalledRandom] = useState<string | null>(null)

  // Operator screen controls
  const [scrolling, setScrolling] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(2)
  const [fontSize, setFontSize] = useState(56)
  const [bigScreenMode, setBigScreenMode] = useState<'lyrics' | 'singer_intro'>('lyrics')
  const channelRef = useRef<BroadcastChannel | null>(null)

  useEffect(() => {
    channelRef.current = new BroadcastChannel('karaoke_operator')
    return () => channelRef.current?.close()
  }, [])

  const sendCmd = (cmd: object) => channelRef.current?.postMessage(cmd)

  const { on } = useSocket(activeEvent?.id)

  const loadQueue = useCallback(async (eventId: string) => {
    const [queueRes, poolRes] = await Promise.all([
      fetch(`/api/queue?eventId=${eventId}`),
      fetch(`/api/random-pool?eventId=${eventId}`),
    ])
    const queueData = await queueRes.json()
    const poolData = await poolRes.json()
    setQueue(Array.isArray(queueData) ? queueData : [])
    setRandomPool(Array.isArray(poolData) ? poolData : [])
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('admin_auth')) {
      router.replace('/admin')
      return
    }
    fetch('/api/events/active')
      .then(r => r.json())
      .then(event => {
        setActiveEvent(event)
        if (event?.id) return loadQueue(event.id)
      })
      .finally(() => setLoading(false))
  }, [router, loadQueue])

  useEffect(() => {
    if (!activeEvent?.id) return
    const unsub = on(`queue:update:${activeEvent.id}`, () => {
      loadQueue(activeEvent.id)
      fetch('/api/events/active')
        .then(r => r.json())
        .then(event => {
          if (event) setActiveEvent(event)
        })
    })
    return unsub
  }, [activeEvent?.id, on, loadQueue])

  const handleCall = async (id: string) => {
    if (!activeEvent) return
    await fetch('/api/queue', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'call', registrationId: id, eventId: activeEvent.id }),
    })
    await loadQueue(activeEvent.id)
    setBigScreenMode('singer_intro')
    sendCmd({ type: 'set_view_mode', value: 'singer_intro' })
  }

  const handleSung = async (id: string) => {
    if (!activeEvent) return
    await fetch('/api/queue', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'sung', registrationId: id, eventId: activeEvent.id }),
    })
    await loadQueue(activeEvent.id)
  }

  const handleReset = async (id: string) => {
    if (!activeEvent) return
    await fetch('/api/queue', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset', registrationId: id, eventId: activeEvent.id }),
    })
    await loadQueue(activeEvent.id)
  }

  const handleMove = async (id: string, direction: 'up' | 'down') => {
    if (!activeEvent) return
    const waiting = queue.filter(r => r.status !== 'SUNG')
    const idx = waiting.findIndex(r => r.id === id)
    if (idx === -1) return
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= waiting.length) return

    const reordered = [...waiting]
    ;[reordered[idx], reordered[swapIdx]] = [reordered[swapIdx], reordered[idx]]
    const sung = queue.filter(r => r.status === 'SUNG')
    setQueue([...reordered, ...sung])

    const newPositions = reordered.map((r, i) => ({ id: r.id, position: i + 1 }))
    await fetch('/api/queue', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reorder', eventId: activeEvent.id, newPositions }),
    })
  }

  const handleCallRandom = async () => {
    if (!activeEvent || callingRandom) return
    setCallingRandom(true)
    setLastCalledRandom(null)
    const res = await fetch('/api/queue', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'call_random', eventId: activeEvent.id }),
    })
    const data = await res.json()
    if (res.ok) {
      setLastCalledRandom(data.singerName)
      await loadQueue(activeEvent.id)
      setBigScreenMode('singer_intro')
      sendCmd({ type: 'set_view_mode', value: 'singer_intro' })
    } else {
      alert(data.error || 'Error al llamar random')
    }
    setCallingRandom(false)
  }

  const handleTogglePause = async () => {
    if (!activeEvent) return
    const newPausedState = !activeEvent.registrationPaused

    setActiveEvent(prev => prev ? { ...prev, registrationPaused: newPausedState } : null)

    const res = await fetch(`/api/events/${activeEvent.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registrationPaused: newPausedState }),
    })

    if (!res.ok) {
      setActiveEvent(prev => prev ? { ...prev, registrationPaused: !newPausedState } : null)
      alert('Error al cambiar el estado de inscripciones')
    }
  }

  const waiting = queue.filter(r => r.status !== 'SUNG')
  const sung = queue.filter(r => r.status === 'SUNG')

  if (loading) {
    return (
      <div className="gradient-bg min-h-dvh flex items-center justify-center">
        <p className="neon-text-purple animate-pulse">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="gradient-bg min-h-dvh flex flex-col">
      <div className="glass-card rounded-none border-x-0 border-t-0 px-4 pt-safe pt-4 pb-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <button onClick={() => router.push('/admin/dashboard')} className="text-slate-500 text-sm mb-1">← Dashboard</button>
            <h1 className="font-display text-3xl neon-text-purple">Cola en vivo</h1>
            {activeEvent && <p className="text-slate-400 text-xs">{activeEvent.name}</p>}
          </div>
          <div className="text-right flex gap-4">
            <div>
              <div className="text-2xl font-display neon-text-pink">{waiting.length}</div>
              <div className="text-slate-500 text-xs">pendientes</div>
            </div>
            {randomPool.length > 0 && (
              <div>
                <div className="text-2xl font-display text-yellow-400">{randomPool.length}</div>
                <div className="text-slate-500 text-xs">randoms</div>
              </div>
            )}
          </div>
        </div>

        {/* Operator screen controls */}
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2 flex-wrap">
          <span className="text-slate-600 text-xs font-semibold tracking-widest uppercase">📺 Pantalla</span>
          <button
            onClick={() => window.open('/admin/operator', 'karaoke_operator', 'width=1280,height=800,menubar=no,toolbar=no,location=no,scrollbars=yes,resizable=yes')}
            className="text-xs px-2 py-1 rounded-lg border border-slate-700 text-slate-400 hover:border-purple-500 hover:text-purple-300 transition-all"
          >
            Abrir ↗
          </button>
          <div className="w-px h-4 bg-slate-800" />
          <button
            onClick={() => { setBigScreenMode('singer_intro'); sendCmd({ type: 'set_view_mode', value: 'singer_intro' }) }}
            className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all ${
              bigScreenMode === 'singer_intro'
                ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                : 'border-slate-700 text-slate-400 hover:border-purple-500'
            }`}
          >
            👤 Nombre
          </button>
          <button
            onClick={() => { setBigScreenMode('lyrics'); sendCmd({ type: 'set_view_mode', value: 'lyrics' }) }}
            className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all ${
              bigScreenMode === 'lyrics'
                ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                : 'border-slate-700 text-slate-400 hover:border-purple-500'
            }`}
          >
            🎵 Letra
          </button>
          <div className="w-px h-4 bg-slate-800" />
          <button
            onClick={() => { sendCmd({ type: 'scroll_top' }); setScrolling(false); setBigScreenMode('lyrics'); sendCmd({ type: 'set_view_mode', value: 'lyrics' }) }}
            className="text-xs px-2 py-1 rounded-lg border border-slate-700 text-slate-400 hover:border-slate-500 transition-all"
          >⬆ Top</button>
          <button
            onClick={() => {
              const next = !scrolling
              setScrolling(next)
              setBigScreenMode('lyrics')
              sendCmd({ type: 'set_view_mode', value: 'lyrics' })
              sendCmd({ type: next ? 'play' : 'pause' })
            }}
            className={`text-xs px-3 py-1 rounded-lg border font-semibold transition-all ${
              scrolling
                ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                : 'border-slate-700 text-slate-400 hover:border-purple-500'
            }`}
          >
            {scrolling ? '⏸ Pausar' : '▶ Auto-scroll'}
          </button>
          <span className="text-slate-700 text-xs">Vel.</span>
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => { setScrollSpeed(s); sendCmd({ type: 'speed', value: s }) }}
              className={`w-7 h-7 rounded-lg border text-xs font-bold transition-all ${
                scrollSpeed === s
                  ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                  : 'border-slate-800 text-slate-600 hover:border-slate-600'
              }`}
            >{s}</button>
          ))}
          <div className="w-px h-4 bg-slate-800" />
          <span className="text-slate-700 text-xs">Letra</span>
          <button
            onClick={() => { const v = Math.max(fontSize - 4, 16); setFontSize(v); sendCmd({ type: 'font_size', value: v }) }}
            className="text-xs px-2 py-1 rounded-lg border border-slate-700 text-slate-400 hover:border-slate-500 transition-all"
          >A−</button>
          <span className="text-slate-600 text-xs w-6 text-center">{fontSize}</span>
          <button
            onClick={() => { const v = Math.min(fontSize + 4, 96); setFontSize(v); sendCmd({ type: 'font_size', value: v }) }}
            className="text-xs px-2 py-1 rounded-lg border border-slate-700 text-slate-400 hover:border-slate-500 transition-all"
          >A+</button>
        </div>

        {/* Registration status / Pause control */}
        {activeEvent && (
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-semibold tracking-widest uppercase">📝 Inscripciones</span>
              {activeEvent.registrationPaused ? (
                <span className="badge badge-taken px-2 py-0.5 text-[10px] animate-pulse">PAUSADAS</span>
              ) : (
                <span className="badge badge-available px-2 py-0.5 text-[10px]">ABIERTAS</span>
              )}
            </div>
            <button
              onClick={handleTogglePause}
              className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition-all active:scale-95 ${
                activeEvent.registrationPaused
                  ? 'border-green-500 bg-green-500/10 text-green-300 hover:bg-green-500/20'
                  : 'border-yellow-500 bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20'
              }`}
            >
              {activeEvent.registrationPaused ? '▶ Habilitar inscripciones' : '⏸ Pausar inscripciones'}
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-safe">
        {!activeEvent ? (
          <div className="text-center mt-20">
            <p className="text-slate-400 text-lg">No hay evento activo</p>
            <button onClick={() => router.push('/admin/events')} className="btn-neon mt-4 max-w-xs mx-auto">
              Ir a eventos
            </button>
          </div>
        ) : waiting.length === 0 && sung.length === 0 && randomPool.length === 0 ? (
          <div className="text-center mt-20">
            <div className="text-4xl mb-4">🎵</div>
            <p className="text-slate-400">Nadie se anotó todavía</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              {waiting.map((reg, i) => (
                <QueueItem
                  key={reg.id}
                  reg={reg}
                  index={i}
                  total={waiting.length}
                  onCall={handleCall}
                  onSung={handleSung}
                  onReset={handleReset}
                  onMove={handleMove}
                />
              ))}
            </div>

            {/* Random pool section */}
            {randomPool.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-yellow-400 text-sm font-semibold">🎲 Pool Random ({randomPool.length})</span>
                  <span className="text-slate-600 text-xs">— esperando ser elegidos al azar</span>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  {randomPool.map(entry => (
                    <div key={entry.id} className="flex items-center gap-3 rounded-xl px-3 py-2 bg-yellow-500/5 border border-yellow-500/20">
                      <span className="text-yellow-400 text-sm">🎲</span>
                      <span className="text-slate-300 text-sm font-medium">{entry.singerName}</span>
                    </div>
                  ))}
                </div>
                {lastCalledRandom && (
                  <div className="glass-card p-3 mb-3 border-green-500/40 text-center">
                    <p className="text-green-400 text-sm font-semibold">
                      🎤 ¡{lastCalledRandom} fue llamado al azar!
                    </p>
                  </div>
                )}
                <button
                  onClick={handleCallRandom}
                  disabled={callingRandom}
                  className="w-full py-4 rounded-xl border-2 border-yellow-500/50 bg-yellow-500/10 text-yellow-300 font-bold text-base hover:bg-yellow-500/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {callingRandom ? 'Eligiendo...' : '🎲 Llamar un random'}
                </button>
              </div>
            )}

            {sung.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={() => setShowSung(!showSung)}
                  className="btn-secondary text-sm"
                >
                  {showSung ? 'Ocultar' : 'Ver'} ya cantaron ({sung.length})
                </button>
                {showSung && (
                  <div className="flex flex-col gap-2 mt-3">
                    {sung.map(reg => (
                      <div key={reg.id} className="glass-card p-3 opacity-40">
                        <p className="font-semibold text-white text-sm">{reg.singerName}</p>
                        <p className="text-slate-400 text-xs">{reg.song.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
