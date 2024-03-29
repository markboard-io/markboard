import { startupServer } from './startupServer'
import { ServiceConfiguration } from 'meteor/service-configuration'
import { Accounts } from 'meteor/accounts-base'
import dotenv from 'dotenv'
import { Meteor } from 'meteor/meteor'
import { SITE_NAME } from '/imports/utils/constants'

// Setup proxy in dev environment, or Google OAuth will
// be not working in China, since it uses node-fetch which
// doesn't read `https_proxy` environment variable
// See: https://github.com/gajus/global-agent
if (process.env.NODE_ENV === 'development') {
  import('global-agent/bootstrap')
}

// Check whether `uploads` path was set
// we need a absolute path to store uploaded files
// e.g. /home/username/uploads
if (!process.env.UPLOAD_ABSOLUTE_PATH) {
  if (process.env.NODE_ENV === 'development') {
    process.env.UPLOAD_ABSOLUTE_PATH = `${process.env.PWD}/uploads`
    console.log('UPLOAD_ABSOLUTE_PATH:', process.env.UPLOAD_ABSOLUTE_PATH)
  } else {
    throw new Error(
      'Envrionment variable UPLOAD_ABSOLUTE_PATH is not set, ' +
        'please set it to the absolute path of the upload folder'
    )
  }
}

dotenv.config()

// Reset password configuration
Accounts.emailTemplates.siteName = SITE_NAME
Accounts.emailTemplates.from = process.env.SMTP_MAIL ?? 'noreply@example.com'
Accounts.emailTemplates.resetPassword.subject = () => `Reset Your Password on ${SITE_NAME}`
Accounts.urls.resetPassword = token => {
  return Meteor.absoluteUrl(`reset-password/${token}`)
}

// OAuth login configuration
ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: process.env.OAUTH_GITHUB_CLIENT_ID,
      secret: process.env.OAUTH_GITHUB_CLIENT_SECRET
    }
  }
)
ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: process.env.OAUTH_GOOGLE_CLIENT_ID,
      secret: process.env.OAUTH_GOOGLE_CLIENT_SECRET
    }
  }
)

startupServer()
