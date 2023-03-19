import postcss from 'postcss'
import postcssModules from 'postcss-modules'

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

class ScssModulesCompiler {
  processFilesForTarget(files) {
    for (const file of files) {
      const filename = file.getBasename()
      if (filename === 'FileListGroup.module.scss') {
        this.processFile(file)
      }
    }
  }

  async processFile(file) {
    const moduleScss = file.getContentsAsString()
    const getJSON = (_cssFileName, json) => {
      const jsContent = `export default ${JSON.stringify(json)};`
      file.addJavaScript({
        path: file.getPathInPackage() + '.js',
        data: jsContent
      })
    }

    const plugins = [
      applyModulesConditionally({
        generateScopedName: '[name]__[local]___[hash:base64:5]',
        getJSON
      })
    ]

    try {
      const result = await postcss(plugins).process(moduleScss, { from: undefined })
      file.addStylesheet({
        path: file.getPathInPackage() + '.css',
        data: result.css
      })
    } catch (error) {
      console.error('Error processing CSS Modules:', error)
    }
  }
}

Plugin.registerCompiler(
  {
    extensions: ['module.scss'],
    archMatching: 'web'
  },
  () => new ScssModulesCompiler()
)
