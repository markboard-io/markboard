import { Meteor } from 'meteor/meteor'
import { ClientServices } from '../types'

class ServiceManagerCient {
  public get<T extends keyof ClientServices>(service: T): ClientServices[T] {
    return this._getServiceStub(service)
  }

  private _getServiceStub<T extends keyof ClientServices>(service: T): ClientServices[T] {
    const handler = {
      get(_target, method: string) {
        return (...args: any[]) => {
          return Meteor.callAsync(`${service}.${method}`, ...args)
        }
      }
    } as ProxyHandler<Record<string, any>>
    return new Proxy({}, handler) as ClientServices[T]
  }
}

export const Services = new ServiceManagerCient()
