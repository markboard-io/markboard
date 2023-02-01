import { BaseService } from './BaseService'
import { WebApp } from 'meteor/webapp'

export class StaticAssetsService extends BaseService {
  constructor() {
    super('staticAssets')
  }

  public startup() {
    WebApp.rawConnectHandlers.use((req, res, next) => {
      if (req.url?.startsWith('/fonts/')) {
        res.setHeader('Cache-Control', 'max-age=31536000')
      }
      next()
    })
  }
}
