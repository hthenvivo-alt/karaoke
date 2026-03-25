import { createServer } from 'http'
import { Server } from 'socket.io'
import next from 'next'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res)
  })

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  // Store io globally so API routes can emit events
  global.io = io

  io.on('connection', (socket) => {
    console.log(`[Socket] Client connected: ${socket.id}`)

    // Singer joins a room with their name so we can target them directly
    socket.on('join', ({ singerName, eventId }) => {
      if (singerName && eventId) {
        const room = `singer:${eventId}:${singerName.toLowerCase().trim()}`
        socket.join(room)
        console.log(`[Socket] ${singerName} joined room ${room}`)
      }
    })

    socket.on('disconnect', () => {
      console.log(`[Socket] Client disconnected: ${socket.id}`)
    })
  })

  httpServer.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? 'development' : process.env.NODE_ENV
      }`
    )
  })
})
