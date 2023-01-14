const { sh } = require('./sh')

sh('rm -rf dist')
sh('meteor build --directory --server-only dist')
sh('cd dist/bundle')
sh('cd programs/server && npm install && cd -')
