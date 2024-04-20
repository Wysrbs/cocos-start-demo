import {
  _decorator,
  animation,
  Animation,
  AnimationClip,
  Component,
  resources,
  Sprite,
  SpriteFrame,
  UITransform,
} from 'cc'
import { TILE_HEIGHT, TILE_WIDTH } from 'db://assets/scripts/Tile/TileMapManage'
import { CONTROL_ENUM } from 'db://assets/Enum'

const { ccclass, property } = _decorator

const TIME = 1 / 8
@ccclass('PlayerManage')
export class PlayerManage extends Component {
  x = 0
  y = 0
  targetX = 0
  targetY = 0

  updateXy() {
    // if (this.targetX != this.x) {
    //   this.x = this.targetX
    // }
    // if (this.targetY != this.y) {
    //   this.y = this.targetY
    // }
    this.node.setPosition(this.x * TILE_WIDTH, this.y * TILE_HEIGHT)
  }
  update() {
    this.move(CONTROL_ENUM.TOP)
    this.updateXy()
  }

  move(inputDirection: CONTROL_ENUM) {
    if (inputDirection == CONTROL_ENUM.TOP) {
      // this.targetY = this.x + 1
      this.x = this.x + 0.01
      return
    }
    if (inputDirection == CONTROL_ENUM.DOWN) {
      this.targetY = this.x - 1
      return
    }
    if (inputDirection == CONTROL_ENUM.RIGHT) {
      this.targetY = this.y + 1
      return
    }
    if (inputDirection == CONTROL_ENUM.LEFT) {
      this.targetY = this.y - 1
      return
    }
  }

  async init() {
    const sprite = this.addComponent(Sprite)
    sprite.sizeMode = Sprite.SizeMode.CUSTOM

    const transform = sprite.addComponent(UITransform)
    transform.setContentSize(TILE_WIDTH * 4, TILE_HEIGHT * 4)

    const spriteFrames = await this.loadDir()
    const animationComponent = this.addComponent(Animation)

    const animationClip = new AnimationClip()
    const track = new animation.ObjectTrack()
    track.path = new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame') // 指定轨道路径，即指定目标对象为 "Foo" 子节点的 "position" 属性
    const frames: Array<[number, SpriteFrame]> = spriteFrames.map((item, index) => [TIME * index, item])
    track.channel.curve.assignSorted(frames) // x, y, z 是前三条通道
    // 最后将轨道添加到动画剪辑以应用
    animationClip.addTrack(track)

    animationClip.wrapMode = AnimationClip.WrapMode.Loop
    animationClip.duration = frames.length * TIME
    animationComponent.defaultClip = animationClip
    animationComponent.play()
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
