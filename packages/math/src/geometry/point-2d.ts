import {IDiff, IPoint} from './contract'

class P {

  static of = (p?: IPoint): P => new P(p)

  constructor(public readonly p: IPoint = {x: 0, y: 0}) {
  }

  k = (kx: number, ky = kx): P => P.of(P.k(kx, ky)(this.p))
  subtract = ({p}: P): P => P.of(P.subtract(this.p, p))
  add = ({p}: P): P => P.of(P.add(this.p, p))
  middle = ({p}: P): P => P.of(P.middle(this.p, p))
  distance = ({p}: P): number => P.distance(this.p, p)
  isEquals = ({p}: P): boolean => P.isEquals(this.p, p);


  static k = (kx: number, ky = kx) =>
    ({x, y}: IPoint): IPoint => ({
      x: x * kx,
      y: y * ky
    })

  static subtract = (p1: IPoint, p2: IPoint): IPoint => ({
    x: p1.x - p2.x,
    y: p1.y - p2.y
  })

  static diff = (p1: IPoint, p2: IPoint): IDiff => ({
    dX: p1.x - p2.x,
    dY: p1.y - p2.y
  })

  static add = (p1: IPoint, p2: IPoint): IPoint => ({
    x: p1.x + p2.x,
    y: p1.y + p2.y
  })

  static middle = (p1: IPoint, p2: IPoint): IPoint =>
    P.k(0.5)(P.add(p1, p2))

  static distance = (p1: IPoint, p2: IPoint): number => {
    const {x, y} = P.subtract(p1, p2)
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  }

  static isEquals = (p1: IPoint, p2: IPoint): boolean =>
    Math.abs(p1.x - p2.x) < ACCURACY &&
    Math.abs(p1.y - p2.y) < ACCURACY
  ;
}

const ACCURACY = 0.0001;


export {
  P as Point
}
