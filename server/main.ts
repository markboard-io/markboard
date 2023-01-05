import { startup } from './startup'
import { ServiceConfiguration } from 'meteor/service-configuration'
import dotenv from 'dotenv'

// Setup proxy in dev environment, or Google OAuth will
// be not working in China, since it uses node-fetch which
// doesn't read `https_proxy` environment variable
// See: https://github.com/gajus/global-agent
if (process.env.NODE_ENV === 'development') {
  import('global-agent/bootstrap')
}

dotenv.config()
startup()

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
      loginStyle: 'redirect',
      clientId: process.env.OAUTH_GOOGLE_CLIENT_ID,
      secret: process.env.OAUTH_GOOGLE_CLIENT_SECRET
    }
  }
)
