import {IPoint, IVector} from './contract'
import {Point} from './point-2d'

class V {

  static of = (v: IVector): V => new V(v)

  constructor(public readonly v: IVector) {
  }

  middle = (): IPoint => V.middle(this.v)
  len = (): number => V.len(this.v)


  static middle = (v: IVector): IPoint => Point.middle(v[0], v[1]);
  static len = (v: IVector): number => Point.distance(v[0], v[1])

}

export {
  V as Vector
}
