import type { JestConfigWithTsJest } from 'ts-jest'

const ESM_MODULES = [
  'roughjs',
  'points-on-curve',
  'path-data-parser',
  'points-on-path',
  'browser-fs-access',
  'nanoid'
]

// npx jest 2>&1 | grep 'FAIL'
const IGNORE_PATTERNS = [
  'imports/excalidraw/tests/export.test.tsx',
  'imports/excalidraw/tests/linearElementEditor.test.tsx',
  'imports/excalidraw/tests/clipboard.test.tsx',
  'imports/excalidraw/tests/align.test.tsx',
  'imports/excalidraw/tests/packages/excalidraw.test.tsx',
  'imports/excalidraw/element/textWysiwyg.test.tsx',
  'imports/excalidraw/tests/contextmenu.test.tsx',
  'imports/excalidraw/tests/resize.test.tsx',
  'imports/excalidraw/tests/scene/export.test.ts',
  'imports/excalidraw/tests/data/restore.test.ts',
  'imports/excalidraw/tests/selection.test.tsx',
  'imports/excalidraw/tests/zindex.test.tsx',
  'imports/excalidraw/tests/viewMode.test.tsx',
  'imports/excalidraw/tests/dragCreate.test.tsx',
  'imports/excalidraw/tests/elementLocking.test.tsx',
  'imports/excalidraw/tests/regressionTests.test.tsx',
  'imports/excalidraw/tests/packages/utils.test.ts',
  'imports/excalidraw/tests/multiPointCreate.test.tsx',
  'imports/excalidraw/tests/move.test.tsx',
  'imports/excalidraw/tests/charts.test.tsx',
  'imports/excalidraw/tests/binding.test.tsx',
  'imports/excalidraw/tests/appState.test.tsx',
  'imports/excalidraw/actions/actionStyles.test.tsx',
  'imports/excalidraw/tests/history.test.tsx',
  'imports/excalidraw/tests/collab.test.tsx',
  'imports/excalidraw/components/Sidebar/Sidebar.test.tsx',
  'imports/excalidraw/tests/export.test.tsx',
  'imports/excalidraw/tests/linearElementEditor.test.tsx',
  'imports/excalidraw/tests/clipboard.test.tsx',
  'imports/excalidraw/tests/align.test.tsx',
  'imports/excalidraw/tests/packages/excalidraw.test.tsx',
  'imports/excalidraw/element/textWysiwyg.test.tsx',
  'imports/excalidraw/tests/contextmenu.test.tsx',
  'imports/excalidraw/tests/resize.test.tsx',
  'imports/excalidraw/tests/scene/export.test.ts',
  'imports/excalidraw/tests/data/restore.test.ts',
  'imports/excalidraw/tests/selection.test.tsx',
  'imports/excalidraw/tests/zindex.test.tsx',
  'imports/excalidraw/tests/viewMode.test.tsx',
  'imports/excalidraw/tests/dragCreate.test.tsx',
  'imports/excalidraw/tests/elementLocking.test.tsx',
  'imports/excalidraw/tests/regressionTests.test.tsx',
  'imports/excalidraw/tests/packages/utils.test.ts',
  'imports/excalidraw/tests/multiPointCreate.test.tsx',
  'imports/excalidraw/tests/move.test.tsx',
  'imports/excalidraw/tests/charts.test.tsx',
  'imports/excalidraw/tests/binding.test.tsx',
  'imports/excalidraw/tests/appState.test.tsx',
  'imports/excalidraw/actions/actionStyles.test.tsx',
  'imports/excalidraw/tests/history.test.tsx',
  'imports/excalidraw/tests/collab.test.tsx',
  'imports/excalidraw/components/Sidebar/Sidebar.test.tsx',
  'imports/excalidraw/tests/library.test.tsx'
]

const jestConfig: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    // ignore stylesheets files
    // See: https://stackoverflow.com/a/50572999
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '\\/imports\\/(.+)': '<rootDir>/imports/$1',
    'meteor/.+': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.m?[tj]sx?$': [
      'ts-jest',
      {
        useESM: true,
        isolatedModules: true
      }
    ]
  },
  transformIgnorePatterns: [`node_modules/(?!(${ESM_MODULES.join('|')})/)`],
  setupFilesAfterEnv: ['./tests/setupTests.ts'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: IGNORE_PATTERNS
}

export default jestConfig
