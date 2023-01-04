import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import { Document } from 'bson'


export type IMongoCollection = Mongo.Collection<Document, Document> & {
  attachSchema(schema: SimpleSchema): void
}

export abstract class BaseCollection<T extends Mongo.OptionalId<{}>> {
  public name!: string

  private collection!: IMongoCollection

  constructor(name: string) {
    this.setCollection(new Mongo.Collection(name))
  }

  protected setName(name: string) {
    this.name = name
  }

  protected setCollection(collection: Mongo.Collection<Document, Document>) {
    this.collection = collection as unknown as IMongoCollection
  }

  protected attachSchema(schema: SimpleSchema) {
    this.collection.attachSchema(schema)
  }

  protected insert(doc: T) {
    this.collection.insert(doc)
  }
}