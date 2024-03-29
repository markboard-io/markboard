import { AccountService } from './AccountService'
import { BaseService } from './BaseService'
import { BoardService } from './BoardService'
import { ExcalidrawSyncService } from './ExcalidrawSyncService'
import { StaticAssetsService } from './StaticAssetsService'
import { AppService } from './AppService'
import { ServerServices } from './types'
import { FilesService } from './FilesService'
import { RedirectService } from './RedirectService'
import { BoardFavoriteService } from './BoardFavoriteService'
import { RocketChatService } from './RocketChatService'

class ServiceManagerServerClass {
  private _services = {} as ServerServices

  constructor() {
    this._services['app'] = new AppService()
    this._services['account'] = new AccountService()
    this._services['excalidrawSync'] = new ExcalidrawSyncService()
    this._services['staticAssets'] = new StaticAssetsService()
    this._services['board'] = new BoardService()
    this._services['board_favorite'] = new BoardFavoriteService()
    this._services['files'] = new FilesService()
    this._services['redirect'] = new RedirectService()
    this._services['rocketChat'] = new RocketChatService()
  }

  public getService<T extends keyof ServerServices>(service: T): ServerServices[T] {
    return this._services[service]
  }

  public startup() {
    const services = Object.values(this._services) as BaseService[]
    for (const service of services) {
      service._startup()
    }
  }
}

export const ServiceManagerServer = new ServiceManagerServerClass()
