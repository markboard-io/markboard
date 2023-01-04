import { Meteor } from 'meteor/meteor'
import { startExcalidrawSyncService } from '/imports/services'
import dotenv from 'dotenv'
import fs from 'fs'
import { Logs } from '/imports/models'

// dotenv doesn't support overwrite envs, we need to do it manually
// See: https://forums.meteor.com/t/dotenv-from-npm-mongo-url-not-being-set/52979/3
function setupEnvironmntVariables() {
  const env = fs.readFileSync(`${ process.env.PWD }/.env`)
  const variables = dotenv.parse(env)
  Object.assign(process.env, variables)
}

export function startup() {
  Meteor.startup(async () => {
    setupEnvironmntVariables()
    startExcalidrawSyncService()
    Logs.appendStartupLog()
  })
}