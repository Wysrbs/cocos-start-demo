import { _decorator, Component, resources, SpriteFrame } from 'cc'
import { TILE_HEIGHT, TILE_WIDTH } from 'db://assets/Scripts/Tile/TileMapManage'
import { CONTROL_ENUM, PARAMS_NAME_ENUM } from 'db://assets/Enum'
import { on } from '../../Runtime/EventManager'
import { PlayerStateMachine } from 'db://assets/Scripts/Player/PlayerStateMachine'

const { ccclass, property } = _decorator

const TIME = 1 / 8
@ccclass('PlayerManage')
export class PlayerManage extends Component {
  x = 0
  y = 0
  targetX = 0
  targetY = 0
  private readonly sleep = 0.1
  fsm: PlayerStateMachine = null
  updateXy() {
    if (this.targetX != this.x) {
      this.x = this.x + this.sleep
    }
    if (this.targetY != this.y) {
      this.y = this.y + this.sleep
    }
    if (this.x > this.targetX) {
      this.x = this.targetX
    }
    if (this.y > this.targetY) {
      this.y = this.targetY
    }
    this.node.setPosition(this.x * TILE_WIDTH + TILE_WIDTH * 2, this.y * TILE_HEIGHT - TILE_HEIGHT * 2)
  }
  update() {
    this.updateXy()
  }

  start() {
    on('inputDirection', this.move, this)
  }

  move(inputDirection: CONTROL_ENUM) {
    if (inputDirection == CONTROL_ENUM.TOP) {
      this.targetY = this.y + 1
      return
    }
    if (inputDirection == CONTROL_ENUM.DOWN) {
      this.targetY = this.y - 1
      return
    }
    if (inputDirection == CONTROL_ENUM.RIGHT) {
      this.targetX = this.x + 1
      return
    }
    if (inputDirection == CONTROL_ENUM.LEFT) {
      this.targetX = this.x - 1
      return
    }

    if (inputDirection == CONTROL_ENUM.TURNLEFT) {
      this.fsm.setParams(PARAMS_NAME_ENUM.TURNLEFT, true)
    }
  }

  async init() {
    this.fsm = this.addComponent(PlayerStateMachine)
    this.fsm.init()
    setTimeout(() => {
      this.fsm.setParams(PARAMS_NAME_ENUM.IDLE, true)
    }, 1000)
  }

  loadDir(): Promise<SpriteFrame[]> {
    return new Promise((resolve, reject) => {
      resources.loadDir('texture/player/idle/top', SpriteFrame, function (err, assets) {
        if (err) {
          reject(err)
        }
        resolve(assets)
      })
    })
  }
}
