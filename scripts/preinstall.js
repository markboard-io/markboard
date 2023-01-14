const { sh } = require('./sh')

function deployOnDigitalOcean() {
  sh('curl https://install.meteor.com/ | sh') // install meteor
  sh('meteor npm install') // install dependencies via meteor
  sh('rm package.json && rm package-lock.json') // avoid digital ocean running `npm install`
}

if (process.env.DIGITAL_OCENAN != null) {
  deployOnDigitalOcean()
}
