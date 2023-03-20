const postcss = require('postcss')
const cssModules = require('postcss-modules')

export class ScssModulesCompiler {
  async compileOneFile(inputFile, source) {
    const filename = inputFile.getPathInPackage()
    let classNames = ''

    const cssModulesProcessor = postcss([
      cssModules({
        generateScopedName: '[name]__[local]___[hash:base64:5]',
        getJSON: (_, json) => (classNames = json)
      })
    ])

    try {
      const ret = await cssModulesProcessor.process(source, { from: filename })
      const cssModuleCode = `module.exports = ${JSON.stringify(classNames)};`

      return { scopedScss: ret.css, cssModuleCode }
    } catch (error) {
      inputFile.error({
        message: `CSS Modules compilation error: ${error.message}`,
        sourcePath: inputFile.getDisplayPath()
      })
      return { scopedScss: '', cssModuleCode: '' }
    }
  }
}
