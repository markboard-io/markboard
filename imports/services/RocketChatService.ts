import { RocketChatCollection } from '../models'
import { BaseService } from './BaseService'
import { WebApp } from 'meteor/webapp'

export class RocketChatService extends BaseService {
  constructor() {
    super('rocketChat')
  }

  public startup(): void {
    WebApp.connectHandlers.use('/rocketchat/v2/auth', async (req, res) => {
      const authToken = req.headers['x-auth-token'] as string
      if (authToken != null) {
        res.writeHead(200, {
          'Content-Type': 'Authorized application/json'
        })
        res.end()
      } else {
        res.writeHead(401, {
          'Content-Type': 'Unauthorized application/json'
        })
        res.statusMessage = 'Authorization denied'
        res.end()
      }
    })

    WebApp.connectHandlers.use('/rocketchat/v2/createBoard', async (req, res) => {
      const boardname = req.headers['x-board-name'] as string
      const username = req.headers['x-user-name'] as string
      const userid = req.headers['x-user-id'] as string
      console.log(boardname)
      const createBoard = await RocketChatCollection.createRocketChatBoard(
        username,
        userid,
        boardname
      )
      console.log(createBoard)
      if (createBoard == null) {
        res.writeHead(500, {
          'Content-Type': 'Unauthorized application/json'
        })
        res.end()
      } else {
        res.writeHead(200, {
          'Content-Type': 'Authorized application/json'
        })
        res.end()
      }
    })
  }
}
