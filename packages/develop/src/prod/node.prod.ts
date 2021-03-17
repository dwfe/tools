import {join} from 'path'
import {BuildStructure} from '../build.structure'
import {FileProcess} from '../fs'

export class NodeProd extends BuildStructure {

  constructor() {
    super()
    this.afterBuild()
  }

  afterBuild(): void {
    FileProcess.run([
      ['delete-path', [join(this.JS, 'tsconfig.tsbuildinfo')]],
      ['delete-path', [join(this.JS, 'prod.js')]],
      ['delete-path', [join(this.TYPES, 'prod.d.ts')]],
      ['delete-path', [join(this.TYPES, 'prod.d.ts.map')]],
    ])
  }

}
