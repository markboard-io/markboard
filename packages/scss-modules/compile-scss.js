import sass from 'node-sass'
import { promisify } from 'util'
import { ScssModulesCompiler } from './scss-modules'
import { result } from 'lodash'
const path = Plugin.path
const fs = Plugin.fs

const compileSass = promisify(sass.render)
const { includePaths } = _getConfig('scss-config.json')
const _includePaths = Array.isArray(includePaths) ? includePaths : []

const convertToStandardPath = function convertToStandardPath(osPath) {
  if (process.platform === 'win32') {
    // return toPosixPath(osPath, partialPath);
    // p = osPath;
    // Sometimes, you can have a path like \Users\IEUser on windows, and this
    // actually means you want C:\Users\IEUser
    if (osPath[0] === '\\') {
      osPath = process.env.SystemDrive + osPath
    }

    osPath = osPath.replace(/\\/g, '/')
    if (osPath[1] === ':') {
      // transform "C:/bla/bla" to "/c/bla/bla"
      osPath = `/${osPath[0]}${osPath.slice(2)}`
    }

    return osPath
  }

  return osPath
}

const rootDir = convertToStandardPath((process.env.PWD || process.cwd()) + '/')

class SassCompiler extends MultiFileCachingCompiler {
  sassModuleCompiler = new ScssModulesCompiler()

  constructor() {
    super({
      compilerName: 'sass',
      defaultCacheSize: 1024 * 1024 * 10
    })
  }

  getCacheKey(inputFile) {
    return inputFile.getSourceHash()
  }

  compileResultSize(compileResult) {
    return compileResult.css.length + this.sourceMapSize(compileResult.sourceMap)
  }

  // The heuristic is that a file is an import (ie, is not itself processed as a
  // root) if it matches _*.sass, _*.scss
  // This can be overridden in either direction via an explicit
  // `isImport` file option in api.addFiles.
  isRoot(inputFile) {
    const fileOptions = inputFile.getFileOptions()

    if (fileOptions.hasOwnProperty('isImport')) {
      return !fileOptions.isImport
    }

    const pathInPackage = inputFile.getPathInPackage()
    return !this.hasUnderscore(pathInPackage)
  }

  hasUnderscore(file) {
    return path.basename(file).startsWith('_')
  }

  compileOneFileLater(inputFile, getResult) {
    const path = inputFile.getPathInPackage()
    const isSassModule = /module\.(sass|scss)$/.test(path)

    inputFile.addStylesheet({ path }, async () => {
      const { css: data, sourceMap } = await getResult()
      return result && { data, sourceMap }
    })
    if (isSassModule) {
      inputFile.addJavaScript({ path }, async () => {
        const { cssModuleCode } = await getResult()
        return { data: cssModuleCode }
      })
    }
  }

  async compileOneFile(inputFile, allFiles) {
    const referencedImportPaths = []

    var totalImportPath = []
    var sourceMapPaths = [`.${inputFile.getDisplayPath()}`]

    const addUnderscore = file => {
      if (!this.hasUnderscore(file)) {
        file = path.join(path.dirname(file), `_${path.basename(file)}`)
      }
      return file
    }

    const getRealImportPath = importPath => {
      const isAbsolute = importPath.startsWith('/')
      const possibleFiles = []

      let possibleExtensions = ['scss', 'sass', 'css']

      if (!importPath.match(/\.s?(a|c)ss$/)) {
        possibleExtensions = [
          inputFile.getExtension(),
          ...possibleExtensions.filter(e => e !== inputFile.getExtension())
        ]
        for (const extension of possibleExtensions) {
          possibleFiles.push(`${importPath}.${extension}`)
        }
      } else {
        possibleFiles.push(importPath)
      }

      for (const possibleFile of possibleFiles) {
        if (!this.hasUnderscore(possibleFile)) {
          possibleFiles.push(addUnderscore(possibleFile))
        }
      }

      for (const possibleFile of possibleFiles) {
        if (
          (isAbsolute && fileExists(possibleFile)) ||
          (!isAbsolute && allFiles.has(possibleFile))
        ) {
          return { absolute: isAbsolute, path: possibleFile }
        }
      }

      return null
    }

    const fixTilde = function (thePath) {
      let newPath = thePath
      // replace ~ with {}/....
      if (newPath.startsWith('~')) {
        newPath = newPath.replace('~', '{}/node_modules/')
      }

      // add {}/ if starts with node_modules
      if (!newPath.startsWith('{')) {
        if (newPath.startsWith('node_modules')) {
          newPath = '{}/' + newPath
        }
        if (newPath.startsWith('/node_modules')) {
          newPath = '{}' + newPath
        }
      }

      return newPath
    }

    //Handle import statements found by the sass compiler, used to handle cross-package imports
    const importer = function (url, prev, done) {
      prev = convertToStandardPath(prev)
      prev = fixTilde(prev)
      if (!totalImportPath.length) {
        totalImportPath.push(prev)
      }

      if (prev !== undefined) {
        // iterate backwards over totalImportPath and remove paths that don't equal the prev url
        for (let i = totalImportPath.length - 1; i >= 0; i--) {
          // check if importPath contains prev, if it doesn't, remove it. Up until we find a path that does contain it
          if (totalImportPath[i] == prev) {
            break
          } else {
            // remove last item (which has to be item i because we are iterating backwards)
            totalImportPath.splice(i, 1)
          }
        }
      }
      let importPath = convertToStandardPath(url)
      importPath = fixTilde(importPath)
      for (let i = totalImportPath.length - 1; i >= 0; i--) {
        if (importPath.startsWith('/') || importPath.startsWith('{')) {
          break
        }
        // 'path' is the nodejs path module
        importPath = path.join(path.dirname(totalImportPath[i]), importPath)
      }

      let accPosition = importPath.indexOf('{')
      if (accPosition > -1) {
        importPath = importPath.substr(accPosition, importPath.length)
      }

      // TODO: This fix works.. BUT if you edit the scss/css file it doesn't recompile! Probably because of the absolute path problem
      if (importPath.startsWith('{')) {
        // replace {}/node_modules/ for rootDir + "node_modules/"
        importPath = importPath.replace(/^(\{\}\/node_modules\/)/, rootDir + 'node_modules/')
        // importPath = importPath.replace('{}/node_modules/', rootDir + "node_modules/");
        if (importPath.endsWith('.css')) {
          // .css files aren't in allFiles. Replace {}/ for absolute path.
          importPath = importPath.replace(/^(\{\}\/)/, rootDir)
        }
      }

      try {
        let parsed = getRealImportPath(importPath)
        if (!parsed) {
          parsed = _getRealImportPathFromIncludes(url, getRealImportPath)
        }
        if (!parsed) {
          //Nothing found...
          throw new Error(
            `File to import: ${url} not found in file: ${
              totalImportPath[totalImportPath.length - 2]
            }`
          )
        }
        totalImportPath.push(parsed.path)

        if (parsed.absolute) {
          sourceMapPaths.push(parsed.path)
          done({ contents: fs.readFileSync(parsed.path, 'utf8'), file: parsed.path })
        } else {
          referencedImportPaths.push(parsed.path)
          sourceMapPaths.push(decodeFilePath(parsed.path))
          done({ contents: allFiles.get(parsed.path).getContentsAsString(), file: parsed.path })
        }
      } catch (e) {
        return done(e)
      }
    }

    //Start compile sass (async)
    const options = {
      sourceMap: true,
      sourceMapContents: true,
      sourceMapEmbed: false,
      sourceComments: false,
      omitSourceMapUrl: true,
      sourceMapRoot: '.',
      indentedSyntax: inputFile.getExtension() === 'sass',
      outFile: `.${inputFile.getBasename()}`,
      importer,
      includePaths: [],
      precision: 10
    }

    options.file = this.getAbsoluteImportPath(inputFile)

    options.data = inputFile.getContentsAsBuffer().toString('utf8')

    //If the file is empty, options.data is an empty string
    // In that case options.file will be used by node-sass,
    // which it can not read since it will contain a meteor package or app reference '{}'
    // This is one workaround, another one would be to not set options.file, in which case the importer 'prev' will be 'stdin'
    // However, this would result in problems if a file named stdín.scss would exist.
    // Not the most elegant of solutions, but it works.
    if (!options.data.trim()) {
      options.data = '$fakevariable_ae7bslvbp2yqlfba : blue;'
    }

    let output
    try {
      output = await compileSass(options)
    } catch (e) {
      inputFile.error({
        message: `Scss compiler error: ${e.formatted}\n`,
        sourcePath: inputFile.getDisplayPath()
      })
      return null
    }
    //End compile sass

    //Start fix sourcemap references
    if (output.map) {
      const map = JSON.parse(output.map.toString('utf-8'))
      map.sources = sourceMapPaths
      output.map = map
    }
    //End fix sourcemap references

    const compileResult = {
      css: output.css.toString('utf-8'),
      sourceMap: output.map,
      cssModuleCode: ''
    }
    const isSassModule = /module\.(sass|scss)$/.test(inputFile.getPathInPackage())

    if (isSassModule) {
      const output = await this.sassModuleCompiler.compileOneFile(inputFile, compileResult.css)
      const { cssModuleCode, scopedScss } = output
      compileResult.css = scopedScss
      compileResult.cssModuleCode = cssModuleCode
    }

    return { compileResult, referencedImportPaths }
  }
}

function _getRealImportPathFromIncludes(importPath, getRealImportPathFn) {
  let possibleFilePath, foundFile

  for (let includePath of _includePaths) {
    possibleFilePath = path.join(includePath, importPath)
    foundFile = getRealImportPathFn(possibleFilePath)

    if (foundFile) {
      return foundFile
    }
  }

  return null
}

/**
 * Build a path from current process working directory (i.e. meteor project
 * root) and specified file name, try to get the file and parse its content.
 * @param configFileName
 * @returns {{}}
 * @private
 */
function _getConfig(configFileName) {
  const appdir = process.env.PWD || process.cwd()
  const custom_config_filename = path.join(appdir, configFileName)
  let userConfig = {}

  if (fileExists(custom_config_filename)) {
    userConfig = fs.readFileSync(custom_config_filename, {
      encoding: 'utf8'
    })
    userConfig = JSON.parse(userConfig)
  } else {
    //console.warn('Could not find configuration file at ' + custom_config_filename);
  }
  return userConfig
}

function decodeFilePath(filePath) {
  const match = filePath.match(/{(.*)}\/(.*)$/)
  if (!match) {
    throw new Error(`Failed to decode sass path: ${filePath}`)
  }

  if (match[1] === '') {
    // app
    return match[2]
  }

  return `packages/${match[1]}/${match[2]}`
}

function fileExists(file) {
  if (fs.statSync) {
    try {
      fs.statSync(file)
    } catch (e) {
      return false
    }
    return true
  } else if (fs.existsSync) {
    return fs.existsSync(file)
  }
}

Plugin.registerCompiler(
  {
    extensions: ['scss', 'sass'],
    archMatching: 'web'
  },
  () => new SassCompiler()
)
