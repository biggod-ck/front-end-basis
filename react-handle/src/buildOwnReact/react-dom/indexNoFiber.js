
/**
 * render的渲染是一个递归的过程 如果元素的节点过多的话 就会消耗很多的时间，并且没办法阻止
 * 所以我们需要把渲染逻辑分为很多个小的单元
 */
function render(element, container) {
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode("")
      : document.createElement(element.type);
  // 过滤敏感的key值
  const isProperty = key => key !== "children"
  Object.keys(element.props).filter(isProperty).forEach(name=>{
    dom[name] = element.props[name]
  })
  // dom里面也会包含自己的子节点
  element.props.children.forEach(child => render(child, dom));
  container.appendChild(dom);
}

let nextUnitOfWork = null; // 下一个单元任务
function workLoop(deadLine){
  let shouldYield = false; // 是否需要让步
  while(nextUnitOfWork && !shouldYield){
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadLine.timeRemaining() < 1
  }
  requestIdleCallback(workLoop) // 浏览器空闲的时候又会去执行 workLoop
}

requestIdleCallback(workLoop) // workLoop 将在主线程空闲的时候进行回调。

function performUnitOfWork(nextUnitOfWork) {
  // TODO 执行工作，并且返回下一个单元
}

/**
 *在渲染中，我们将创建根fiber并将其设置为nextUnitOfWork。剩下的工作将在performUnitOfWork函数上进行，我们将为每fiber做三件事
 *1.将元素添加到DOM 2.为元素的子代创建fiber 3.选择下一个工作单元
 */


export default {
  render,
};
