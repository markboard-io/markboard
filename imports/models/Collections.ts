import { Mongo } from 'meteor/mongo'
import { Document } from 'bson'

class CollectionsClass {
  private _collections = {
    boards: new Mongo.Collection('boards'),
    logs: new Mongo.Collection('logs'),
    appState: new Mongo.Collection('appState')
  } as const

  public getCollectionByName(name: string) {
    const collecitons = this._collections as any as Record<
      string,
      Mongo.Collection<Document, Document>
    >
    return collecitons[name]
  }

  public get names() {
    return Object.keys(this._collections).reduce((o, cur) => {
      return Object.assign(o, { [cur]: cur })
    }, {}) as Record<keyof typeof this._collections, string>
  }
}

export const Collections = new CollectionsClass()
