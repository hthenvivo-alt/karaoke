'use client'

import { useState, useEffect, useCallback, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSocket } from '@/hooks/useSocket'
import { formatSingers, isSingerIn } from '@/lib/singers'

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
  members?: { singerName: string }[]
  isRandom: boolean
  song?: { title: string; artist: string }
  songId?: string
}

interface ChordLyricToken {
  chord: string | null
  text: string
}

function parseLine(line: string): ChordLyricToken[] {
  const regex = /\[([^\]]+)\]/g
  const tokens: ChordLyricToken[] = []
  
  let match
  let lastIndex = 0
  let currentChord: string | null = null
  
  while ((match = regex.exec(line)) !== null) {
    const matchIndex = match.index
    const textSegment = line.substring(lastIndex, matchIndex)
    
    if (textSegment || currentChord) {
      tokens.push({
        chord: currentChord,
        text: textSegment || "",
      })
    }
    
    currentChord = match[1]
    lastIndex = regex.lastIndex
  }
  
  const remainingText = line.substring(lastIndex)
  if (remainingText || currentChord) {
    tokens.push({
      chord: currentChord,
      text: remainingText || "",
    })
  }
  
  if (tokens.length === 0) {
    tokens.push({ chord: null, text: "" })
  }
  
  return tokens
}

function LyricsWithChords({ lyrics }: { lyrics: string }) {
  const lines = lyrics.split('\n')
  const hasChords = lyrics.includes('[') && lyrics.includes(']')
  
  if (!hasChords) {
    return <pre className="lyrics-text whitespace-pre-wrap">{lyrics}</pre>
  }

  return (
    <div className="lyrics-text font-sans space-y-2 select-none">
      {lines.map((line, lineIdx) => {
        const tokens = parseLine(line)
        const isBlank = tokens.length === 1 && tokens[0].text === "" && !tokens[0].chord
        
        if (isBlank) {
          return <div key={lineIdx} className="h-6" />
        }
        
        const lineHasChords = tokens.some(t => t.chord)
        
        return (
          <div key={lineIdx} className={`flex flex-wrap leading-normal ${lineHasChords ? 'pt-6 pb-1' : 'py-0.5'}`}>
            {tokens.map((token, tokenIdx) => (
              <span key={tokenIdx} className="inline-flex flex-col relative align-bottom min-w-[0.5ch]">
                {token.chord && (
                  <span className="absolute top-[-1.3rem] left-0 text-sky-400 font-bold text-xs select-none">
                    {token.chord}
                  </span>
                )}
                <span className="text-white whitespace-pre">{token.text || "\u00A0"}</span>
              </span>
            ))}
          </div>
        )
      })}
    </div>
  )
}

function LyricsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const songId = searchParams.get('songId') || ''
  const eventId = searchParams.get('eventId') || ''
  const singerName = searchParams.get('name') || ''
  const justChoseGroup = searchParams.get('group') === '1'

  const [song, setSong] = useState<Song | null>(null)
  const [myReg, setMyReg] = useState<Registration | null>(null)
  const [queue, setQueue] = useState<Registration[]>([])
  const [cancelling, setCancelling] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSingers, setShowSingers] = useState(false)
  const [joinCode, setJoinCode] = useState<string | null>(null)
  const [showCodeIntro, setShowCodeIntro] = useState(justChoseGroup)
  // Set by the songs page when this person tapped "Cantar en grupo"
  const [groupRegistrationId] = useState(() =>
    typeof window === 'undefined' ? null : localStorage.getItem('karaoke_group_registration')
  )
  const hadTurnRef = useRef(false)
  const leavingRef = useRef(false)
  const { youAreUp, resetYouAreUp, youAreNext, resetYouAreNext, on } = useSocket(eventId, singerName)

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
    // Prefer a pending turn (own or group) over a song already sung
    const mine = allQueue.filter((r: Registration) => isSingerIn(r, singerName))
    const reg = mine.find((r: Registration) => r.status !== 'SUNG') || mine[0]
    setMyReg(reg || null)

    // The titular cancelled (or changed song) while this person was in their group
    const hasTurn = !!reg && reg.status !== 'SUNG'
    if (hadTurnRef.current && !hasTurn && !leavingRef.current) {
      alert('Se canceló la inscripción del grupo. Podés elegir otra canción.')
      router.replace(`/songs?eventId=${eventId}&name=${encodeURIComponent(singerName)}`)
    }
    hadTurnRef.current = hasTurn
  }, [songId, eventId, singerName, router])

  const isTitular = !!myReg && myReg.singerName.toLowerCase() === singerName.toLowerCase()
  const companions = myReg ? [myReg.singerName, ...(myReg.members ?? []).map((m) => m.singerName)].filter(
    (n) => n.toLowerCase() !== singerName.toLowerCase()
  ) : []

  // Only the titular can see (and share) the group code
  const canShareCode = isTitular && myReg?.status === 'WAITING' && !myReg.isRandom
  const myRegId = myReg?.id
  useEffect(() => {
    if (!canShareCode || !myRegId) return
    fetch(`/api/groups?registrationId=${myRegId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setJoinCode(data?.joinCode ?? null))
  }, [canShareCode, myRegId])

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
    leavingRef.current = true
    // Companions leave the group; the titular cancels the whole registration
    const res = isTitular
      ? await fetch('/api/queue', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'cancel', registrationId: myReg.id, eventId }),
        })
      : await fetch('/api/groups', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'leave', eventId }),
        })
    if (res.ok) {
      localStorage.removeItem('karaoke_registration')
      sessionStorage.removeItem('karaoke_session')
      router.replace('/')
    } else {
      const data = await res.json()
      alert(data.error || 'No se pudo cancelar')
      leavingRef.current = false
      setCancelling(false)
      setShowConfirm(false)
    }
  }

  const handleChangeSong = () => {
    // Go back to songs list so user can pick another available song.
    // We need to allow re-picking, so we temporarily keep session but remove registration.
    router.push(`/songs?eventId=${eventId}&name=${encodeURIComponent(singerName)}&change=1`)
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
          <p className="text-slate-400 mb-2">¡El animador te está llamando!</p>
          {song && <p className="text-purple-300 font-semibold">{song.title} — {song.artist}</p>}
          <button className="btn-neon mt-8" onClick={resetYouAreUp}>
            ¡Voy! 🎵
          </button>
        </div>
      </div>
    )
  }

  const groupSize = 1 + (myReg?.members?.length ?? 0)
  const groupFull = groupSize >= 4
  // Big, highlighted code for people who chose "Cantar en grupo" or already have companions
  const highlightCode = !!joinCode && (groupRegistrationId === myReg?.id || groupSize > 1)

  if (showCodeIntro && canShareCode && joinCode && song) {
    return (
      <div className="gradient-bg min-h-dvh flex flex-col items-center justify-center px-6 text-center">
        <div className="glass-card p-8 w-full max-w-sm slide-up border-pink-500/40">
          <div className="text-5xl mb-3">👥</div>
          <h1 className="font-display text-4xl neon-text-pink mb-2">¡Listo!</h1>
          <p className="text-slate-300 mb-1">Ya tenés <span className="font-bold text-white">{song.title}</span></p>
          <p className="text-slate-400 text-sm mb-6">Pasale este código a tus amigos para que se sumen</p>
          <div className="rounded-2xl border-2 border-pink-500/60 bg-pink-500/10 py-5 mb-4">
            <p className="font-display text-7xl text-white tracking-[0.25em] pl-[0.25em]">{joinCode}</p>
          </div>
          <p className="text-slate-500 text-xs mb-2">
            Entran a la app, tocan <span className="text-pink-300">“Sumate a un grupo”</span> y lo escriben. Hasta 4 en total.
          </p>
          {companions.length > 0 && (
            <p className="text-green-400 text-sm font-semibold mb-2">✅ Ya se sumaron: {companions.join(', ')}</p>
          )}
          <button className="btn-neon mt-4" onClick={() => setShowCodeIntro(false)}>
            Ver la letra 🎵
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
            {!isTitular && myReg && myReg.status !== 'SUNG' && (
              <p className="text-pink-300 text-xs font-semibold mt-1">👥 Cantás con {companions.join(', ')}</p>
            )}
            {canShareCode && joinCode && !highlightCode && (
              <p className="text-pink-300 text-xs font-semibold mt-1">
                👥 Código para sumarse: <span className="text-white text-base tracking-widest">{joinCode}</span>
                <span className="text-slate-500 font-normal"> · {groupSize}/4</span>
                {companions.length > 0 && <span className="text-slate-400 font-normal"> · con {companions.join(', ')}</span>}
              </p>
            )}
          </div>
          {myReg?.status === 'CALLED' && (
            <span className="badge badge-called flex-shrink-0">¡AHORA VOS!</span>
          )}
          {myReg?.isRandom && myReg.status === 'WAITING' && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 flex-shrink-0">
              🎲 Lista random
            </span>
          )}
        </div>
      </div>

      {canShareCode && highlightCode && (
        <div className="mx-4 mt-4 rounded-2xl border-2 border-pink-500/60 bg-pink-500/10 px-4 py-3 text-center">
          {groupFull ? (
            <p className="text-pink-300 font-bold">👥 Grupo completo</p>
          ) : (
            <>
              <p className="text-pink-300 text-xs font-semibold uppercase tracking-widest">Código para sumarse</p>
              <p className="font-display text-5xl text-white tracking-[0.25em] pl-[0.25em] my-1">{joinCode}</p>
            </>
          )}
          <p className="text-slate-400 text-xs">
            {groupSize}/4{companions.length > 0 ? ` · Cantás con ${companions.join(', ')}` : ' · Todavía no se sumó nadie'}
          </p>
        </div>
      )}

      {/* Lyrics */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-32">
        {song.lyrics ? (
          <pre className="lyrics-text whitespace-pre-wrap">{song.lyrics.replace(/\[([^\]]+)\]/g, '')}</pre>
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
              {isTitular && (
                <button
                  onClick={handleChangeSong}
                  className="flex-1 py-3 rounded-xl border border-blue-500/40 bg-blue-500/10 text-blue-300 text-sm font-semibold hover:bg-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-1"
                >
                  🔄 Cambiar canción
                </button>
              )}
            </div>
            {/* Row 2: Me quiero bajar */}
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-all active:scale-95"
            >
              {isTitular ? '🙅 Me quiero bajar' : '🙅 Me bajo del grupo'}
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
                  const isMe = isSingerIn(r, singerName)
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
                          {formatSingers(r)} {isMe && '(vos)'}
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
            <p className="text-slate-300 mb-1">
              {isTitular ? 'Vas a cancelar tu inscripción para:' : 'Vas a bajarte del grupo para:'}
            </p>
            <p className="font-bold text-white mb-1">{song?.title}</p>
            <p className="text-slate-400 text-sm mb-6">{song?.artist}</p>
            <p className="text-slate-500 text-xs mb-6 text-center">
              {!isTitular
                ? 'El resto del grupo sigue anotado.'
                : companions.length > 0
                  ? `Se cancela para todo el grupo (${companions.join(', ')}) y la canción queda libre.`
                  : 'La canción va a quedar libre para que otra persona la elija.'}
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
