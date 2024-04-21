const eventMap:Map<string,IItem[]> = new Map()

interface IItem  {
  func:Function
  ctx:unknown
}

function on(name:string,func:Function,ctx?:unknown) {
  const arr = eventMap.get(name) || []
  arr.push({func,ctx})
  eventMap.set(name, arr)
}

function off(name) {
  eventMap.delete(name)
}

function emit(name,...param) {
  const arr = eventMap.get(name) || []
  for(const item of arr) {
    item.ctx ? item.func.apply(item.ctx,param) : item.func(param)
  }
}

export {
  on,
  off,
  emit
}