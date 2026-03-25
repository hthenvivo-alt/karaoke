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

  const position = myReg
    ? queue.filter((r) => r.status === 'WAITING').findIndex((r) => r.id === myReg.id) + 1
    : null

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

  return (
    <div className="gradient-bg min-h-dvh flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 glass-card rounded-none border-x-0 border-t-0 px-4 pt-safe pt-4 pb-4">
        <button
          onClick={() => router.push(`/songs?eventId=${eventId}&name=${encodeURIComponent(singerName)}`)}
          className="text-slate-500 text-sm mb-3 flex items-center gap-1"
        >
          ← Volver al listado
        </button>

        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl neon-text-pink leading-tight">{song.title}</h1>
            <p className="text-slate-300 font-semibold">{song.artist}</p>
            {song.genre && <p className="text-slate-500 text-xs">{song.genre}</p>}
          </div>
          {myReg && (
            <div className="text-center flex-shrink-0">
              {myReg.status === 'CALLED' ? (
                <span className="badge badge-called">¡AHORA VOS!</span>
              ) : position ? (
                <div>
                  <span className="text-3xl font-display neon-text-purple">#{position}</span>
                  <p className="text-slate-500 text-xs">en la cola</p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Lyrics */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-safe">
        {song.lyrics ? (
          <pre className="lyrics-text">{song.lyrics}</pre>
        ) : (
          <div className="text-center text-slate-500 mt-20">
            <div className="text-4xl mb-4">📋</div>
            <p className="font-semibold text-slate-400">Letra no disponible aún</p>
            <p className="text-sm mt-2">El animador la va a mostrar en pantalla</p>
          </div>
        )}

        {/* Drop-out button — only when WAITING */}
        {myReg && myReg.status === 'WAITING' && (
          <div className="mt-10 pb-4">
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-all active:scale-95"
            >
              🙅 Me quiero bajar
            </button>
          </div>
        )}
      </div>

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
