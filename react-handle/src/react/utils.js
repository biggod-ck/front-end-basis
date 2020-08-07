import { addEvent } from './event';

export function onlyOne(obj) {
  return Array.isArray(obj) ? obj[0] : obj;
}
export function setProps(dom, props) {
  for (let key in props) {
    if (key !== 'children') {
      setProp(dom, key, props[key]);
    }
  }
}

function setProp(dom, key, value) {
  if (/^on/.test(key)) {
    // todo 事件的处理
    addEvent(dom, key, value); // 给DOM添加事件
  } else if (key === 'style') {
    for (let styleName in value) {
      dom.style[styleName] = value[styleName];
    }
  } else if (key === 'className') {
    dom.className = value;
  } else {
    dom.setAttribute(key, value);
  }
  return dom;
}

export function patchProps(dom, oldProps, newProps) {
  for (const key in oldProps) {
    if (newProps.hasOwnProperty(key) && key !== 'children') {
      setProp(dom, key, newProps[key]);
    } else {
      dom.removeAttribute(key);
    }
  }
  for (const key in newProps) {
    if (key !== 'children' && !oldProps.hasOwnProperty(key)) {
      setProp(dom, key, newProps[key]);
    }
  }
}

export function isFunction(fn) {
  return typeof fn === 'function';
}
