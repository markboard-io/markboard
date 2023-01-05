import { Meteor } from 'meteor/meteor'
import { Logs } from '/imports/models'
import { ServiceManagerServer } from '/imports/services'

export function startup() {
  Meteor.startup(async () => {
    ServiceManagerServer.startup()
    Logs.appendStartupLog()
  })
}
