import webpack, {Configuration} from 'webpack'
import {BuildStructure} from '../build.structure'

export abstract class AbstractWebpackProd extends BuildStructure {

  constructor() {
    super()
    webpack(this.config(), (err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(stats.toString());
      }
    })
  }

  abstract config(): Configuration;
}
