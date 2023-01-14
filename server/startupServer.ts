import { Meteor } from 'meteor/meteor'
import { Logs } from '/imports/models'
import { ServiceManagerServer } from '/imports/services'

export function startupServer() {
  Meteor.startup(async () => {
    ServiceManagerServer.startup()
    Logs.appendStartupLog()
  })
}
