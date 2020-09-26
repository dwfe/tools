import {describe, expect} from '@jest/globals'
import {WebMatrix} from '../web-transform';
import {Point} from '../geometry';

describe(`matrix-2d`, () => {

  test(`1*2 !== 2*1`, () => {
    const m1 = WebMatrix.of([1, 2, 3, 4, 5, 6])
    const m2 = WebMatrix.of([6, 5, 4, 3, 2, 1])
    const multiply1 = m1.multiply(m2)
    const multiply2 = m2.multiply(m1)
    expect(multiply1.equal(multiply2)).toBeFalsy()
  })

  test(`inversion`, () => {
    const m = WebMatrix.of([-1.04368, -0.200666, -0.180935, 1.6125, -9, 5]);
    const invM = m.invert();
    const multiply1 = invM?.multiply(m) as WebMatrix
    const multiply2 = m.multiply(invM as WebMatrix)
    expect(multiply1.equal(multiply2)).toBeTruthy();
    expect(multiply1.equal(m.multiply(WebMatrix.of()))).toBeFalsy();
  })

  test(`translate`, () => {
    const m = WebMatrix.of().translate(1, 10).translateX(-10).translateY(-5)
    expect(m.equal(WebMatrix.of([1, 0, 0, 1, -9, 5]))).toBeTruthy()
    expect(m.equal(WebMatrix.of())).toBeFalsy()
  })

  test(`scale`, () => {
    const m = WebMatrix.of().scale(1.5).scaleX(-0.7).scaleY(1.1)
    expect(m.equal(WebMatrix.of([-1.05, 0, 0, 1.65, 0, 0]))).toBeTruthy()
    expect(m.equal(WebMatrix.of())).toBeFalsy()
  })

  test(`rotate`, () => {
    const m = WebMatrix.of().rotate(-10)
    expect(m.equal(WebMatrix.of([0.984808, -0.173648, 0.173648, 0.984808, 0, 0]))).toBeTruthy()
    expect(m.equal(WebMatrix.of())).toBeFalsy()
  })

  test(`skew`, () => {
    const m = WebMatrix.of().skew(5, 5).skewX(-5).skewY(-2)
    expect(m.equal(WebMatrix.of([1, 0.0528352, 0, 0.992346, 0, 0]))).toBeTruthy()
    expect(m.equal(WebMatrix.of())).toBeFalsy()
  })

  test(`full matrix-2d`, () => {
    // translate(1px, 10px) translateX(-10px) translateY(-5px) scale(1.5) scaleX(-0.7) scaleY(1.1) rotate(-10deg) skew(5deg, 5deg) skewX(-5deg) skewY(-2deg)
    const m = WebMatrix.of()
      .translate(1, 10).translateX(-10).translateY(-5)
      .scale(1.5).scaleX(-0.7).scaleY(1.1)
      .rotate(-10)
      .skew(5, 5).skewX(-5).skewY(-2)
    expect(m.equal(WebMatrix.of([-1.04368, -0.200666, -0.180935, 1.6125, -9, 5]))).toBeTruthy()
    expect(m.equal(WebMatrix.of())).toBeFalsy()
  })

  test(`apply to point #1`, () => {
    const p = WebMatrix.of([1, 2, 3, 4, 4, 5]).apply({x: 20, y: 30})
    expect(Point.equal(p, {x: 114, y: 165})).toBeTruthy()
    expect(Point.equal(p, {x: 0, y: 0})).toBeFalsy()
  })

  test(`apply to point #2`, () => {
    const p = WebMatrix.of([0.9, -0.05, -0.375, 1.375, 220, 20]).apply({x: 200, y: 80})
    expect(Point.equal(p, {x: 370, y: 120})).toBeTruthy()
    expect(Point.equal(p, {x: 0, y: 0})).toBeFalsy()
  })
})
