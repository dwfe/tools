import {IPoint, IVector} from './contracts';
import {Point} from './point-2d';

export class Vector {

  static len = (v: IVector): number => {
    const {x, y} = Point.subtract(v[0], v[1])
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  }

  static middle = (v: IVector): IPoint => ({
    x: (v[0].x + v[1].x) / 2,
    y: (v[0].y + v[1].y) / 2
  });

}
