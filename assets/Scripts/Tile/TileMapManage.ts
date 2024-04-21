import { _decorator, Component, Node, resources, SpriteFrame, Sprite, UITransform, Layers } from 'cc'
const { ccclass, property } = _decorator
import levels from 'db://assets/Levels'
import { createUiNode } from 'db://assets/Utils'
import { TileManage } from 'db://assets/Scripts/Tile/TileManage'

export const TILE_HEIGHT = 50
export const TILE_WIDTH = 50
// 地图管理
@ccclass('TileMapManage')
export class TileMapManage extends Component {
  async init() {
    const { mapInfo } = levels[`level${1}`]
    for (let i = 0; i < mapInfo.length; i++) {
    const spriteFrames = await this.loadDir()
      const columns = mapInfo[i] || []
      for (let j = 0; j < columns.length; j++) {
        const node = createUiNode()
        const src = `tile (${columns[j]?.src})`
        const spriteFrame = spriteFrames.find(item => item.name == src) || null
        const tileManage = node.addComponent(TileManage)
        tileManage.init(spriteFrame, i, j)
        node.setParent(this.node)
      }
    }
  }

  loadDir(): Promise<SpriteFrame[]> {
    return new Promise((resolve, reject) => {
      resources.loadDir('texture/tile/tile', SpriteFrame, function (err, assets) {
        if (err) {
          reject(err)
        }
        resolve(assets)
      })
    })
  }
}
