import {join, resolve} from 'path'
import {FileProcess} from './src/fs'

const DIST = resolve(__dirname, '../')

FileProcess.run([
  ['delete-path', [join(DIST, 'js/tsconfig.tsbuildinfo')]],
  ['delete-path', [join(DIST, 'js/prod.js')]],
])
