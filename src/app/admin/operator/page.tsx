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

type OperatorCommand =
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'speed'; value: number }
  | { type: 'font_size'; value: number }
  | { type: 'scroll_top' }

export default function OperatorPage() {
  const [eventId, setEventId] = useState<string | null>(null)
  const [currentReg, setCurrentReg] = useState<Registration | null>(null)
  const [song, setSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const [fontSize, setFontSize] = useState(56)
  const [autoScroll, setAutoScroll] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(2)

  const scrollRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const { on } = useSocket(eventId ?? undefined)

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
    setCurrentReg(current)
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

  // Listen for commands from the queue page via BroadcastChannel
  useEffect(() => {
    if (typeof window === 'undefined') return
    const channel = new BroadcastChannel('karaoke_operator')
    channel.onmessage = (e: MessageEvent<OperatorCommand>) => {
      const cmd = e.data
      if (cmd.type === 'play') setAutoScroll(true)
      if (cmd.type === 'pause') setAutoScroll(false)
      if (cmd.type === 'speed') setScrollSpeed(cmd.value)
      if (cmd.type === 'font_size') setFontSize(cmd.value)
      if (cmd.type === 'scroll_top' && scrollRef.current) {
        scrollRef.current.scrollTop = 0
        setAutoScroll(false)
      }
    }
    return () => channel.close()
  }, [])

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
      }}
    >
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
          <pre
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              fontSize: fontSize,
              lineHeight: 1.8,
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
