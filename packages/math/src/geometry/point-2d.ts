import {TPoint} from './contract'

class P {

  static of = (p: TPoint = [0, 0]): P => new P(p)

  constructor(public readonly p: TPoint) {
  }

  k = (kx: number, ky = kx): P => P.of(P.k(kx, ky)(this.p))
  subtract = (p: TPoint): P => P.of(P.subtract(this.p, p))
  add = (p: TPoint): P => P.of(P.add(this.p, p))
  middle = (p: TPoint): P => P.of(P.middle(this.p, p))
  distance = (p: TPoint): number => P.distance(this.p, p)
  isEqual = (p: TPoint): boolean => P.isEqual(this.p, p);


  static k = (kx: number, ky = kx) =>
    (p: TPoint): TPoint => ([
      p[0] * kx,
      p[1] * ky
    ])

  static subtract = (p1: TPoint, p2: TPoint): TPoint => ([
    p1[0] - p2[0],
    p1[1] - p2[1]
  ])

  static add = (p1: TPoint, p2: TPoint): TPoint => ([
    p1[0] + p2[0],
    p1[1] + p2[1]
  ])

  static middle = (p1: TPoint, p2: TPoint): TPoint =>
    P.k(0.5)(P.add(p1, p2))

  static distance = (p1: TPoint, p2: TPoint): number => {
    const result = P.subtract(p1, p2)
    return Math.sqrt(Math.pow(result[0], 2) + Math.pow(result[1], 2))
  }

  static isEqual = (p1: TPoint, p2: TPoint): boolean =>
    Math.abs(p1[0] - p2[0]) < ACCURACY &&
    Math.abs(p1[1] - p2[1]) < ACCURACY
  ;
}

const ACCURACY = 0.0001;


export {
  P as Point
}
