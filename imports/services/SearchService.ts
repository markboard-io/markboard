import { BoardCollection } from '../models'
import { BaseService } from './BaseService'
import { Collections } from '../models/Collections'
import { Meteor } from 'meteor/meteor'
import Fuse from 'fuse.js'

export class SearchService extends BaseService {
  constructor() {
    super('board')
  }

  public startup(): void {
    Meteor.publish(Collections.names.boards, () => {
      const userid = Meteor.userId()
      if (userid != null) {
        return BoardCollection.raw.find({ userid })
      }
    })
  }

  public searchBoards(searchTerm: string) {
    const userId = Meteor.userId()
    if (userId == null) {
      throw new Meteor.Error('Unauthorized')
    }

    const boards = BoardCollection.raw.find({ userId }).fetch()

    const options = {
      keys: ['name', 'description'],
      threshold: 0.2 // The minimum score required for a match to be considered a match
    }

    const fuse = new Fuse(boards, options)
    const results = fuse.search(searchTerm)

    return results
  }
}
