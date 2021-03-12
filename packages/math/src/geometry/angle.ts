import {AngleType} from './contracts'

export const rad = (value: number, angleType: AngleType = AngleType.DEGREES): number => {
  switch (angleType) {
    case AngleType.RADIANS:
      return value
    case AngleType.DEGREES:
      return value * Math.PI / 180
    case AngleType.GRADIANS:
      return value * Math.PI / 200
    case AngleType.TURNS:
      return value * 2 * Math.PI
    default:
      throw new Error(`can't get radians for angle data type '${angleType}'`)
  }
}

export const deg = (value: number, angleType: AngleType = AngleType.DEGREES): number => {
  switch (angleType) {
    case AngleType.DEGREES:
      return value
    case AngleType.RADIANS:
      return value * 180 / Math.PI
    case AngleType.GRADIANS:
      return value * 9 / 10
    case AngleType.TURNS:
      return value * 360
    default:
      throw new Error(`can't get degrees for angle data type '${angleType}'`)
  }
}
