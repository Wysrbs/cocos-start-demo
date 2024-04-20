import { _decorator, Component, Node, Sprite, SpriteFrame, UITransform } from 'cc'
import { TILE_HEIGHT, TILE_WIDTH } from 'db://assets/scripts/Tile/TileMapManage'
const { ccclass, property } = _decorator

@ccclass('TileManage')
export class TileManage extends Component {
  init(spriteFrame: SpriteFrame, i: number, j: number) {
    const sprite = this.node.addComponent(Sprite)
    sprite.spriteFrame = spriteFrame
    const transform = this.node.addComponent(UITransform)
    transform.setContentSize(TILE_WIDTH, TILE_HEIGHT)
    this.node.setPosition(i * TILE_WIDTH, -j * TILE_HEIGHT)
  }
}
