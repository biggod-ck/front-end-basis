/**
 * render的渲染是一个递归的过程 如果元素的节点过多的话 就会消耗很多的时间，并且没办法阻止
 * 所以我们需要把渲染逻辑分为很多个小的单元
 */

function createDom(fiber) {
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);
  const isProperty = key => key !== 'children';
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name];
    });
  return dom;
}

// render 方法里面我们设置了 nextUnitOfWork
// 然后，当浏览器准备就绪时，它将调用我们的workLoop，我们将开始在根目录上工作。
function render(element, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

let nextUnitOfWork = null; // 下一个单元任务
function workLoop(deadLine) {
  let shouldYield = false; // 是否需要让步
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // 内部会处理逻辑并且返回下一个fiber节点
    shouldYield = deadLine.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop); // 浏览器空闲的时候又会去执行 workLoop
}

requestIdleCallback(workLoop); // workLoop 将在主线程空闲的时候进行回调。

/**
 *在渲染中，我们将创建根fiber并将其设置为nextUnitOfWork。剩下的工作将在performUnitOfWork函数上进行，我们将为每fiber做三件事
 *1.将元素添加到DOM 2.为元素的子代创建fiber 3.选择下一个工作单元
 */
function performUnitOfWork(fiber) {
  // TODO add dom node
  if (!fiber.dom) {
    fiber.dom = createDom(fiber); // fiber.dom 就是当前虚拟DOM生成的原生节点
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom); // 将当前节点push进入父级里面
  }

  // TODO create new fiber 将所有的孩子都变为一个fiber
  const elements = fiber.props.children; // 取到所有的孩子
  let index = 0;
  let prevSibling = null;
  while (index < elements.length) {
    const element = elements[index];
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber, // 当前的fiber都指向父亲fiber
      dom: null,
    };
    if (index === 0) {
      fiber.child = newFiber; // 父fiber指向第一个child
    } else {
      prevSibling.sibling = newFiber; //index不为0 链接了所有的兄弟fiber
    }
    prevSibling = newFiber; // 第一个孩子
    index++;
  }

  // TODO return next unit of work 首先孩子 其次兄弟 最后叔叔节点
  if(fiber.child){
      return fiber.child
  }
  //! 这点代码有点意思 细品。当兄弟fiber遍历完成过后。
  let nextFiber = fiber
  while(nextFiber){
    if(nextFiber.sibling){
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent // 走到这里 说明兄弟节点已经
  }

}



export default {
  render,
};
