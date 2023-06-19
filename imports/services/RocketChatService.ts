import { RocketChatCollection } from '../models'
import { BaseService } from './BaseService'
import { WebApp } from 'meteor/webapp'

export class RocketChatService extends BaseService {
  constructor() {
    super('rocketChat')
  }

  public startup(): void {
    WebApp.connectHandlers.use('/rocketchat/v2/auth', async (req, res) => {
      const body = await this.getRequestBody(req)
      const authToken = body.userId as string
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
      const body = await this.getRequestBody(req)
      const boardname = body.boardName as string
      const username = body.userName as string
      const userid = body.userId as string

      const createBoard = await RocketChatCollection.createRocketChatBoard(
        username,
        userid,
        boardname
      )
      console.log('Create Result', createBoard)

      if (createBoard == null || createBoard === 'error') {
        res.writeHead(500, {
          'Content-Type': 'Unauthorized application/json'
        })
        res.end()
      } else if (createBoard === boardname) {
        res.writeHead(409, {
          'Content-Type': 'Authorized application/json'
        })
        res.end()
      } else if (createBoard === 'success') {
        res.writeHead(200, {
          'Content-Type': 'Authorized application/json'
        })
        res.end()
      }
    })

    WebApp.connectHandlers.use('/rocketchat/v2/deleteBoard', async (req, res) => {
      const body = await this.getRequestBody(req)
      const boardname = body.boardName as string
      const username = body.userName as string
      const userid = body.userId as string

      const deleteBoard = await RocketChatCollection.deleteRocketChatBoard(
        userid,
        username,
        boardname
      )
      console.log('Delete Result', deleteBoard)
      if (deleteBoard == null || deleteBoard === 0) {
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

    WebApp.connectHandlers.use('/rocketchat/v2/oembed', async (req, res) => {
      console.log('oembed')
      res.writeHead(200, {
        'Content-Type': 'Authorized application/json'
      })
      const boardname = req.url?.split('/')[3]
      const iframeHtml = `
      <iframe src="http://localhost:4000/board/${boardname}" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`
      const oembed = {
        type: 'video',
        version: '1.0',
        title: `${boardname} Whiteboard`,
        provider_name: 'Markboard',
        provider_url: 'http://localhost:4000',
        width: 560,
        height: 315,
        html: iframeHtml
      }
      res.write(JSON.stringify(oembed))
      res.end()
    })
  }

  public async getRequestBody(req: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let body = ''
        req.on('data', (chunk: { toString: () => string }) => {
          body += chunk.toString() // convert Buffer to string
        })
        req.on('end', () => {
          resolve(JSON.parse(body))
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}
