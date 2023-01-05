import { AccountService } from './AccountService'
import { BaseService } from './BaseService'
import { ExcalidrawSyncService } from './ExcalidrawSyncService'
import { ServerServices } from './types'

class ServiceManagerServerClass {
  private _services = {} as ServerServices

  constructor() {
    this._services['account'] = new AccountService()
    this._services['excalidrawSync'] = new ExcalidrawSyncService()
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
