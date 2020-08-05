export function addEvent(dom, eventType, listener) {
  eventType = eventType.slice(2).toLowerCase(); // 处理事件名称
  let eventStore = dom.eventStore || (dom.eventStore = {});
  eventStore[eventType] = listener; // 给对应的DOM上绑定方法，等到条件触发的时候执行对应的方法
  document.addEventListener(eventType, dispatchEvent, false);
}
let syntheticEvent; // 这个就是一个合成事件对象
function dispatchEvent(event) {
  let { type, target } = event;
  syntheticEvent = getSyntheticEvent(event);
  // todo 这里就模仿了事件冒泡的机制
  while (target) {
    let { eventStore } = target;
    let listener = eventStore && eventStore[type];
    if (listener) {
      listener.call(target, syntheticEvent);
    }
    target = target.parentNode;
  }
}

function persist() {
  syntheticEvent = {}; // persist 直接更改syntheticEvent的指向。原来传递进去的就可以继续访问了。如果不这样操作，后续的事件会更改当前的值
  Object.setPrototypeOf(syntheticEvent, {
    persist,
  });
}
// 生成合成事件
function getSyntheticEvent(event) {
  if (!syntheticEvent) {
    persist();
  }
  syntheticEvent.nativeEvent = event;
  syntheticEvent.currentTarget = event.target;
  for (const key in event) {
    if(typeof event[key] === 'function'){
      syntheticEvent[key] = event[key].bind(event)
    }else{
      syntheticEvent[key] = event[key]
    }
  }
  return syntheticEvent
}
