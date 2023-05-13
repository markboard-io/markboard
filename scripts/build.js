const { sh } = require('./sh')

// switch to Node.js 14.21
sh('eval "`fnm env`"')
sh('fnm use 14.21')
sh('node --version')

// build the project
sh('rm -rf dist')
sh('meteor build --directory --server-only dist')
sh('cd dist/bundle/programs/server && npm install && cd -')
sh('pm2 delete markboard')
sh('export $(cat .env | xargs) && pm2 start --name "markboard" dist/bundle/main.js')
