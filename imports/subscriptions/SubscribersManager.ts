import { BoardsSubscriber } from './BoardsSubscriber'

class SubscribersManagerClass {
  private _subscribers = [BoardsSubscriber]

  subscribe() {
    this._subscribers.forEach(subscriber => subscriber.subscribe())
  }
}

export const SubscribersManager = new SubscribersManagerClass()
