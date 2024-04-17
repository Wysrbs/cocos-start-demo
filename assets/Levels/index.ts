import level1 from 'db://assets/Levels/level1'
import { TILE_TYPE_ENUM } from 'db://assets/Enum'

export interface ITile {
  src: number | null
  type: TILE_TYPE_ENUM | null
}

export interface ILevel {
  mapInfo: ITile[][]
}

const levels: Record<string, ILevel> = {
  level1,
}

export default levels
