import { _decorator, Component, Node } from 'cc'
import { TILE_HEIGHT, TILE_WIDTH, TileMapManage } from 'db://assets/scripts/Tile/TileMapManage'
import levels from 'db://assets/Levels'
import level1 from 'db://assets/Levels/level1'
import { PlayerManage } from 'db://assets/scripts/Player/PlayerManage'
import { createUiNode } from 'db://assets/Utils'
const { ccclass, property } = _decorator

// 战斗管理
@ccclass('BattleManage')
export class BattleManage extends Component {
  start() {
    this.generateTileMap()
  }

  generateTileMap() {
    const { mapInfo } = levels[`level${1}`]
    const stage = new Node()
    stage.setParent(this.node)

    const tileMap = new Node()
    tileMap.setParent(stage)
    const tileMapManage = tileMap.addComponent(TileMapManage)
    tileMapManage.init()

    const playNode = createUiNode()
    playNode.setParent(stage)
    const playerManage = playNode.addComponent(PlayerManage)
    playerManage.init()

    const totalY = (mapInfo[0].length * TILE_HEIGHT) / 2
    const totalX = (mapInfo.length * TILE_WIDTH) / 2 - 20
    stage.setPosition(-totalX, totalY)
  }
}

/**
 * 地图居中
 * 按键事件绑定
 * 人物动画
 * 人物移动
 * */
