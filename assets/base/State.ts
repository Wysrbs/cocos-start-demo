import { animation, Animation, AnimationClip, resources, Sprite, SpriteFrame } from 'cc'
import { PlayerStateMachine } from 'db://assets/Scripts/Player/PlayerStateMachine'
const TIME = 1 / 8
export class State {
  animationClip: AnimationClip
  constructor(
    private fsm: PlayerStateMachine,
    private path: string,
    private wrapMode: AnimationClip.WrapMode = AnimationClip.WrapMode.Normal,
  ) {
    this.init()
  }

  async init() {
    const spriteFrames = await this.loadDir()
    this.animationClip = new AnimationClip()
    const track = new animation.ObjectTrack()
    track.path = new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame') // 指定轨道路径，即指定目标对象为 "Foo" 子节点的 "position" 属性
    const frames: Array<[number, SpriteFrame]> = spriteFrames.map((item, index) => [TIME * index, item])
    track.channel.curve.assignSorted(frames) // x, y, z 是前三条通道
    // 最后将轨道添加到动画剪辑以应用
    this.animationClip.addTrack(track)

    this.animationClip.wrapMode = this.wrapMode
    this.animationClip.duration = frames.length * TIME
  }

  run() {
    this.fsm.animation.defaultClip = this.animationClip
    this.fsm.animation.play()
  }

  loadDir(): Promise<SpriteFrame[]> {
    return new Promise((resolve, reject) => {
      resources.loadDir(this.path, SpriteFrame, function (err, assets) {
        if (err) {
          reject(err)
        }
        resolve(assets)
      })
    })
  }
}
