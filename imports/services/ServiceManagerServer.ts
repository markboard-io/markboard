import { AccountService } from './AccountService'
import { BaseService } from './BaseService'
import { ExcalidrawSyncService } from './ExcalidrawSyncService'
import { IServices } from './types'

class ServiceManagerServerClass {
  private _services = {} as IServices

  constructor() {
    this._services['account'] = new AccountService()
    this._services['excalidrawSync'] = new ExcalidrawSyncService()
  }

  public getService<T extends keyof IServices>(service: T): IServices[T] {
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
