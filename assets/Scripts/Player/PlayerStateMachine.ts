import { _decorator, Animation, Component, Sprite, UITransform, AnimationClip } from 'cc'
import { FSM_PARAMS_TYPE_ENUM, PARAMS_NAME_ENUM } from 'db://assets/Enum'
import { State } from 'db://assets/base/State'
import { TILE_HEIGHT, TILE_WIDTH } from 'db://assets/Scripts/Tile/TileMapManage'

const { ccclass, property } = _decorator

type paramsValueType = boolean | number
interface IParamsValue {
  type: FSM_PARAMS_TYPE_ENUM
  value: paramsValueType
}

@ccclass('PlayerStateMachine')
export class PlayerStateMachine extends Component {
  private _currentState: State
  params: Map<string, IParamsValue> = new Map()
  stateMachines: Map<string, State> = new Map()
  animation: Animation = null

  get currentState(): State {
    return this._currentState
  }

  set currentState(value: State) {
    this._currentState = value
    this.currentState.run()
  }

  init() {
    const sprite = this.addComponent(Sprite)
    sprite.sizeMode = Sprite.SizeMode.CUSTOM

    const transform = sprite.addComponent(UITransform)
    transform.setContentSize(TILE_WIDTH * 4, TILE_HEIGHT * 4)
    this.animation = this.addComponent(Animation)

    this.initPrams()
    this.initStateMachines()
  }
  private initPrams() {
    this.params.set(PARAMS_NAME_ENUM.IDLE, { type: FSM_PARAMS_TYPE_ENUM.TRIGGER, value: false })
    this.params.set(PARAMS_NAME_ENUM.TURNLEFT, { type: FSM_PARAMS_TYPE_ENUM.TRIGGER, value: false })
  }
  private initStateMachines() {
    this.stateMachines.set(
      PARAMS_NAME_ENUM.IDLE,
      new State(this, 'texture/player/idle/top', AnimationClip.WrapMode.Loop),
    )
    this.stateMachines.set(PARAMS_NAME_ENUM.TURNLEFT, new State(this, 'texture/player/turnleft/top'))
  }

  setParams(name: PARAMS_NAME_ENUM, value: paramsValueType) {
    this.params.get(name).value = value
    this.run()
  }

  getParams(name: PARAMS_NAME_ENUM) {
    return this.params.get(name).value
  }

  run() {
    if (this.getParams(PARAMS_NAME_ENUM.TURNLEFT)) {
      this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.TURNLEFT)
      return
    }
    this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE)
  }
}
