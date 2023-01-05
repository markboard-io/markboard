import { Meteor } from 'meteor/meteor'

// BaseService
// methods should be prefixed with '_'
// or it will be registered into Meteor.methods by accident
export abstract class BaseService {
  private _isStarted = false

  constructor(public serviceName: string) {
    this._registerMethods = this._registerMethods.bind(this)
  }

  // Initial jobs to run during server startup
  public abstract startup(): void

  // MUST be called by ServiceManger only
  public _startup() {
    if (!this._isStarted) {
      this._isStarted = true
      this.startup()
      this._registerMethods()
    }
  }

  private _registerMethods() {
    const instance = Object.getPrototypeOf(this) as Record<string, any>
    const ownPublicMethods = Object.getOwnPropertyNames(instance)
      .filter(name => !name.startsWith('_') && !['constructor', 'startup'].includes(name))
      .filter(name => typeof instance[name] === 'function')
    const methods = ownPublicMethods.reduce<typeof instance>((methods, key) => {
      const method = instance[key].bind(instance)
      return Object.assign(methods, { [`${this.serviceName}.${key}`]: method })
    }, {})
    Meteor.methods(methods)
  }
}
