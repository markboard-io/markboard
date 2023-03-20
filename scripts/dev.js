const { sh } = require('./sh')
const fs = require('fs')

main()

async function main() {
  const args = parseArguments()
  const envs = parseEnvironmentVariables()
  const port = args.port ?? 3000

  sh(`export $(echo '${envs}' | xargs) && meteor --port ${port} run`)
}

function parseArguments() {
  const options = {}
  const args = process.argv
  for (const arg of args) {
    const [key, value] = arg.split('=')
    options[key.replace(/-/g, '')] = value
  }
  return options
}

function parseEnvironmentVariables() {
  return fs
    .readFileSync('.env')
    .toString()
    .split('\n')
    .filter(line => !line.startsWith('#'))
    .join(' ')
}
