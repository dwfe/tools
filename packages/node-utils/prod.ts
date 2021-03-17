import {FileProcess} from '@do-while-for-each/develop'
import {join, resolve} from 'path'

const DIST = resolve(__dirname, '../')

FileProcess.run([
  ['delete-path', [join(DIST, 'js/tsconfig.tsbuildinfo')]],
  ['delete-path', [join(DIST, 'js/prod.js')]],
  ['delete-path', [join(DIST, 'types/prod.d.ts')]],
  ['delete-path', [join(DIST, 'types/prod.d.ts.map')]],
])
