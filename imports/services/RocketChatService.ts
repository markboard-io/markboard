import { BaseService } from './BaseService'
import { WebApp } from 'meteor/webapp'

export class RocketChatService extends BaseService {
  constructor() {
    super('rocketChat')
  }

  public startup(): void {
    WebApp.rawConnectHandlers.use((req, res, next) => {
      const { url } = req
      if (url === '/rocketchat/v2/auth') {
        const authToken = req.headers['x-auth-token'] as string
        if (authToken != null) {
          const headers =req.headers
          console.log(headers)
          res.writeHead(200, {
            'Content-Type': 'Authorized application/json'
          })
          res.end()
          return
        }
        res.writeHead(401, {
          'Content-Type': 'Unauthorized application/json'
        })
        res.statusMessage = 'Authorization denied'
        res.end()
        return
      }
      next()
    })
  }
}
