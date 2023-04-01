type EventListener = (...args: any[]) => void

export class EventEmitter {
  private _events: Map<string, EventListener[]>

  constructor() {
    this.emit = this.emit.bind(this)
    this._events = new Map()
  }

  public on(event: string, listener: EventListener): EventListener {
    if (this._events.has(event)) {
      let listeners = this._events.get(event)
      listeners = listeners ? [...listeners, listener] : [listener]
      this._events.set(event, listeners)
    } else {
      this._events.set(event, [listener])
    }
    return listener
  }

  public emit(event: string, ...args: any[]): void {
    if (this._events.has(event)) {
      const listeners = this._events.get(event)
      if (!listeners) return
      listeners.forEach(listener => listener(...args))
    }
  }

  public off(event: string, listener: EventListener): void {
    if (this._events.has(event)) {
      const listeners = this._events.get(event)
      if (!listeners) return
      const index = listeners.indexOf(listener)
      if (index !== -1) listeners.splice(index, 1)
      if (listeners.length === 0) this._events.delete(event)
    }
  }
}

export const globalEventEmitter = new EventEmitter()
