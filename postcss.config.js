const postcss = require('postcss')
const postcssModules = require('postcss-modules')

// apply postcss-modules *.module.scss
const applyModulesConditionally = options => {
  return {
    postcssPlugin: 'apply-modules-conditionally',
    async Once(root, { result }) {
      if (root.source.input.file.endsWith('.module.scss')) {
        const modulesProcessor = postcss([postcssModules(options)])
        const { messages } = await modulesProcessor.process(root, { from: root.source.input.file })
        result.messages.push(...messages)
      }
    }
  }
}

module.exports = {
  plugins: [
    require('postcss-easy-import')({ extensions: ['.scss', '.module.scss'] }),
    applyModulesConditionally({
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      getJSON: () => {}
    })
  ]
}
