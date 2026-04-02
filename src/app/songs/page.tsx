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
  id: string
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
  const isChanging = searchParams.get('change') === '1'

  const [event, setEvent] = useState<EventData | null>(null)
  const [search, setSearch] = useState('')
  const [genreFilter, setGenreFilter] = useState('Todos')
  const [loading, setLoading] = useState(true)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [myRegistration, setMyRegistration] = useState<Registration | null>(null)
  const [waitlistSong, setWaitlistSong] = useState<Song | null>(null)
  const [waitlistMsg, setWaitlistMsg] = useState('')
  const [showRandomModal, setShowRandomModal] = useState(false)
  const [inRandomPool, setInRandomPool] = useState(false)
  const [joiningPool, setJoiningPool] = useState(false)
  const [poolJoinMsg, setPoolJoinMsg] = useState('')

  const { youAreUp, resetYouAreUp, youAreNext, resetYouAreNext, on } = useSocket(eventId, singerName)

  const loadEvent = useCallback(async () => {
    const res = await fetch(`/api/events/${eventId}`)
    const data = await res.json()
    setEvent(data)
    // Check if singer already registered
    const reg = data.registrations?.find(
      (r: Registration) => r.singerName.toLowerCase() === singerName.toLowerCase()
    )
    setMyRegistration(reg || null)
    // If server says not registered, clear any stale localStorage
    if (!reg) {
      const storedReg = localStorage.getItem('karaoke_registration')
      if (storedReg) {
        const stored = JSON.parse(storedReg)
        if (stored.singerName.toLowerCase() === singerName.toLowerCase()) {
          localStorage.removeItem('karaoke_registration')
        }
      }
    }
    // Check if already in random pool
    if (!reg) {
      const poolRes = await fetch(`/api/random-pool?eventId=${eventId}`)
      const poolData = await poolRes.json()
      const inPool = Array.isArray(poolData) && poolData.some(
        (e: { singerName: string }) => e.singerName.toLowerCase() === singerName.toLowerCase()
      )
      setInRandomPool(inPool)
    }
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
    // In change mode, user can pick a new available song even if they already have a registration
    if (myRegistration && !isChanging) return
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
    // If changing song, cancel old registration first
    if (isChanging && myRegistration) {
      const cancelRes = await fetch('/api/queue', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel', registrationId: myRegistration.id, eventId }),
      })
      if (!cancelRes.ok) {
        const err = await cancelRes.json()
        alert(err.error || 'No se pudo cancelar la canción anterior')
        setConfirming(false)
        return
      }
      // Clear localStorage so they can re-enter with a new song
      localStorage.removeItem('karaoke_registration')
    }
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: event.id, singerName, songId: selectedSong.id }),
    })
    const data = await res.json()
    if (res.ok) {
      setMyRegistration(data)
      // Save to localStorage so they can't re-register from home page
      localStorage.setItem('karaoke_registration', JSON.stringify({ registrationId: data.id, singerName, eventId }))
      setSelectedSong(null)
      await loadEvent()
      router.push(`/lyrics?songId=${selectedSong.id}&eventId=${eventId}&name=${encodeURIComponent(singerName)}`)
    } else if (res.status === 409 && data.isFull) {
      // Capacity full — keep selectedSong and show the random pool modal
      setShowRandomModal(true)
      // Don't clear selectedSong — we'll offer to register it as random
    } else {
      alert(data.error || 'Error al registrar')
      setSelectedSong(null)
    }
    setConfirming(false)
  }

  const handleJoinRandom = async () => {
    if (!selectedSong || !event) return
    setJoiningPool(true)
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: event.id, singerName, songId: selectedSong.id, isRandom: true }),
    })
    const data = await res.json()
    if (res.ok) {
      setInRandomPool(true)
      setMyRegistration(data)
      // Save to localStorage so they can't re-register from home page
      localStorage.setItem('karaoke_registration', JSON.stringify({ registrationId: data.id, singerName, eventId }))
      setPoolJoinMsg('✅ ¡Te anotaste! Te avisamos si sos el elegido.')
      setTimeout(() => {
        setShowRandomModal(false)
        setPoolJoinMsg('')
        // Redirect to lyrics so they can see their song
        router.push(`/lyrics?songId=${selectedSong.id}&eventId=${eventId}&name=${encodeURIComponent(singerName)}`)
      }, 2000)
    } else {
      setPoolJoinMsg(data.error || 'No se pudo anotar')
    }
    setJoiningPool(false)
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

  if (youAreNext && !youAreUp) {
    return (
      <div className="gradient-bg min-h-dvh flex flex-col items-center justify-center px-6 text-center">
        <div className="glass-card p-10 w-full max-w-sm slide-up border-yellow-500/40">
          <div className="text-6xl mb-4 animate-bounce">⚡</div>
          <h1 className="font-display text-4xl neon-text-pink mb-3">¡Preparate!</h1>
          <p className="text-xl font-bold text-white mb-2">{singerName}</p>
          <p className="text-slate-300 mb-1">Después de este cantante</p>
          <p className="text-yellow-400 font-semibold">¡subís vos! 🎤</p>
          <button className="btn-secondary mt-8 text-sm" onClick={resetYouAreNext}>
            Ok, entendido
          </button>
        </div>
      </div>
    )
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
            <h1 className="font-display text-3xl neon-text-pink">
              {isChanging ? 'Cambiar canción' : 'Elegí tu canción'}
            </h1>
            <p className="text-slate-400 text-xs">Hola, <span className="text-purple-400 font-semibold">{singerName}</span>!</p>
          </div>
          {myRegistration && !isChanging && (
            <button
              onClick={() => router.push(`/lyrics?songId=${myRegistration.songId}&eventId=${eventId}&name=${encodeURIComponent(singerName)}`)}
              className="badge badge-called text-xs px-3 py-2"
            >
              🎵 Mi canción
            </button>
          )}
          {isChanging && (
            <button
              onClick={() => router.push(`/lyrics?songId=${myRegistration?.songId}&eventId=${eventId}&name=${encodeURIComponent(singerName)}`)}
              className="text-slate-500 text-sm flex items-center gap-1"
            >
              ← Volver
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
        {myRegistration && !isChanging && (
          <div className="glass-card p-4 mb-4 border-purple-500/40">
            <p className="text-sm text-purple-300 font-semibold text-center">
              ✅ Ya elegiste tu canción
            </p>
          </div>
        )}
        {isChanging && (
          <div className="glass-card p-4 mb-4 border-blue-500/40">
            <p className="text-sm text-blue-300 font-semibold text-center">
              🔄 Elegí la canción que querés en cambio
            </p>
          </div>
        )}
        {inRandomPool && !myRegistration && !isChanging && (
          <div className="glass-card p-4 mb-4 border-yellow-500/40">
            <p className="text-sm text-yellow-300 font-semibold text-center">
              🎲 Estás en la lista random — te avisamos si te toca cantar
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
            // In change mode, only available songs are clickable; existing registration doesn't block
            const isDisabled = isChanging ? isSung || isTaken : (!!myRegistration || isSung)

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
            <h2 className="font-display text-3xl neon-text-pink mb-1">{isChanging ? '¿La cambiamos?' : '¿Esta es?'}</h2>
            <p className="text-white text-xl font-bold mb-1">{selectedSong.title}</p>
            <p className="text-slate-400 mb-6">{selectedSong.artist}</p>
            <p className="text-slate-500 text-sm mb-6 text-center">
              {isChanging
                ? 'Tu canción anterior quedará libre y se reservará esta 🔄'
                : 'Una vez que la elegís, la canción queda reservada para vos 🎤'
              }
            </p>
            <div className="flex flex-col gap-3">
              <button className="btn-neon" onClick={handleConfirm} disabled={confirming}>
                {confirming ? (isChanging ? 'Cambiando...' : 'Reservando...') : (isChanging ? '¡Sí, cambiarla! 🔄' : '¡Sí, la quiero! 🎵')}
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

      {/* Random pool modal — shown when capacity is full */}
      {showRandomModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
          <div className="glass-card w-full max-w-sm mx-4 mb-8 p-6 slide-up">
            {poolJoinMsg ? (
              <p className="text-center text-green-400 text-lg py-4">{poolJoinMsg}</p>
            ) : (
              <>
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">🎲</div>
                  <h2 className="font-display text-2xl neon-text-pink mb-2">El cupo está lleno</h2>
                  <p className="text-slate-300 text-sm">
                    Pero no te preocupes, ¡también llamamos cantantes random!
                  </p>
                </div>
                {/* Show the song they chose */}
                {selectedSong && (
                  <div className="bg-white/5 rounded-xl p-4 mb-4 border border-purple-500/20">
                    <p className="text-xs text-slate-500 mb-1">Tu canción elegida</p>
                    <p className="font-bold text-white">{selectedSong.title}</p>
                    <p className="text-slate-400 text-sm">{selectedSong.artist}</p>
                  </div>
                )}
                <div className="bg-yellow-500/5 rounded-xl p-3 mb-5 text-xs text-slate-400 leading-relaxed border border-yellow-500/20">
                  Anotate al pool random con esta canción. Si tenés suerte, el animador te llama y ¡subís a cantarla! 🎤
                </div>
                <div className="flex flex-col gap-3">
                  {inRandomPool ? (
                    <p className="text-center text-yellow-400 font-semibold text-sm">
                      ✅ Ya estás anotado en la lista random
                    </p>
                  ) : (
                    <button
                      className="btn-neon"
                      onClick={handleJoinRandom}
                      disabled={joiningPool || !selectedSong}
                    >
                      {joiningPool ? 'Anotándote...' : '🎲 ¡Anotarme al random!'}
                    </button>
                  )}
                  <button className="btn-secondary" onClick={() => { setShowRandomModal(false); setSelectedSong(null) }}>
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
