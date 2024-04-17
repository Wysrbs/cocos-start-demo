import { _decorator, Component, Node } from 'cc'
import { TileMapManage } from 'db://assets/Scripts/Tile/TileMapManage'
const { ccclass, property } = _decorator

@ccclass('BattleManage')
export class BattleManage extends Component {
  start() {
    this.generateTileMap()
  }

  update(deltaTime: number) {}

  generateTileMap() {
    const stage = new Node()
    stage.setParent(this.node)
    const tileMap = new Node()
    tileMap.setParent(stage)
    const tileMapManage = tileMap.addComponent(TileMapManage)
    tileMapManage.init()
  }
}
