'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSocket } from '@/hooks/useSocket'

interface Song {
  id: string
  title: string
  artist: string
  lyrics: string | null
}

interface Registration {
  id: string
  singerName: string
  status: string
  songId: string
  song: { id: string; title: string; artist: string }
}

export default function OperatorPage() {
  const [eventId, setEventId] = useState<string | null>(null)
  const [currentReg, setCurrentReg] = useState<Registration | null>(null)
  const [song, setSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const [fontSize, setFontSize] = useState(56) // px

  // Auto-scroll
  const [autoScroll, setAutoScroll] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(2) // px per tick (1–5)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number | null>(null)

  const { on } = useSocket(eventId ?? undefined)

  const loadCurrentSong = useCallback(async (evId: string) => {
    const res = await fetch(`/api/queue?eventId=${evId}`)
    const data = await res.json()
    if (!Array.isArray(data)) return
    const called = data.find((r: Registration) => r.status === 'CALLED')
    const current = called || data.find((r: Registration) => r.status === 'WAITING') || null
    setCurrentReg(current)
    if (current?.songId) {
      const songRes = await fetch(`/api/songs/${current.songId}`)
      const songData = await songRes.json()
      setSong(songData)
      // Reset scroll to top when song changes
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

  // Auto-scroll loop using requestAnimationFrame
  useEffect(() => {
    if (!autoScroll) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      return
    }

    let lastTime: number | null = null
    const TICK_MS = 16 // ~60fps

    const step = (now: number) => {
      if (lastTime === null || now - lastTime >= TICK_MS) {
        lastTime = now
        const el = scrollRef.current
        if (el) {
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2
          if (atBottom) {
            setAutoScroll(false)
            return
          }
          el.scrollTop += scrollSpeed * 0.5
        }
      }
      animFrameRef.current = requestAnimationFrame(step)
    }

    animFrameRef.current = requestAnimationFrame(step)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [autoScroll, scrollSpeed])

  const increaseFontSize = () => setFontSize((f) => Math.min(f + 4, 96))
  const decreaseFontSize = () => setFontSize((f) => Math.max(f - 4, 16))

  const scrollToTop = () => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Top bar — operator controls */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: '#111',
          borderBottom: '1px solid #222',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        {/* Singer + song info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {currentReg ? (
            <>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: currentReg.status === 'CALLED' ? '#c084fc' : '#64748b',
                }}
              >
                {currentReg.status === 'CALLED' ? '🎤 CANTANDO AHORA' : '🎵 A CONTINUACIÓN'}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 800, fontSize: 18, color: '#fff', whiteSpace: 'nowrap' }}>
                  {currentReg.singerName}
                </span>
                <span style={{ color: '#94a3b8', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  — {currentReg.song.title} · {currentReg.song.artist}
                </span>
              </div>
            </>
          ) : (
            <span style={{ color: '#475569', fontSize: 14 }}>Sin cantante activo</span>
          )}
        </div>

        {/* Auto-scroll controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button onClick={scrollToTop} style={btnStyle} title="Volver al inicio">⬆ Top</button>

          <button
            onClick={() => setAutoScroll((v) => !v)}
            style={{
              ...btnStyle,
              background: autoScroll ? '#7c3aed' : '#1e293b',
              borderColor: autoScroll ? '#7c3aed' : '#334155',
              color: autoScroll ? '#fff' : '#94a3b8',
              minWidth: 80,
            }}
          >
            {autoScroll ? '⏸ Pausar' : '▶ Auto'}
          </button>

          <span style={{ color: '#475569', fontSize: 12 }}>Vel.</span>
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => setScrollSpeed(s)}
              style={{
                ...btnStyle,
                padding: '4px 8px',
                background: scrollSpeed === s ? '#334155' : '#0f172a',
                borderColor: scrollSpeed === s ? '#7c3aed' : '#1e293b',
                color: scrollSpeed === s ? '#c4b5fd' : '#475569',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Font size controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ color: '#475569', fontSize: 12 }}>Letra</span>
          <button onClick={decreaseFontSize} style={btnStyle}>A−</button>
          <span style={{ color: '#94a3b8', fontSize: 14, minWidth: 32, textAlign: 'center' }}>{fontSize}</span>
          <button onClick={increaseFontSize} style={btnStyle}>A+</button>
        </div>
      </div>

      {/* Lyrics area */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px 40px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          scrollBehavior: 'smooth',
        }}
      >
        {loading ? (
          <p style={{ color: '#475569', textAlign: 'center', marginTop: 80, fontSize: 18 }}>
            Cargando...
          </p>
        ) : !currentReg ? (
          <div style={{ textAlign: 'center', marginTop: 100 }}>
            <div style={{ fontSize: 64, marginBottom: 24 }}>🎤</div>
            <p style={{ color: '#334155', fontSize: 22, fontWeight: 700 }}>
              Esperando al próximo cantante...
            </p>
            <p style={{ color: '#1e293b', fontSize: 14, marginTop: 8 }}>
              La letra aparece automáticamente cuando el admin llama a alguien
            </p>
          </div>
        ) : !song?.lyrics ? (
          <div style={{ textAlign: 'center', marginTop: 100 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
            <p style={{ color: '#334155', fontSize: 20, fontWeight: 700 }}>
              Letra no disponible para esta canción
            </p>
          </div>
        ) : (
          <pre
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              fontSize: fontSize,
              lineHeight: 1.75,
              color: '#f8fafc',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
              letterSpacing: 0.3,
              textAlign: 'center',
              width: '100%',
            }}
          >
            {song.lyrics}
          </pre>
        )}
      </div>
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  background: '#1e293b',
  border: '1px solid #334155',
  color: '#94a3b8',
  borderRadius: 6,
  padding: '4px 10px',
  fontSize: 13,
  fontWeight: 700,
  cursor: 'pointer',
  letterSpacing: 0.5,
}
