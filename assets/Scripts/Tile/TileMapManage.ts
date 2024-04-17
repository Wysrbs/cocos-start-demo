import { _decorator, Component, Node, resources, SpriteFrame, Sprite, UITransform, Layers } from 'cc'
const { ccclass, property } = _decorator
import levels from 'db://assets/Levels'

const TILE_HEIGHT = 50
const TILE_WIDTH = 50
@ccclass('TileMapManage')
export class TileMapManage extends Component {
  async init() {
    const { mapInfo } = levels[`level${1}`]
    const spriteFrames = await this.loadDir()
    for (let i = 0; i < mapInfo.length; i++) {
      const columns = mapInfo[i] || []
      for (let j = 0; j < columns.length; j++) {
        const node = new Node()
        const sprite = node.addComponent(Sprite)
        const src = `tile (${columns[j]?.src})`
        sprite.spriteFrame = spriteFrames.find(item => item.name == src) || null
        const transform = node.addComponent(UITransform)
        transform.setContentSize(TILE_WIDTH, TILE_HEIGHT)
        node.layer = Layers.Enum['UI_2D']
        node.setPosition(i * TILE_WIDTH, -j * TILE_HEIGHT)
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
