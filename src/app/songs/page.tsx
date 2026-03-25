'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSocket } from '@/hooks/useSocket'

interface Song {
  id: string
  title: string
  artist: string
  genre: string | null
  status: 'AVAILABLE' | 'TAKEN' | 'SUNG'
}

interface EventSong {
  songId: string
  status: 'AVAILABLE' | 'TAKEN' | 'SUNG'
  song: Song
}

interface Registration {
  songId: string
  singerName: string
  position: number
  status: string
}

interface EventData {
  id: string
  name: string
  status: string
  eventSongs: EventSong[]
  registrations: Registration[]
}

function SongsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const eventId = searchParams.get('eventId') || ''
  const singerName = searchParams.get('name') || ''

  const [event, setEvent] = useState<EventData | null>(null)
  const [search, setSearch] = useState('')
  const [genreFilter, setGenreFilter] = useState('Todos')
  const [loading, setLoading] = useState(true)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [myRegistration, setMyRegistration] = useState<Registration | null>(null)
  const [waitlistSong, setWaitlistSong] = useState<Song | null>(null)
  const [waitlistMsg, setWaitlistMsg] = useState('')

  const { youAreUp, resetYouAreUp, on } = useSocket(eventId, singerName)

  const loadEvent = useCallback(async () => {
    const res = await fetch(`/api/events/${eventId}`)
    const data = await res.json()
    setEvent(data)
    // Check if singer already registered
    const reg = data.registrations?.find(
      (r: Registration) => r.singerName.toLowerCase() === singerName.toLowerCase()
    )
    setMyRegistration(reg || null)
    setLoading(false)
  }, [eventId, singerName])

  useEffect(() => {
    if (!eventId || !singerName) {
      router.replace('/')
      return
    }
    loadEvent()
  }, [eventId, singerName, router, loadEvent])

  // Real-time song updates
  useEffect(() => {
    const unsub = on(`song:taken:${eventId}`, () => loadEvent())
    return unsub
  }, [eventId, on, loadEvent])

  const genres = event
    ? ['Todos', ...Array.from(new Set(event.eventSongs.map((es) => es.song.genre).filter(Boolean) as string[]))]
    : ['Todos']

  const filteredSongs = event
    ? event.eventSongs.filter((es) => {
        const matchSearch =
          es.song.title.toLowerCase().includes(search.toLowerCase()) ||
          es.song.artist.toLowerCase().includes(search.toLowerCase())
        const matchGenre = genreFilter === 'Todos' || es.song.genre === genreFilter
        return matchSearch && matchGenre
      })
    : []

  const handleSelectSong = (song: Song, status: string) => {
    if (myRegistration) return
    if (status === 'TAKEN' || status === 'SUNG') {
      if (status === 'TAKEN') {
        setWaitlistSong(song)
      }
      return
    }
    setSelectedSong(song)
  }

  const handleConfirm = async () => {
    if (!selectedSong || !event) return
    setConfirming(true)
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: event.id, singerName, songId: selectedSong.id }),
    })
    const data = await res.json()
    if (res.ok) {
      setMyRegistration(data)
      setSelectedSong(null)
      await loadEvent()
      router.push(`/lyrics?songId=${selectedSong.id}&eventId=${eventId}&name=${encodeURIComponent(singerName)}`)
    } else {
      alert(data.error || 'Error al registrar')
    }
    setConfirming(false)
  }

  const handleWaitlist = async () => {
    if (!waitlistSong || !event) return
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: event.id, singerName, songId: waitlistSong.id }),
    })
    const data = await res.json()
    setWaitlistMsg(res.ok ? '✅ Te anotaste en la lista de espera' : data.error)
    setTimeout(() => {
      setWaitlistSong(null)
      setWaitlistMsg('')
    }, 2000)
  }

  if (youAreUp) {
    return (
      <div className="gradient-bg min-h-dvh flex flex-col items-center justify-center px-6 text-center">
        <div className="youre-up-screen glass-card p-10 w-full max-w-sm">
          <div className="text-6xl mb-4 animate-bounce">🎤</div>
          <h1 className="font-display text-5xl neon-text-pink mb-4">¡ES TU MOMENTO!</h1>
          <p className="text-2xl font-bold text-white mb-2">{singerName}</p>
          <p className="text-slate-400">¡El animador te está llamando!</p>
          <button className="btn-neon mt-8" onClick={resetYouAreUp}>
            ¡Voy! 🎵
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="gradient-bg min-h-dvh flex items-center justify-center">
        <p className="neon-text-purple text-xl animate-pulse">Cargando canciones...</p>
      </div>
    )
  }

  return (
    <div className="gradient-bg min-h-dvh flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 glass-card rounded-none border-x-0 border-t-0 px-4 pt-safe pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="font-display text-3xl neon-text-pink">Elegí tu canción</h1>
            <p className="text-slate-400 text-xs">Hola, <span className="text-purple-400 font-semibold">{singerName}</span>!</p>
          </div>
          {myRegistration && (
            <button
              onClick={() => router.push(`/lyrics?songId=${myRegistration.songId}&eventId=${eventId}&name=${encodeURIComponent(singerName)}`)}
              className="badge badge-called text-xs px-3 py-2"
            >
              🎵 Mi canción
            </button>
          )}
        </div>

        {/* Search */}
        <input
          className="input-neon text-sm py-3"
          placeholder="🔍 Buscar canción o artista..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Genre pills */}
        {genres.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 pt-2 -mx-1 px-1 no-scrollbar">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setGenreFilter(g)}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  genreFilter === g
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'border-slate-700 text-slate-400 hover:border-purple-500'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Songs list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-safe">
        {myRegistration && (
          <div className="glass-card p-4 mb-4 border-purple-500/40">
            <p className="text-sm text-purple-300 font-semibold text-center">
              ✅ Ya elegiste tu canción — posición #{myRegistration.position} en la cola
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {filteredSongs.length === 0 && (
            <p className="text-center text-slate-500 mt-10">No se encontraron canciones</p>
          )}
          {filteredSongs.map(({ song, status }) => {
            const isAvailable = status === 'AVAILABLE'
            const isTaken = status === 'TAKEN'
            const isSung = status === 'SUNG'
            const isDisabled = !!myRegistration || isSung

            return (
              <div
                key={song.id}
                className={`song-card ${isAvailable && !isDisabled ? 'available' : isTaken ? 'taken' : 'sung'}`}
                onClick={() => !isDisabled && handleSelectSong(song, status)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-base truncate">{song.title}</p>
                    <p className="text-slate-400 text-sm truncate">{song.artist}</p>
                    {song.genre && (
                      <p className="text-slate-600 text-xs mt-1">{song.genre}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {isAvailable && !isDisabled && (
                      <span className="badge badge-available">Libre</span>
                    )}
                    {isTaken && (
                      <span className="badge badge-taken">Ocupada</span>
                    )}
                    {isSung && (
                      <span className="badge badge-sung">Cantada</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Confirm modal */}
      {selectedSong && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
          <div className="glass-card w-full max-w-sm mx-4 mb-8 p-6 slide-up">
            <h2 className="font-display text-3xl neon-text-pink mb-1">¿Esta es?</h2>
            <p className="text-white text-xl font-bold mb-1">{selectedSong.title}</p>
            <p className="text-slate-400 mb-6">{selectedSong.artist}</p>
            <p className="text-slate-500 text-sm mb-6 text-center">
              Una vez que la elegís, la canción queda reservada para vos 🎤
            </p>
            <div className="flex flex-col gap-3">
              <button className="btn-neon" onClick={handleConfirm} disabled={confirming}>
                {confirming ? 'Reservando...' : '¡Sí, la quiero! 🎵'}
              </button>
              <button className="btn-secondary" onClick={() => setSelectedSong(null)}>
                Seguir viendo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Waitlist modal */}
      {waitlistSong && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
          <div className="glass-card w-full max-w-sm mx-4 mb-8 p-6 slide-up">
            {waitlistMsg ? (
              <p className="text-center text-green-400 text-lg py-4">{waitlistMsg}</p>
            ) : (
              <>
                <h2 className="font-display text-2xl neon-text-purple mb-1">Canción ocupada</h2>
                <p className="text-white font-bold mb-1">{waitlistSong.title}</p>
                <p className="text-slate-400 text-sm mb-4">{waitlistSong.artist}</p>
                <p className="text-slate-500 text-sm mb-6">
                  Esta canción ya fue elegida. ¿Querés anotarte en la lista de espera por si queda libre?
                </p>
                <div className="flex flex-col gap-3">
                  <button className="btn-neon" onClick={handleWaitlist}>
                    Anotarme en lista de espera
                  </button>
                  <button className="btn-secondary" onClick={() => setWaitlistSong(null)}>
                    Cancelar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SongsPage() {
  return (
    <Suspense>
      <SongsContent />
    </Suspense>
  )
}
