import { TEXT, ELEMENT, CLASS_COMPONENT, FUNCTION_COMPONENT } from './constants';
import { ReactElement } from './vDom';
import Component from './component';
/*
React.createElement(
  "div",
  {
    id: "1",
    s: "2",
    ref: "hello",
    key: "1"
  },
  "hello world",
  React.createElement("span", {
    p: "3"
  })
);
*/

export function createElement(type, config, ...children) {
  delete config.__self;
  delete config.__source;
  let { key, ref, ...props } = config;
  let $$typeof = null;
  if (typeof type === 'string') {
    $$typeof = ELEMENT;
  } else if (typeof type === 'function' && type.isReactComponent) {
    $$typeof = CLASS_COMPONENT;
  } else if (typeof type === 'function') {
    $$typeof = FUNCTION_COMPONENT;
  }
  // 处理孩子结点
  props.children = children.map((child) => {
    if (typeof child === 'object') {
      return child;
    } else {
      // todo 文本类型
      return {
        $$typeof: TEXT,
        type: TEXT,
        content: child,
      };
    }
  });
  return ReactElement($$typeof, type, key, ref, props);
}

const React = {
  createElement,
  Component
};

export default React;
