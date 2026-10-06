'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useSocket } from '@/hooks/useSocket'
import { parseLine } from '@/lib/lyrics-utils'
import { formatSingers } from '@/lib/singers'
import type { ScreenCommand, ViewMode } from '@/lib/screen-commands'

interface Song {
  id: string
  title: string
  artist: string
  lyrics: string | null
}

interface Registration {
  id: string
  singerName: string
  members?: { singerName: string }[]
  status: string
  songId: string
  song: { id: string; title: string; artist: string }
}


export default function OperatorPage() {
  const [eventId, setEventId] = useState<string | null>(null)
  const [currentReg, setCurrentReg] = useState<Registration | null>(null)
  const [song, setSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const [fontSize, setFontSize] = useState(56)
  const fontSizeRef = useRef(fontSize)
  useEffect(() => {
    fontSizeRef.current = fontSize
  }, [fontSize])
  const [autoScroll, setAutoScroll] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(2)
  const [viewMode, setViewMode] = useState<ViewMode>('lyrics')

  const currentRegRef = useRef<Registration | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const { on, emit } = useSocket(eventId ?? undefined)

  // Keep the admin panels' Play/Pause button in sync (auto-scroll also stops by itself
  // at the end of the lyrics or when the song changes)
  useEffect(() => {
    if (eventId) emit('screen:state', { eventId, scrolling: autoScroll })
  }, [eventId, autoScroll, emit])

  // Auto-scroll via setInterval
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!autoScroll) return

    intervalRef.current = setInterval(() => {
      const el = scrollRef.current
      if (!el) return
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 4) {
        setAutoScroll(false)
        return
      }
      el.scrollTop += scrollSpeed
    }, 30)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoScroll, scrollSpeed])

  const loadCurrentSong = useCallback(async (evId: string) => {
    const res = await fetch(`/api/queue?eventId=${evId}`)
    const data = await res.json()
    if (!Array.isArray(data)) return
    const called = data.find((r: Registration) => r.status === 'CALLED')
    const current = called || data.find((r: Registration) => r.status === 'WAITING') || null
    
    if (current && current.id !== currentRegRef.current?.id) {
      if (current.status === 'CALLED') {
        setViewMode('singer_intro')
      }
    }
    const songChanged = current?.songId !== currentRegRef.current?.songId
    currentRegRef.current = current
    setCurrentReg(current)

    // Queue updates (reorders, new sign-ups) must not interrupt the song being sung
    if (!songChanged) return

    if (current?.songId) {
      const songRes = await fetch(`/api/songs/${current.songId}`)
      const songData = await songRes.json()
      setSong(songData)
      // Reset scroll and stop auto-scroll when song changes
      setAutoScroll(false)
      if (scrollRef.current) scrollRef.current.scrollTop = 0
    } else {
      setSong(null)
    }
  }, [])

  useEffect(() => {
    fetch('/api/events/active')
      .then((r) => r.json())
      .then((ev) => {
        if (ev?.id) {
          setEventId(ev.id)
          loadCurrentSong(ev.id)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [loadCurrentSong])

  useEffect(() => {
    if (!eventId) return
    const unsub = on(`queue:update:${eventId}`, () => loadCurrentSong(eventId))
    return unsub
  }, [eventId, on, loadCurrentSong])

  // Commands from any admin panel (PC or phone), relayed by the server
  useEffect(() => {
    if (!eventId) return
    return on(`screen:cmd:${eventId}`, (data) => {
      const cmd = data as ScreenCommand
      if (cmd.type === 'play') setAutoScroll(true)
      if (cmd.type === 'pause') setAutoScroll(false)
      if (cmd.type === 'speed') setScrollSpeed(cmd.value)
      if (cmd.type === 'font_size') setFontSize(cmd.value)
      if (cmd.type === 'set_view_mode') setViewMode(cmd.value)
      if (cmd.type === 'nudge' && scrollRef.current) {
        // About two lines of lyrics per tap
        scrollRef.current.scrollBy({ top: cmd.value * fontSizeRef.current * 2.8, behavior: 'smooth' })
      }
      if (cmd.type === 'scroll_top' && scrollRef.current) {
        scrollRef.current.scrollTop = 0
        setAutoScroll(false)
      }
    })
  }, [eventId, on])

  if (viewMode === 'singer_intro' && currentReg) {
    return (
      <div
        style={{
          height: '100vh',
          background: '#000',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          textAlign: 'center',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        
        {/* Glow Effects */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(0,0,0,0) 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, rgba(0,0,0,0) 70%)',
            top: '40%',
            left: '30%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div style={{ zIndex: 1, animation: 'fadeIn 1s ease-out' }}>
          <div
            style={{
              fontSize: '28px',
              color: '#a855f7',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              marginBottom: '24px',
              textShadow: '0 0 10px rgba(168,85,247,0.5)',
            }}
          >
            {(currentReg.members?.length ?? 0) > 0 ? '🎙️ Suben al escenario' : '🎙️ Sube al escenario'}
          </div>
          
          <h1
            style={{
              // Groups need room for up to four names
              fontSize: (currentReg.members?.length ?? 0) > 0 ? '64px' : '84px',
              fontWeight: 900,
              margin: '0 0 32px 0',
              background: 'linear-gradient(to right, #ec4899, #a855f7, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(168,85,247,0.2)',
              letterSpacing: '-1px',
            }}
          >
            {formatSingers(currentReg)}
          </h1>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '24px 48px',
              borderRadius: '24px',
              backdropFilter: 'blur(10px)',
              display: 'inline-block',
              maxWidth: '800px',
            }}
          >
            <p
              style={{
                fontSize: '36px',
                fontWeight: 800,
                color: '#f1f5f9',
                margin: '0 0 8px 0',
              }}
            >
              {currentReg.song.title}
            </p>
            <p
              style={{
                fontSize: '22px',
                color: '#94a3b8',
                margin: 0,
                fontWeight: 500,
              }}
            >
              {currentReg.song.artist}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Otherwise, render default lyrics screen
  return (
    <div
      style={{
        height: '100vh',
        background: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* QR overlay — lyrics stay mounted underneath so the scroll position is kept */}
      {viewMode === 'qr' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
            textAlign: 'center',
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 40,
              fontWeight: 900,
              background: 'linear-gradient(to right, #ec4899, #a855f7, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            🎤 Escaneá y anotate para cantar
          </div>
          <div style={{ background: '#fff', padding: 24, borderRadius: 24 }}>
            <QRCodeSVG
              value={window.location.origin}
              size={512}
              style={{ width: 'min(60vh, 70vw)', height: 'min(60vh, 70vw)', display: 'block' }}
            />
          </div>
        </div>
      )}

      {/* Lyrics area — full screen, no controls */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '60px 80px 120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {loading ? (
          <p style={{ color: '#1e293b', textAlign: 'center', marginTop: 200, fontSize: 22 }}>
            Cargando...
          </p>
        ) : !currentReg || !song?.lyrics ? (
          <div style={{ textAlign: 'center', marginTop: 200 }}>
            <div style={{ fontSize: 80, marginBottom: 32, opacity: 0.15 }}>🎤</div>
            <p style={{ color: '#1e293b', fontSize: 28, fontWeight: 700 }}>
              Esperando cantante...
            </p>
          </div>
        ) : (
          <div style={{ width: '100%' }}>
            {song.lyrics.split('\n').map((line, lineIdx) => {
              const tokens = parseLine(line)
              const isBlank = tokens.length === 1 && tokens[0].text === '' && !tokens[0].chord
              const lineHasChords = tokens.some(t => t.chord)

              if (isBlank) {
                return <div key={lineIdx} style={{ height: fontSize * 0.6 }} />
              }

              return (
                <div
                  key={lineIdx}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    width: '100%',
                    position: 'relative',
                    paddingTop: lineHasChords ? fontSize * 0.75 : 4,
                    paddingBottom: 6,
                  }}
                >
                  {tokens.map((token, tokenIdx) => (
                    <span
                      key={tokenIdx}
                      style={{
                        position: 'relative',
                        display: 'inline-flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      {token.chord && (
                        <span
                          style={{
                            position: 'absolute',
                            top: -(fontSize * 0.58),
                            left: 0,
                            color: '#38bdf8',
                            fontWeight: 800,
                            fontSize: fontSize * 0.42,
                            whiteSpace: 'nowrap',
                            userSelect: 'none',
                            letterSpacing: 1,
                          }}
                        >
                          {token.chord}
                        </span>
                      )}
                      <span
                        style={{
                          color: '#f8fafc',
                          fontSize: fontSize,
                          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                          whiteSpace: 'pre',
                          letterSpacing: 0.3,
                          lineHeight: 1.4,
                        }}
                      >
                        {token.text || '\u00A0'}
                      </span>
                    </span>
                  ))}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
