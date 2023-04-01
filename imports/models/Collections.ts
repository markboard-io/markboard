import { Mongo } from 'meteor/mongo'
import { Document } from 'bson'
import { FilesCollection } from 'meteor/ostrio:files'
import { Meteor } from 'meteor/meteor'

if (Meteor.isServer && !process.env.UPLOAD_ABSOLUTE_PATH) {
  throw new Error(
    'Envrionment variable UPLOAD_ABSOLUTE_PATH is not set, ' +
      'please set it to the absolute path of the upload folder'
  )
}

class CollectionsClass {
  private _collections = {
    boards: new Mongo.Collection('boards'),
    logs: new Mongo.Collection('logs'),
    appState: new Mongo.Collection('appState'),
    files: new FilesCollection({
      storagePath: process.env.UPLOAD_ABSOLUTE_PATH,
      collectionName: 'files',
      allowClientCode: false,
      onBeforeUpload(_file: File) {
        return true
      }
    })
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
