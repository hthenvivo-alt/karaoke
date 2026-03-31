'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSocket } from '@/hooks/useSocket'

interface Song {
  id: string
  title: string
  artist: string
  genre: string | null
  lyrics: string | null
}

interface Registration {
  id: string
  position: number
  status: string
  singerName: string
  song?: { title: string; artist: string }
  songId?: string
}

function LyricsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const songId = searchParams.get('songId') || ''
  const eventId = searchParams.get('eventId') || ''
  const singerName = searchParams.get('name') || ''

  const [song, setSong] = useState<Song | null>(null)
  const [myReg, setMyReg] = useState<Registration | null>(null)
  const [queue, setQueue] = useState<Registration[]>([])
  const [cancelling, setCancelling] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSingers, setShowSingers] = useState(false)
  const { youAreUp, resetYouAreUp, on } = useSocket(eventId, singerName)

  const loadData = useCallback(async () => {
    const [songRes, queueRes] = await Promise.all([
      fetch(`/api/songs/${songId}`),
      fetch(`/api/queue?eventId=${eventId}`),
    ])
    const songData = await songRes.json()
    const queueData = await queueRes.json()
    setSong(songData)
    const allQueue = Array.isArray(queueData) ? queueData : []
    setQueue(allQueue.filter((r: Registration) => r.status !== 'SUNG'))
    const reg = allQueue.find(
      (r: Registration) => r.singerName.toLowerCase() === singerName.toLowerCase()
    )
    setMyReg(reg || null)
  }, [songId, eventId, singerName])

  useEffect(() => {
    if (!songId || !eventId) { router.replace('/'); return }
    loadData()
  }, [songId, eventId, router, loadData])

  useEffect(() => {
    const unsub = on(`queue:update:${eventId}`, () => loadData())
    return unsub
  }, [eventId, on, loadData])

  const handleCancel = async () => {
    if (!myReg) return
    setCancelling(true)
    const res = await fetch('/api/queue', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'cancel', registrationId: myReg.id, eventId }),
    })
    if (res.ok) {
      sessionStorage.removeItem('karaoke_session')
      router.replace('/')
    } else {
      const data = await res.json()
      alert(data.error || 'No se pudo cancelar')
      setCancelling(false)
      setShowConfirm(false)
    }
  }

  const handleChangeSong = () => {
    // Go back to songs list so user can pick another available song.
    // We need to allow re-picking, so we temporarily keep session but remove registration.
    router.push(`/songs?eventId=${eventId}&name=${encodeURIComponent(singerName)}&change=1`)
  }

  if (youAreUp) {
    return (
      <div className="gradient-bg min-h-dvh flex flex-col items-center justify-center px-6 text-center">
        <div className="youre-up-screen glass-card p-10 w-full max-w-sm">
          <div className="text-6xl mb-4 animate-bounce">🎤</div>
          <h1 className="font-display text-5xl neon-text-pink mb-4">¡ES TU MOMENTO!</h1>
          <p className="text-2xl font-bold text-white mb-2">{singerName}</p>
          <p className="text-slate-400 mb-2">¡El animador te está llamando!</p>
          {song && <p className="text-purple-300 font-semibold">{song.title} — {song.artist}</p>}
          <button className="btn-neon mt-8" onClick={resetYouAreUp}>
            ¡Voy! 🎵
          </button>
        </div>
      </div>
    )
  }

  if (!song) {
    return (
      <div className="gradient-bg min-h-dvh flex items-center justify-center">
        <p className="neon-text-purple animate-pulse">Cargando...</p>
      </div>
    )
  }

  const waitingQueue = queue.filter((r) => r.status === 'WAITING')

  return (
    <div className="gradient-bg min-h-dvh flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 glass-card rounded-none border-x-0 border-t-0 px-4 pt-safe pt-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl neon-text-pink leading-tight">{song.title}</h1>
            <p className="text-slate-300 font-semibold">{song.artist}</p>
            {song.genre && <p className="text-slate-500 text-xs">{song.genre}</p>}
          </div>
          {myReg?.status === 'CALLED' && (
            <span className="badge badge-called flex-shrink-0">¡AHORA VOS!</span>
          )}
        </div>
      </div>

      {/* Lyrics */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-32">
        {song.lyrics ? (
          <pre className="lyrics-text">{song.lyrics}</pre>
        ) : (
          <div className="text-center text-slate-500 mt-20">
            <div className="text-4xl mb-4">📋</div>
            <p className="font-semibold text-slate-400">Letra no disponible aún</p>
            <p className="text-sm mt-2">El animador la va a mostrar en pantalla</p>
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      {myReg && myReg.status === 'WAITING' && (
        <div className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-safe pb-6 pt-3 glass-card rounded-none border-x-0 border-b-0">
          <div className="flex flex-col gap-2 max-w-sm mx-auto">
            {/* Row 1: Ver cantantes + Cambiar canción */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowSingers(true)}
                className="flex-1 py-3 rounded-xl border border-purple-500/40 bg-purple-500/10 text-purple-300 text-sm font-semibold hover:bg-purple-500/20 transition-all active:scale-95 flex items-center justify-center gap-1"
              >
                👥 Ver cantantes
              </button>
              <button
                onClick={handleChangeSong}
                className="flex-1 py-3 rounded-xl border border-blue-500/40 bg-blue-500/10 text-blue-300 text-sm font-semibold hover:bg-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-1"
              >
                🔄 Cambiar canción
              </button>
            </div>
            {/* Row 2: Me quiero bajar */}
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-all active:scale-95"
            >
              🙅 Me quiero bajar
            </button>
          </div>
        </div>
      )}

      {/* Singers list panel */}
      {showSingers && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
          <div className="glass-card w-full max-w-sm mx-4 mb-8 p-6 slide-up max-h-[70vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl neon-text-purple">Cantantes 🎤</h2>
              <button
                onClick={() => setShowSingers(false)}
                className="text-slate-400 hover:text-white text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-500 text-xs text-center mb-3 italic">
              El orden de la lista no indica un orden para subir a cantar
            </p>
            <div className="overflow-y-auto flex-1 flex flex-col gap-2">
              {waitingQueue.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-6">No hay cantantes en la cola aún</p>
              ) : (
                waitingQueue.map((r) => {
                  const isMe = r.singerName.toLowerCase() === singerName.toLowerCase()
                  return (
                    <div
                      key={r.id}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 ${
                        isMe
                          ? 'bg-purple-500/20 border border-purple-500/40'
                          : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${isMe ? 'text-purple-300' : 'text-white'}`}>
                          {r.singerName} {isMe && '(vos)'}
                        </p>
                        {r.song && (
                          <p className="text-slate-500 text-xs truncate">
                            {r.song.title} — {r.song.artist}
                          </p>
                        )}
                      </div>
                      {isMe && (
                        <span className="text-purple-400 text-xs">⭐</span>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirm drop-out modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
          <div className="glass-card w-full max-w-sm mx-4 mb-8 p-6 slide-up">
            <h2 className="font-display text-2xl neon-text-pink mb-2">¿Seguro?</h2>
            <p className="text-slate-300 mb-1">Vas a cancelar tu inscripción para:</p>
            <p className="font-bold text-white mb-1">{song?.title}</p>
            <p className="text-slate-400 text-sm mb-6">{song?.artist}</p>
            <p className="text-slate-500 text-xs mb-6 text-center">
              La canción va a quedar libre para que otra persona la elija.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="w-full py-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-bold text-sm hover:bg-red-500/30 transition-all"
              >
                {cancelling ? 'Cancelando...' : 'Sí, me bajo 🙅'}
              </button>
              <button className="btn-secondary" onClick={() => setShowConfirm(false)}>
                No, me quedo 🎵
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function LyricsPage() {
  return (
    <Suspense>
      <LyricsContent />
    </Suspense>
  )
}
