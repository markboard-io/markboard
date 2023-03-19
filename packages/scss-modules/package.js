Package.describe({
  name: 'markboard:scss-modules',
  version: '0.1.0',
  summary: 'Simple SCSS Modules for Meteor'
})

Package.onUse(api => {
  api.versionsFrom('2.3')
  api.use('isobuild:compiler-plugin@1.0.0')
})

Package.registerBuildPlugin({
  name: 'compileScssModules',
  use: ['caching-compiler@1.2.2', 'ecmascript@0.15.1'],
  sources: ['scss-modules.js'],
  npmDependencies: {
    postcss: '8.4.21',
    'postcss-modules': '6.0.0'
  }
})
