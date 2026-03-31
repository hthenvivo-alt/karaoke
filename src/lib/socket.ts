import type { Server } from 'socket.io'

declare global {
  // eslint-disable-next-line no-var
  var io: Server | undefined
}

export function getSocketServer(): Server | null {
  return global.io ?? null
}

export function emitQueueUpdate(eventId: string, data: unknown) {
  const io = getSocketServer()
  if (io) {
    io.emit(`queue:update:${eventId}`, data)
  }
}

export function emitSongTaken(eventId: string, songId: string, singerName: string) {
  const io = getSocketServer()
  if (io) {
    io.emit(`song:taken:${eventId}`, { songId, singerName })
  }
}

export function emitCallSinger(eventId: string, singerName: string, songTitle: string) {
  const io = getSocketServer()
  if (io) {
    const room = `singer:${eventId}:${singerName.toLowerCase().trim()}`
    io.to(room).emit('you_are_up', { singerName, songTitle })
    io.emit(`queue:update:${eventId}`, { type: 'call', singerName, songTitle })
  }
}

export function emitGetReady(eventId: string, nextSingerName: string) {
  const io = getSocketServer()
  if (io) {
    const room = `singer:${eventId}:${nextSingerName.toLowerCase().trim()}`
    io.to(room).emit('you_are_next', { singerName: nextSingerName })
  }
}
