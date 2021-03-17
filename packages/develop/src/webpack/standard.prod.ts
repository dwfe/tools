import webpack, {Configuration} from 'webpack'
import {join} from 'path'
import {WebpackCompilerFileAction} from './plugin/compiler.file-action'

export class StandardProd {

  DIST: string
  JS: string
  TYPES: string
  INDEX = 'index.js'

  constructor() {
    this.DIST = join(process.cwd(), 'dist')
    this.JS = join(this.DIST, 'js')
    this.TYPES = join(this.DIST, 'types')
    webpack(this.config(), (err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(stats.toString());
      }
    })
  }

  config(): Configuration {
    return {
      mode: 'production',
      entry: join(this.JS, this.INDEX),
      output: {
        path: this.DIST,
        filename: this.INDEX,
        libraryTarget: 'umd'
      },
      plugins: [
        new WebpackCompilerFileAction('done', [
          ['clean-dir', [this.JS]],
          ['move-file', [join(this.DIST, this.INDEX), join(this.JS, this.INDEX)]],
          ['delete-path', [join(this.TYPES, 'prod.d.ts')]],
          ['delete-path', [join(this.TYPES, 'prod.d.ts.map')]],
        ])
      ]
    }
  }

}
