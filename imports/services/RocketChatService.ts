import { Collections } from '../models/Collections'
import { BaseService } from './BaseService'
import { WebApp } from 'meteor/webapp'

export class RocketChatService extends BaseService {
  constructor() {
    super('rocketChat')
  }

  public startup(): void {
    const RocketChatCollection = Collections.getCollectionByName('rocketChat')
    WebApp.rawConnectHandlers.use((req, res, next) => {
      const { url } = req
      if (url === '/api/v2/rocketchat') {
        console.log(req)
        const query = req.url ? require('url').parse(req.url, true) : {}
        const { token } = query
        const { headers } = req
        const { 'x-user-id': userId, 'x-auth-token': authToken } = headers

        if (token && userId && authToken) {
          const rocketChat = RocketChatCollection.findOne({ token })
          if (rocketChat) {
            const { _id } = rocketChat
            RocketChatCollection.update({ _id }, { $set: { userId, authToken } })
            res.writeHead(200)
            res.end()
            return
          }
        }
        res.writeHead(403)
        res.end()
        return
      }
      next()
    })
  }
}
