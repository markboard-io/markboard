const { sh } = require('./sh')

main()

function main() {
  const args = parseArguments()
  const port = args['--port'] ?? 3000

  sh(`export $(cat .env | xargs) && meteor --port ${port} run`)
}

function parseArguments() {
  const options = {}
  const args = process.argv
  for (const arg of args) {
    const [key, value] = arg.split('=')
    options[key] = value
  }
  return options
}
