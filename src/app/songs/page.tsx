'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSocket } from '@/hooks/useSocket'
import { isSingerIn } from '@/lib/singers'


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
  members?: { singerName: string }[]
  position: number
  status: string
}

interface EventData {
  id: string
  name: string
  status: string
  registrationPaused: boolean
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
  const [pendingSongId, setPendingSongId] = useState<string | null>(null)
  const [myRegistration, setMyRegistration] = useState<Registration | null>(null)
  const [showRandomModal, setShowRandomModal] = useState(false)
  const [inRandomPool, setInRandomPool] = useState(false)
  const [joiningPool, setJoiningPool] = useState(false)
  const [poolJoinMsg, setPoolJoinMsg] = useState('')
  const [showJoinGroup, setShowJoinGroup] = useState(false)
  const [groupCode, setGroupCode] = useState('')
  const [joiningGroup, setJoiningGroup] = useState(false)
  const [joinGroupError, setJoinGroupError] = useState('')

  const { youAreUp, resetYouAreUp, youAreNext, resetYouAreNext, on } = useSocket(eventId, singerName)

  const loadEvent = useCallback(async () => {
    const res = await fetch(`/api/events/${eventId}`)
    const data = await res.json()
    setEvent(data)
    // Check if singer already registered, either with their own song or in a group that hasn't sung
    const regs: Registration[] = data.registrations ?? []
    const reg =
      regs.find((r) => r.singerName.toLowerCase() === singerName.toLowerCase()) ||
      regs.find((r) => r.status !== 'SUNG' && isSingerIn(r, singerName))
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

  // Real-time updates (song taken or registration paused/queue updated)
  useEffect(() => {
    const unsubTaken = on(`song:taken:${eventId}`, () => loadEvent())
    const unsubQueue = on(`queue:update:${eventId}`, () => loadEvent())
    return () => {
      unsubTaken?.()
      unsubQueue?.()
    }
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

  // Reserves the song right away, no confirmation step. asGroup shows the code to share next.
  const handleRegister = async (song: Song, asGroup: boolean) => {
    if (!event || confirming) return
    setConfirming(true)
    setPendingSongId(song.id)
    // Changing song keeps the same registration: same place in the queue, same group
    if (isChanging && myRegistration) {
      const changeRes = await fetch('/api/queue', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'change_song', registrationId: myRegistration.id, songId: song.id, eventId }),
      })
      if (changeRes.ok) {
        if (asGroup) localStorage.setItem('karaoke_group_registration', myRegistration.id)
        router.push(
          `/lyrics?songId=${song.id}&eventId=${eventId}&name=${encodeURIComponent(singerName)}${asGroup ? '&group=1' : ''}`
        )
        return
      }
      const err = await changeRes.json()
      alert(err.error || 'No se pudo cambiar la canción')
      await loadEvent()
      setConfirming(false)
      setPendingSongId(null)
      return
    }
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: event.id, singerName, songId: song.id }),
    })
    const data = await res.json()
    if (res.ok) {
      setMyRegistration(data)
      // Save to localStorage so they can't re-register from home page
      localStorage.setItem('karaoke_registration', JSON.stringify({ registrationId: data.id, singerName, eventId }))
      if (asGroup) {
        // Lets the lyrics page keep the code front and center for this registration
        localStorage.setItem('karaoke_group_registration', data.id)
      }
      router.push(
        `/lyrics?songId=${song.id}&eventId=${eventId}&name=${encodeURIComponent(singerName)}${asGroup ? '&group=1' : ''}`
      )
      return
    }
    if (res.status === 409 && data.isFull) {
      // Capacity full — offer this song through the random pool instead
      setSelectedSong(song)
      setShowRandomModal(true)
    } else {
      alert(data.error || 'Error al registrar')
      await loadEvent()
    }
    setConfirming(false)
    setPendingSongId(null)
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

  const handleJoinGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!event || groupCode.length !== 4) return
    setJoiningGroup(true)
    setJoinGroupError('')
    const res = await fetch('/api/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'join', eventId: event.id, singerName, code: groupCode }),
    })
    const data = await res.json()
    setJoiningGroup(false)
    if (!res.ok) {
      setJoinGroupError(data.error || 'No se pudo sumar al grupo')
      return
    }
    // Save to localStorage so they can't re-register from home page
    localStorage.setItem('karaoke_registration', JSON.stringify({ registrationId: data.registrationId, singerName, eventId }))
    setShowJoinGroup(false)
    router.push(`/lyrics?songId=${data.songId}&eventId=${eventId}&name=${encodeURIComponent(singerName)}`)
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
        {event?.registrationPaused && (
          <div className="glass-card p-5 mb-4 border-yellow-500/40 bg-yellow-500/5 text-center animate-pulse">
            <div className="text-3xl mb-2">⏳</div>
            <p className="text-yellow-400 font-bold text-base mb-1">
              Inscripciones pausadas
            </p>
            <p className="text-slate-300 text-sm">
              En un rato te vas a poder seguir anotando.
            </p>
          </div>
        )}
        {myRegistration && !isChanging && (
          <div className="glass-card p-4 mb-4 border-purple-500/40">
            <p className="text-sm text-purple-300 font-semibold text-center">
              {myRegistration.singerName.toLowerCase() === singerName.toLowerCase()
                ? '✅ Ya elegiste tu canción'
                : `✅ Estás en el grupo de ${myRegistration.singerName}`}
            </p>
          </div>
        )}
        {isChanging && (
          <div className="glass-card p-4 mb-4 border-blue-500/40">
            <p className="text-sm text-blue-300 font-semibold text-center">
              🔄 Elegí la canción que querés en cambio
            </p>
            <p className="text-xs text-slate-400 text-center mt-1">
              {(myRegistration?.members?.length ?? 0) > 0
                ? 'Mantenés tu lugar en la cola y tu grupo'
                : 'Mantenés tu lugar en la cola'}
            </p>
          </div>
        )}
        {!myRegistration && !isChanging && !inRandomPool && (
          <button
            onClick={() => { setShowJoinGroup(true); setJoinGroupError(''); setGroupCode('') }}
            className="w-full glass-card p-4 mb-4 border-pink-500/40 text-center hover:bg-pink-500/10 transition-all active:scale-95"
          >
            <p className="text-pink-300 font-bold text-sm">👥 ¿Te invitaron a cantar? Sumate a un grupo</p>
            <p className="text-slate-500 text-xs mt-1">Pedile el código de 4 números a quien eligió la canción</p>
          </button>
        )}
        {event && event.eventSongs.length > 0 && !event.eventSongs.some((es) => es.status === 'AVAILABLE') && (!myRegistration || isChanging) && (
          <div className="glass-card p-4 mb-4 border-yellow-500/40 text-center">
            <p className="text-yellow-400 font-bold text-base mb-1">
              No quedan canciones libres
            </p>
            <p className="text-slate-300 text-sm">
              Esperá un momento, en breve se liberan más.
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
            const isDisabled = !!event?.registrationPaused || (isChanging ? isSung || isTaken : (!!myRegistration || isSung))

            return (
              <div
                key={song.id}
                className={`song-card ${isAvailable && !isDisabled ? 'available' : isTaken ? 'taken' : 'sung'}`}
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
                    {isTaken && (
                      <span className="badge badge-taken">Ocupada</span>
                    )}
                    {isSung && (
                      <span className="badge badge-sung">Cantada</span>
                    )}
                  </div>
                </div>
                {isAvailable && !isDisabled && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRegister(song, false) }}
                      disabled={confirming}
                      className="flex-1 px-2 py-2.5 whitespace-nowrap rounded-xl border border-green-500/50 bg-green-500/15 text-green-300 text-sm font-bold hover:bg-green-500/25 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {pendingSongId === song.id ? 'Reservando...' : '🎤 Cantar'}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRegister(song, true) }}
                      disabled={confirming}
                      className="flex-1 px-2 py-2.5 whitespace-nowrap rounded-xl border border-pink-500/50 bg-pink-500/15 text-pink-300 text-sm font-bold hover:bg-pink-500/25 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {pendingSongId === song.id ? 'Reservando...' : '👥 Cantar en grupo'}
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {showJoinGroup && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
          <div className="glass-card w-full max-w-sm mx-4 mb-8 p-6 slide-up">
            <h2 className="font-display text-2xl neon-text-pink mb-2">Sumate a un grupo 👥</h2>
            <p className="text-slate-400 text-sm mb-4">
              Ingresá el código que le aparece a quien eligió la canción. Pueden cantar hasta 4.
            </p>
            <form onSubmit={handleJoinGroup} className="flex flex-col gap-3">
              <input
                className="input-neon text-center text-3xl tracking-[0.5em] font-bold"
                inputMode="numeric"
                autoComplete="off"
                maxLength={4}
                placeholder="0000"
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                autoFocus
              />
              {joinGroupError && <p className="text-red-400 text-sm text-center">{joinGroupError}</p>}
              <button className="btn-neon" type="submit" disabled={joiningGroup || groupCode.length !== 4}>
                {joiningGroup ? 'Sumándote...' : '🎤 Sumarme'}
              </button>
              <button type="button" className="btn-secondary" onClick={() => setShowJoinGroup(false)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

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
