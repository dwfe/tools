import {Configuration} from 'webpack'
import {join} from 'path'
import {WebpackCompilerFileAction} from '../webpack/plugin/compiler.file-action'
import {AbstractWebpackProd} from './abstract.webpack.prod'

export class WebProd extends AbstractWebpackProd {

  constructor() {
    super()
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
