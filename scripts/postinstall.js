const fs = require('fs')

const isDotEnvFileExists = fs.existsSync('.env')

if (!isDotEnvFileExists) {
  fs.copyFileSync('.env.example', '.env')
}
