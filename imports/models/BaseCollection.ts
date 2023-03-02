import { Mongo } from 'meteor/mongo'
import { Document } from 'bson'

export type IMongoCollection = Mongo.Collection<Document, Document>

export abstract class BaseCollection<T extends Mongo.OptionalId<{}>> {
  public name!: string

  protected collection!: IMongoCollection

  constructor(name: string) {
    this.setCollection(new Mongo.Collection(name))
  }

  protected setName(name: string) {
    this.name = name
  }

  protected setCollection(collection: Mongo.Collection<Document, Document>) {
    this.collection = collection as unknown as IMongoCollection
  }

  protected insert(doc: T) {
    return this.collection.insertAsync(doc)
  }
}
