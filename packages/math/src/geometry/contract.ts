export interface IPoint {
  x: number;
  y: number;
}

export type IVector = [IPoint, IPoint] // 2D vector: [startPoint, endPoint]

// https://developer.mozilla.org/en-US/docs/Web/CSS/angle
export enum AngleType {
  DEGREES = 'deg',
  RADIANS = 'rad',
  GRADIANS = 'grad',
  TURNS = 'turn',
}
