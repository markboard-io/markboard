import { BaseService } from './BaseService'
import { WebApp } from 'meteor/webapp'
import { AppStateCollection } from '../models'

export class RedirectService extends BaseService {
  constructor() {
    super('redirect')
  }

  public startup(): void {
    WebApp.rawConnectHandlers.use(async (req, res, next) => {
      // chrome pre-connect when user typing url
      if (req.url === '/') {
        const userid = this._getUserIdFromCookieString(req.headers.cookie || '')
        if (userid != null) {
          const { currentBoardId: boardId } = await AppStateCollection.getAppState(userid)
          res.writeHead(303, { Location: `/board/${boardId}` })
          res.end()
          return
        }
      }
      return next()
    })
  }

  private _getUserIdFromCookieString(cookieString: string) {
    const cookies = cookieString
      .split(';')
      .filter(Boolean)
      .reduce((o, cookie) => {
        const [key, value] = cookie.split('=') as [string, string]
        return Object.assign(o, { [key.trim()]: value.trim() })
      }, {} as Record<string, string>)
    return cookies['x_uid']
  }
}
