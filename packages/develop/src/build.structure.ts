import {join} from 'path'

export class BuildStructure {

  DIST: string
  JS: string
  TYPES: string
  INDEX = 'index.js'

  constructor() {
    this.DIST = join(process.cwd(), 'dist')
    this.JS = join(this.DIST, 'js')
    this.TYPES = join(this.DIST, 'types')
  }

}
