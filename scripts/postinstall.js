const fs = require('fs')
const { sh } = require('sh')

function setupDotEnvFile() {
  const isDotEnvFileExists = fs.existsSync('.env')

  if (!isDotEnvFileExists) {
    fs.copyFileSync('.env.example', '.env')
  }
}

function deployOnDigitalOcean() {
  sh('curl https://install.meteor.com/ | sh') // install meteor
  sh('meteor npm install') // install dependencies via meteor
  sh('rm package.json') // avoid digital ocean running `npm install`
}

setupDotEnvFile()
if (process.env.DIGITAL_OCENAN != null) {
  deployOnDigitalOcean()
}
