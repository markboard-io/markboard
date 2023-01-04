import { Meteor } from 'meteor/meteor'
import { startExcalidrawSyncService } from '/imports/services'
import { Logs } from '/imports/models'

export function startup() {
  Meteor.startup(async () => {
    startExcalidrawSyncService()
    Logs.appendStartupLog()
  })
}