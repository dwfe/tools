import {describe, expect} from '@jest/globals'
import {TWebMatrix, WebMatrix} from '../web-transform'
import {AngleType, Point} from '../geometry'

describe(`matrix-2d`, () => {

  test(`1*2 !== 2*1`, () => { // matrix multiplication is not commutative
    const m1 = WebMatrix.of([1, 2, 3, 4, 5, 6])
    const m2 = WebMatrix.of([6, 5, 4, 3, 2, 1])
    const multiply1 = m1.multiply(m2)
    const multiply2 = m2.multiply(m1)
    expect(multiply1.isEqual(multiply2)).toBeFalsy()
  })

  test(`inversion #1`, () => {
    const m = WebMatrix.of([-1.04368, -0.200666, -0.180935, 1.6125, -9, 5]);
    const invM = m.invert();
    const multiply1 = invM?.multiply(m) as WebMatrix
    const multiply2 = m.multiply(invM as WebMatrix)
    expect(multiply1.isEqual(multiply2)).toBeTruthy();
    expect(multiply1.isEqual(m.multiply(WebMatrix.of()))).toBeFalsy();
  })

  test(`inversion #2`, () => {
    expect(WebMatrix.isEqual(
      WebMatrix.invert([2, 2, -1, 2, 0, 0]),
      [1 / 3, -(1 / 3), 1 / 6, 1 / 3, 0, 0]
    )).toBeTruthy();
  })

  test(`translate`, () => {
    const m = WebMatrix.of().translate(1, 10).translateX(-10).translateY(-5)
    expect(m.isEqual(WebMatrix.of([1, 0, 0, 1, -9, 5]))).toBeTruthy()
    expect(m.isEqual(WebMatrix.of())).toBeFalsy()
  })

  test(`scale`, () => {
    const m = WebMatrix.of().scale(1.5).scaleX(-0.7).scaleY(1.1)
    expect(m.isEqual(WebMatrix.of([-1.05, 0, 0, 1.65, 0, 0]))).toBeTruthy()
    expect(m.isEqual(WebMatrix.of())).toBeFalsy()
  })

  test(`rotate`, () => {
    const m = WebMatrix.of().rotate(-10)
    expect(m.isEqual(WebMatrix.of([0.984808, -0.173648, 0.173648, 0.984808, 0, 0]))).toBeTruthy()
    expect(m.isEqual(WebMatrix.of())).toBeFalsy()
  })

  test(`skew`, () => {
    const m = WebMatrix.of().skew(5, 5).skewX(-5).skewY(-2)
    expect(m.isEqual(WebMatrix.of([1, 0.0528352, 0, 0.992346, 0, 0]))).toBeTruthy()
    expect(m.isEqual(WebMatrix.of())).toBeFalsy()
  })

  test(`full matrix-2d`, () => {
    // translate(1px, 10px) translateX(-10px) translateY(-5px) scale(1.5) scaleX(-0.7) scaleY(1.1) rotate(-10deg) skew(5deg, 5deg) skewX(-5deg) skewY(-2deg)
    const m = WebMatrix.of()
      .translate(1, 10).translateX(-10).translateY(-5)
      .scale(1.5).scaleX(-0.7).scaleY(1.1)
      .rotate(-10)
      .skew(5, 5).skewX(-5).skewY(-2)
    expect(m.isEqual(WebMatrix.of([-1.04368, -0.200666, -0.180935, 1.6125, -9, 5]))).toBeTruthy()
    expect(m.isEqual(WebMatrix.of())).toBeFalsy()
  })

  test(`apply to point #1`, () => {
    const p = Point.of(WebMatrix.of([1, 2, 3, 4, 4, 5]).apply([20, 30]))
    expect(p.isEqual([114, 165])).toBeTruthy()
    expect(p.isEqual([0, 0])).toBeFalsy()
  })

  test(`apply to point #2`, () => {
    const p = Point.of(WebMatrix.of([0.9, -0.05, -0.375, 1.375, 220, 20]).apply([200, 80]))
    expect(p.isEqual([370, 120])).toBeTruthy()
    expect(p.isEqual([0, 0])).toBeFalsy()
  })

  test(`scaleAtPoint`, () => {
    const scaledAtPoint = WebMatrix.scaleAtPoint([40, 40], 1.25)
    const correctResult: TWebMatrix = [1.25, 0, 0, 1.25, -10, -10];
    expect(WebMatrix.isEqual(scaledAtPoint, correctResult)).toBeTruthy()
    expect(WebMatrix.isEqual(scaledAtPoint, [1.25, 0, 0, 1.25, -10, 0])).toBeFalsy()
    expect(WebMatrix.isEqual(
      WebMatrix.multiplySequence([
        [1, 0, 0, 1, 40, 40],
        WebMatrix.scaleIdentity(1.25, 1.25),
        [1, 0, 0, 1, -40, -40],
      ]),
      correctResult
    )).toBeTruthy()
    expect(WebMatrix.isEqual(
      WebMatrix.of().translate(40).scale(1.25).translate(-40).m,
      correctResult
    )).toBeTruthy()
  })

  test(`rotateAtPoint`, () => {
    const rotateAtPoint = WebMatrix.rotateAtPoint([50, 45], 45, AngleType.DEGREES)
    const correctResult: TWebMatrix = [0.707107, 0.707107, -0.707107, 0.707107, 46.4645, -22.1751];
    expect(WebMatrix.isEqual(rotateAtPoint, correctResult)).toBeTruthy()
    expect(WebMatrix.isEqual(rotateAtPoint, [0.717107, 0.707107, -0.707107, 0.707107, 46.4645, -22.1751])).toBeFalsy()
    expect(WebMatrix.isEqual(
      WebMatrix.multiplySequence([
        [1, 0, 0, 1, 50, 45],
        WebMatrix.rotateIdentity(45, AngleType.DEGREES),
        [1, 0, 0, 1, -50, -45],
      ]),
      correctResult
    )).toBeTruthy()
    expect(WebMatrix.isEqual(
      WebMatrix.of().translate(50, 45).rotate(45, AngleType.DEGREES).translate(-50, -45).m,
      correctResult
    )).toBeTruthy()
  })

})
