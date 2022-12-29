import { WebApp } from 'meteor/webapp'
import socketIO from 'socket.io'

/**
 * Run socket.io service behind the Meteor
 * See: https://docs.meteor.com/packages/webapp.html
 */
export function startExcalidrawSyncService() {
  const io = socketIO(WebApp.httpServer, {
    handlePreflightRequest: (req, res) => {
      const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Origin': (req.headers && req.headers.origin),
        'Access-Control-Allow-Credentials': 'true'
      }
      res.writeHead(200, 'OK', headers)
      res.end()
    }
  })

  const debug = (...messages: string[]) => {
    const DEBUG = false // Toogle logs with this flag
    if (DEBUG) {
      console.log(...messages)
    }
  }

  io.on('connection', socket => {
    io.to(`${ socket.id }`).emit('init-room')
    socket.on('join-room', roomID => {
      debug(`${ socket.id } has joined ${ roomID }`)
      socket.join(roomID)
      if (io.sockets.adapter.rooms[roomID].length <= 1) {
        io.to(`${ socket.id }`).emit('first-in-room')
      } else {
        socket.broadcast.to(roomID).emit('new-user', socket.id)
      }
      io.in(roomID).emit('room-user-change', Object.keys(io.sockets.adapter.rooms[roomID].sockets))
    })

    socket.on('server-broadcast', (roomID: string, encryptedData: ArrayBuffer, iv: Uint8Array) => {
      debug(`${ socket.id } sends update to ${ roomID }`)
      socket.broadcast.to(roomID).emit('client-broadcast', encryptedData, iv)
    })

    socket.on(
      'server-volatile-broadcast',
      (roomID: string, encryptedData: ArrayBuffer, iv: Uint8Array) => {
        debug(`${ socket.id } sends volatile update to ${ roomID }`)
        socket.volatile.broadcast.to(roomID).emit('client-broadcast', encryptedData, iv)
      }
    )

    socket.on('disconnecting', () => {
      const rooms = io.sockets.adapter.rooms
      for (const roomID in socket.rooms) {
        const clients = Object.keys(rooms[roomID].sockets).filter(id => id !== socket.id)
        if (clients.length > 0) {
          socket.broadcast.to(roomID).emit('room-user-change', clients)
        }
      }
    })

    socket.on('disconnect', () => {
      socket.removeAllListeners()
    })
  })
}