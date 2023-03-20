Package.describe({
  name: 'markboard:scss-modules',
  version: '0.4.1',
  summary: 'SCSS Modules support for Meteor'
})

Package.registerBuildPlugin({
  name: 'compileScssModules',
  use: ['ecmascript', 'caching-compiler'],
  sources: ['compile-scss.js'],
  npmDependencies: {
    'node-sass': '4.14.1'
  }
})

Package.onUse(function (api) {
  api.use('isobuild:compiler-plugin@1.0.0')
})
