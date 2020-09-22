import {Point, WebMatrix} from '..';

const m = WebMatrix.of([-1.04368, -0.200666, -0.180935, 1.6125, -9, 5]);
const invM = m.invert();
console.assert(invM?.multiply(m)
    .equal(m.multiply(invM as WebMatrix)),
  'inversion'
)

console.assert(WebMatrix.of()
    .translate(1, 10).translateX(-10).translateY(-5)
    .equal(WebMatrix.of([1, 0, 0, 1, -9, 5])),
  'translate'
)
console.assert(WebMatrix.of()
    .scale(1.5).scaleX(-0.7).scaleY(1.1)
    .equal(WebMatrix.of([-1.05, 0, 0, 1.65, 0, 0])),
  'scale'
)
console.assert(WebMatrix.of()
    .rotate(-10)
    .equal(WebMatrix.of([0.984808, -0.173648, 0.173648, 0.984808, 0, 0])),
  'rotate'
)
console.assert(WebMatrix.of()
    .skew(5, 5).skewX(-5).skewY(-2)
    .equal(WebMatrix.of([1, 0.0528352, 0, 0.992346, 0, 0])),
  'skew'
)
// translate(1px, 10px) translateX(-10px) translateY(-5px) scale(1.5) scaleX(-0.7) scaleY(1.1) rotate(-10deg) skew(5deg, 5deg) skewX(-5deg) skewY(-2deg)
console.assert(WebMatrix.of()
    .translate(1, 10).translateX(-10).translateY(-5)
    .scale(1.5).scaleX(-0.7).scaleY(1.1)
    .rotate(-10)
    .skew(5, 5).skewX(-5).skewY(-2)
    .equal(WebMatrix.of([-1.04368, -0.200666, -0.180935, 1.6125, -9, 5])),
  'full 2d'
)


console.assert(Point.equal(WebMatrix.of([1, 2, 3, 4, 4, 5])
    .apply({x: 20, y: 30}),
  {x: 114, y: 165}),
  'apply to point #1'
)
console.assert(Point.equal(WebMatrix.of([0.9, -0.05, -0.375, 1.375, 220, 20])
    .apply({x: 200, y: 80}),
  {x: 370, y: 120}),
  'apply to point #2'
)
