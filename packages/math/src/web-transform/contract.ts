/*
 * Homogeneous coordinates on RP**2
 * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
 *                    a c e
 * [a,b,c,d,e,f]  =>  b d f , here: linear part - a b c d
 *                    0 0 1    translation part - e f
 */
export type TWebMatrix = [number, number, number, number, number, number];

export interface IWebMatrix {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}
