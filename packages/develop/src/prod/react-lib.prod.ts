import {Configuration} from 'webpack'
import {join} from 'path'
import {WebpackCompilerFileAction} from '../webpack/plugin/compiler.file-action'
import {AbstractWebpackProd} from './abstract.webpack.prod'

export class ReactLibProd extends AbstractWebpackProd {

  constructor() {
    super()
  }

  config(): Configuration {
    return {
      mode: 'production',
      entry: './index.tsx',
      output: {
        path: this.DIST,
        filename: this.INDEX,
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: (url, resourcePath, context) =>
                'js' + resourcePath.replace(context, '')
            },
            exclude: /node_modules/
          },
        ]
      },
      plugins: [
        new WebpackCompilerFileAction('done', [
          ['delete-path', [join(this.DIST, 'index.js')]],
          ['delete-path', [join(this.JS, 'prod.js')]],
          ['delete-path', [join(this.TYPES, 'prod.d.ts')]],
          ['delete-path', [join(this.TYPES, 'prod.d.ts.map')]],
        ]),
      ],
      resolve: {
        extensions: ['.tsx', '.ts', '.js']
      },
    }
  }

}
