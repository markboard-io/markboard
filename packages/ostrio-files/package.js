Package.describe({
  name: 'ostrio:files',
  version: '0.1.0'
})

Package.onUse(api => {
  api.versionsFrom('1.9')
  api.use('webapp', 'server')
  api.use(['reactive-var', 'tracker', 'ddp-client'], 'client')
  api.use(
    ['mongo', 'check', 'random', 'ecmascript', 'fetch', 'ostrio:cookies@2.7.2'],
    ['client', 'server']
  )
  api.addAssets('worker.min.js', 'client')
  api.mainModule('server.js', 'server')
  api.mainModule('client.js', 'client')
  api.export('FilesCollection')
})

Npm.depends({
  eventemitter3: '4.0.7',
  'abort-controller': '3.0.0',
  'fs-extra': '11.1.1'
})
