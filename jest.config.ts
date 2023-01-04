import type { JestConfigWithTsJest } from 'ts-jest'

const ESM_MODULES = [
  'roughjs',
  'points-on-curve',
  'path-data-parser',
  'points-on-path',
  'browser-fs-access',
  'nanoid'
]

const jestConfig: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    // ignore stylesheets files
    // See: https://stackoverflow.com/a/50572999
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '\\/imports\\/(.+)': '<rootDir>/imports/$1'
  },
  transform: {
    '^.+\\.m?[tj]sx?$': ['ts-jest', {
      useESM: true,
      isolatedModules: true
    }]
  },
  transformIgnorePatterns: [`node_modules/(?!(${ ESM_MODULES.join('|') })/)`],
  setupFilesAfterEnv: ['./tests/setupTests.ts'],
  testEnvironment: 'jsdom'
}

export default jestConfig
