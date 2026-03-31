'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export function useSocket(eventId?: string, singerName?: string) {
  const [isConnected, setIsConnected] = useState(false)
  const [youAreUp, setYouAreUp] = useState(false)
  const [youAreNext, setYouAreNext] = useState(false)
  const handlers = useRef<Map<string, (data: unknown) => void>>(new Map())

  useEffect(() => {
    if (!socket) {
      socket = io(window.location.origin, { transports: ['websocket', 'polling'] })
    }

    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))
    socket.on('you_are_up', () => {
      setYouAreNext(false) // clear the "get ready" state when actually called
      setYouAreUp(true)
    })
    socket.on('you_are_next', () => setYouAreNext(true))

    if (socket.connected) setIsConnected(true)

    return () => {
      // Don't disconnect on unmount — keep socket alive
    }
  }, [])

  // Join singer room
  useEffect(() => {
    if (socket && eventId && singerName) {
      socket.emit('join', { eventId, singerName })
    }
  }, [eventId, singerName])

  const on = useCallback((event: string, handler: (data: unknown) => void) => {
    if (!socket) return
    handlers.current.set(event, handler)
    socket.on(event, handler)
    return () => {
      socket?.off(event, handler)
      handlers.current.delete(event)
    }
  }, [])

  const resetYouAreUp = useCallback(() => setYouAreUp(false), [])
  const resetYouAreNext = useCallback(() => setYouAreNext(false), [])

  return { isConnected, youAreUp, resetYouAreUp, youAreNext, resetYouAreNext, on }
}
