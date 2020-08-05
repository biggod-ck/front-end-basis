import { TEXT, ELEMENT, FUNCTION_COMPONENT, CLASS_COMPONENT } from './constants';
import { onlyOne, setProps, patchProps } from '../react/utils';

export function createDOM(element) {
  element = onlyOne(element);
  let { $$typeof } = element;
  let dom = null;
  if ($$typeof === TEXT) {
    dom = document.createTextNode(element.content);
  } else if ($$typeof === ELEMENT) {
    dom = createNativeDOM(element);
  } else if ($$typeof === FUNCTION_COMPONENT) {
    dom = createFunctionComponent(element);
  } else if ($$typeof === CLASS_COMPONENT) {
    dom = createClassComponent(element);
  }
  element.dom = dom; // 给对应的虚拟DOM上绑定特定的元素结点
  return dom;
}

function createNativeDOM(element) {
  let { type, props } = element;
  let dom = document.createElement(type);
  createChild(element, dom);
  setProps(dom, props);
  if (props.ref) {
    props.ref = dom;
  }
  return dom;
}

function createFunctionComponent(element) {
  const { type, props } = element;
  let renderElement = type(props); // 函数组件的返回值
  element.renderElement = renderElement; // 在这个函数式组件element上挂载自己执行的返回值
  let newDom = createDOM(renderElement); // 将当前的虚拟结点渲染为真实结点
  renderElement.dom = newDom; // 在当前的虚拟结点上映射当前的真实结点。上面的也有这个操作
  return newDom;
}
function createClassComponent(element) {
  const { type, props } = element;
  let componentInstance = new type(props); // 实例化类组件
  element.componentInstance = componentInstance; // 虚拟DOM上绑定类组件的实例
  let renderElement = componentInstance.render(); // 调用render。接受虚拟DOM
  componentInstance.renderElement = renderElement; // 保存当前的渲染的虚拟结点
  let newDom = createDOM(renderElement); // 将当前的虚拟结点渲染为真实结点
  renderElement.dom = newDom; // 在当前的虚拟结点上映射当前的真实结点。上面的也有这个操作
  return newDom;
}

function createChild(element, parentNode) {
  element.props.children &&
    element.props.children.flat(Infinity).forEach((child, index) => {
      child._mountIndex = index;
      let childDOM = createDOM(child);
      parentNode.appendChild(childDOM);
    });
}

// todo 两个虚拟DOM的对比
export function compileTwoElements(oldElement, newElement) {
  oldElement = onlyOne(oldElement);
  newElement = onlyOne(newElement);
  let currentDom = oldElement.dom; // 虚拟结点上都会有当前虚拟结点渲染出来的DOM
  let currentElement = oldElement; // 后续的操作 都会在oleElement这个虚拟DOM上进行修改。反正最后都是返回新的
  if (newElement === null) {
    currentDom.parentNode.removeChild(currentDom);
    currentElement = null;
  } else if (oldElement.type !== newElement.type) {
    let newDOM = createDOM(newElement);
    currentDom.parentNode.replaceChild(newDOM, currentDom);
    currentElement = newElement;
  } else {
    // todo 元素的类型是一样的情况
    updateElement(oldElement, newElement);
  }
  return currentElement;
}


function updateElement(oldElement, newElement) {
  let currentDOM = (newElement.dom = oldElement.dom);
  if (oldElement.$$typeof === TEXT && newElement.$$typeof === TEXT) {
    if (oldElement.content !== newElement.content) {
      // 结点的文本不一样
      oldElement.textContent = newElement.content;
    } else if (oldElement.$$typeof === ELEMENT) {
      // 如果老结点是一个元素。
      updateDOMProps(currentDOM, oldElement.props, newElement.props);
      oldElement.props = newElement.props; // ? 为啥呢？
    } else if (oldElement.$$typeof === FUNCTION_COMPONENT) {
      // 如果老结点是一个函数组件
      updateFunctionComponent(oldElement, newElement);
    } else if (oldElement.$$typeof === CLASS_COMPONENT) {
      // 如果老结点是一个类组件
      updateClassComponent(oldElement, newElement);
      newElement.componentInstance = oldElement.componentInstance; // ? 为什么新的上面的instance要保存为老的instance
    }
  }
}

// 更新DOM元素的属性
function updateDOMProps(dom, oldProps, newProps) {
  return patchProps(dom, oldProps, newProps);
}

// ? 这里是怎么回事
function updateClassComponent(oldElement, newElement) {
  let componentInstance = oldElement.componentInstance; // 组件实例
  let updater = componentInstance.$updater; // ? $updater是什么？ 怎么来的
  let nextProps = newElement.props;
  updater.emitUpdate(nextProps);
}

function updateFunctionComponent(oldElement, newElement) {
  let newRenderElement = newElement.type(newElement.props); // 新的虚拟DOM
  let oldRenderElement = oldElement.renderElement; // 老的虚拟DOM
  let currentElement = compileTwoElements(oldRenderElement,newRenderElement);
  newElement.renderElement = currentElement
}

export function ReactElement($$typeof, type, key, ref, props) {
  return {
    $$typeof,
    type,
    key,
    ref,
    props,
  };
}
