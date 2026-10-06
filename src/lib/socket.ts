import type { Server } from 'socket.io'
import type { ScreenCommand } from '@/lib/screen-commands'

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

const singerRoom = (eventId: string, name: string) => `singer:${eventId}:${name.toLowerCase().trim()}`

// singerNames: everyone in the registration (titular + group companions)
export function emitCallSinger(eventId: string, singerNames: string[], songTitle: string) {
  const io = getSocketServer()
  if (io) {
    for (const name of singerNames) {
      io.to(singerRoom(eventId, name)).emit('you_are_up', { singerName: name, songTitle })
    }
    io.emit(`queue:update:${eventId}`, { type: 'call', singerNames, songTitle })
  }
}

export function emitGetReady(eventId: string, singerNames: string[]) {
  const io = getSocketServer()
  if (io) {
    for (const name of singerNames) {
      io.to(singerRoom(eventId, name)).emit('you_are_next', { singerName: name })
    }
  }
}

// Reaches the big screen and every open admin panel, so all of them stay in sync
export function emitScreenCommand(eventId: string, cmd: ScreenCommand) {
  const io = getSocketServer()
  if (io) {
    io.emit(`screen:cmd:${eventId}`, cmd)
  }
}
