import {IPoint} from './contracts';

export class Point {

  static of = (p?: IPoint): Point => new Point(p)

  constructor(public readonly p: IPoint = {x: 0, y: 0}) {
  }

  equal = ({p}: Point): boolean => Point.equal(this.p, p)


  static subtract = (p1: IPoint, p2: IPoint): IPoint => ({
    x: p1.x - p2.x,
    y: p1.y - p2.y
  })

  static equal = (p1: IPoint, p2: IPoint): boolean =>
    Math.abs(p1.x - p2.x) < ACCURACY &&
    Math.abs(p1.y - p2.y) < ACCURACY
  ;
}

const ACCURACY = 0.0001;

