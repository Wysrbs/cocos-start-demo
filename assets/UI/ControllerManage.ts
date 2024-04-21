import { _decorator, Component, Node, Sprite, SpriteFrame, UITransform } from 'cc'
import {CONTROL_ENUM} from '../Enum';
import {emit} from '../Runtime/EventManager';
const { ccclass, property } = _decorator

@ccclass('ControllerManage')
export class ControllerManage extends Component {
  handleCtrl(evt:Event, type: string) {
    emit('inputDirection', type)
  }
}
