const fs = require('fs')

function setupDotEnvFile() {
  const isDotEnvFileExists = fs.existsSync('.env')

  if (!isDotEnvFileExists) {
    fs.copyFileSync('.env.example', '.env')
  }
}

setupDotEnvFile()
