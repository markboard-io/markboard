import { IServices } from './types'

class ServiceManagerCient {
  public get<T extends keyof IServices>(service: T): IServices[T] {
    return this._getServiceStub(service)
  }

  private _getServiceStub<T extends keyof IServices>(service: T): IServices[T] {
    const handler = {
      get(_target, method: string) {
        console.log('Getting the property', method)
        console.log('method', `${service}.${method}`)
        return () => {}
      }
    } as ProxyHandler<Record<string, any>>
    return new Proxy({}, handler) as IServices[T]
  }
}

export const Services = new ServiceManagerCient()
