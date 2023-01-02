import { Meteor } from 'meteor/meteor'
import { startExcalidrawSyncService } from '/imports/services'

export function startup() {
  Meteor.startup(async () => {
    startExcalidrawSyncService()
  })
}