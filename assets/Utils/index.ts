import { UITransform, Node, Layers } from 'cc'

export const createUiNode = (): Node => {
  const node = new Node()
  node.addComponent(UITransform)
  node.layer = Layers.Enum['UI_2D']
  return node
}
