import {AngleType, IPoint, rad} from '../geometry';

/*
 * Homogeneous coordinates on RP**2
 * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
 *                     a c e
 * [a,b,c,d,e,f]  <=>  b d f , here (a b c d) - linear part
 *                     0 0 1            (e f) - translation part
 */
type IMatrix = [number, number, number, number, number, number];

class M { // exported as WebMatrix

  static of = (m?: IMatrix): M => new M(m);

  constructor(public readonly m: IMatrix = M.identity()) {
  }

  determinant = (): number => M.determinant(this.m);

//region Matrix transformations

  invert = (): M | null => {
    const invM = M.invert(this.m)
    return invM === null ? null : M.of(invM)
  }
  multiply = ({m}: M): M => M.of(M.multiply(this.m, m));
  multiplyByScalar = (scalar: number): M => M.of(M.multiplyByScalar(this.m, scalar));

  translate = (tx: number, ty: number = tx): M => M.of(M.translate(this.m, tx, ty));
  translateX = (t: number): M => M.of(M.translateX(this.m, t));
  translateY = (t: number): M => M.of(M.translateY(this.m, t));

  scale = (sx: number, sy: number = sx): M => M.of(M.scale(this.m, sx, sy));
  scaleX = (s: number): M => M.of(M.scaleX(this.m, s));
  scaleY = (s: number): M => M.of(M.scaleY(this.m, s));

  rotate = (angle: number, angleType?: AngleType): M => M.of(M.rotate(this.m, angle, angleType));
  // rotateX   ! The resulting matrix for rotateX and rotateY !
  // rotateY   ! can only be described using matrix3d         !

  skew = (ax: number, ay: number = ax, angleType?: AngleType): M => M.of(M.skew(this.m, ax, ay, angleType));
  skewX = (angle: number, angleType?: AngleType): M => M.of(M.skewX(this.m, angle, angleType));
  skewY = (angle: number, angleType?: AngleType): M => M.of(M.skewY(this.m, angle, angleType));

//endregion

//region Data transformations

  apply = (point: IPoint): IPoint => M.apply(this.m, point);
  convert = (value: number): number => M.convert(this.m, value);

//endregion

  equal = ({m}: M): boolean => M.equal(this.m, m);
  toJSON = () => [...this.m];
  toString = () => this.m.join(', ');
  toStyleValue = () => `matrix(${this.toString()})`;


  /*
   * Identity matrix:
   *                    1 0 0
   * [1,0,0,1,0,0]  =>  0 1 0
   *                    0 0 1
   * https://en.wikipedia.org/wiki/Identity_matrix
   */
  static identity = (): IMatrix => [1, 0, 0, 1, 0, 0];

  /*
   * The Determinant of a matrix by the Laplace expansion:
   *       a c e
   *   det b d f = 0 + 0 + 1 * (a*d-b*c)
   *       0 0 1
   * https://en.wikipedia.org/wiki/Laplace_expansion
   */
  static determinant = (m: IMatrix): number => m[0] * m[3] - m[1] * m[2];

  /*
   * Inverse matrix: MT' * (1/det)
   *       a c e | where      A B G     1*(d*1-h*f)     (-1)*(c*1-h*e)  1*(c*f-d*e)        d   -c  c*f-d*e
   * MT' = b d f | g = 0  =>  C D H  =  (-1)*(b*1-g*f)  1*(a*1-g*e)     (-1)*(a*f-b*e)  =  -b  a   b*e-a*f
   *       g h 1 | h = 0      E F 1     (-1)*(b*h-g*d)  (-1)*(a*h-g*c)  1                  0   0   1
   * https://en.wikipedia.org/wiki/Invertible_matrix#Inversion_of_3_%C3%97_3_matrices
   */
  static invert = (m: IMatrix): IMatrix | null => {
    const det = M.determinant(m);
    return det === 0 ? null // matrix is not invertible
      : M.multiplyByScalar([
        m[3],
        -m[1],
        -m[2],
        m[0],
        m[2] * m[5] - m[3] * m[4],
        m[1] * m[4] - m[0] * m[5],
      ], 1 / det)
  }

  /*
   * Multiply two matrix:
   *   a1 c1 e1     a2 c2 e2     a1*a2+c1*b2  a1*c2+c1*d2  a1*e2+c1*f2+e1
   *   b1 d1 f1  *  b2 d2 f2  =  b1*a2+d1*b2  b1*c2+d1*d2  b1*e2+d1*f2+f1
   *   0  0  1      0  0  1      0            0            1
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#Transformation_functions
   * https://en.wikipedia.org/wiki/Matrix_multiplication
   */
  static multiply = (m1: IMatrix, m2: IMatrix): IMatrix => ([
    m1[0] * m2[0] + m1[2] * m2[1],         // a
    m1[1] * m2[0] + m1[3] * m2[1],         // b
    m1[0] * m2[2] + m1[2] * m2[3],         // c
    m1[1] * m2[2] + m1[3] * m2[3],         // d
    m1[0] * m2[4] + m1[2] * m2[5] + m1[4], // e
    m1[1] * m2[4] + m1[3] * m2[5] + m1[5]  // f
  ])

  static multiplyByScalar = (m: IMatrix, scalar: number): IMatrix => ([
    m[0] * scalar,
    m[1] * scalar,
    m[2] * scalar,
    m[3] * scalar,
    m[4] * scalar,
    m[5] * scalar,
  ])

  /*
   * Apply the matrix to the point:
   *   a c e     x     a*x+c*y+e
   *   b d f  *  y  =  b*x+d*y+f
   *   0 0 1     1     1
   */
  static apply = (m: IMatrix, p: IPoint): IPoint => ({
    x: m[0] * p.x + m[2] * p.y + m[4],
    y: m[1] * p.x + m[3] * p.y + m[5]
  });

  /*
   * Apply the matrix to the value.
   * For example, you only need to apply the matrix to one coordinate.
   */
  static convert = (m: IMatrix, x: number): number => M.apply(m, {x, y: 0}).x;

  /*
   * Translate is:
   *              1 0 tx
   *   Matrix  *  0 1 ty  =  Matrix'' includes Translate
   *              0 0 1
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateX
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateY
   */
  static translate = (m: IMatrix, tx: number, ty: number): IMatrix => M.multiply(m, [1, 0, 0, 1, tx, ty]);
  static translateX = (m: IMatrix, t: number): IMatrix => M.translate(m, t, 0);
  static translateY = (m: IMatrix, t: number): IMatrix => M.translate(m, 0, t);

  /*
   * Scale is:
   *              sx  0   0
   *   Matrix  *  0   sy  0  =  Matrix'' includes Scale
   *              0   0   1
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scaleX
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scaleY
   */
  static scale = (m: IMatrix, sx: number, sy: number): IMatrix => M.multiply(m, [sx, 0, 0, sy, 0, 0]);
  static scaleX = (m: IMatrix, s: number): IMatrix => M.scale(m, s, 1);
  static scaleY = (m: IMatrix, s: number): IMatrix => M.scale(m, 1, s);

  /*
   * Rotate is:
   *              cos  -sin  0
   *   Matrix  *  sin  cos   0  =  Matrix'' includes Rotate
   *              0    0     1
   * RotateX is:
   *              1  0    0
   *   Matrix  *  0  cos  -sin  =  Matrix'' includes RotateX. Result can only be described using matrix3d!
   *              0  sin  cos
   * RotateY is:
   *              cos   0  sin
   *   Matrix  *  0     1  0    =  Matrix'' includes RotateY. Result can only be described using matrix3d!
   *              -sin  0  cos
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateX
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateY
   */
  static rotate = (m: IMatrix, angle: number, angleType?: AngleType): IMatrix => {
    const radians = rad(angle, angleType)
    const cos = Math.cos(radians)
    const sin = Math.sin(radians)
    return M.multiply(m, [cos, sin, -sin, cos, 0, 0])
  }

  /*
   * Skew is:
   *              1        tan(ax)  0
   *   Matrix  *  tan(ay)  1        0  =  Matrix'' includes Skew
   *              0        0        1
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skewX
   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skewY
   */
  static skew = (m: IMatrix, ax: number, ay: number, angleType?: AngleType): IMatrix =>
    M.multiply(m, [1, Math.tan(rad(ay, angleType)), Math.tan(rad(ax, angleType)), 1, 0, 0])
  ;
  static skewX = (m: IMatrix, angle: number, angleType?: AngleType): IMatrix => M.skew(m, angle, 0, angleType);
  static skewY = (m: IMatrix, angle: number, angleType?: AngleType): IMatrix => M.skew(m, 0, angle, angleType);


  static equal = (m1: IMatrix, m2: IMatrix): boolean =>
    Math.abs(m1[0] - m2[0]) < ACCURACY &&
    Math.abs(m1[1] - m2[1]) < ACCURACY &&
    Math.abs(m1[2] - m2[2]) < ACCURACY &&
    Math.abs(m1[3] - m2[3]) < ACCURACY &&
    Math.abs(m1[4] - m2[4]) < ACCURACY &&
    Math.abs(m1[5] - m2[5]) < ACCURACY
  ;
}

const ACCURACY = 0.0001;


export {
  M as WebMatrix,
  IMatrix as WebMatrixDataType,
}
