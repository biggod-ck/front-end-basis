import { TEXT, ELEMENT } from './constant';
import {ReactElement} from './vdom'

// jsx的语法最终都会被编译成 React.createElement的形式
// 1. 需要了解一下 React.createElement到底做了什么。生成一个完整的虚拟DOM树？
/**
 * 
<div id="1" s="2" ref="hello" key="1">
	hello world
  	<span p="3"></span>
</div>
  babel 第一个参数为元素的类型 第二个为config 后续的就是children
React.createElement("div", {
  id: "1",
  s: "2",
  ref: "hello",
  key: "1"
}, "hello world",React.createElement("span", {
  p: "3"
}));
*/
function createElement(type, config = {}, ...children) {
  delete config.__source;
  delete config.__self;
  let { key, ref, ...props } = config;
  let $$typeof = null;
  if (typeof type === 'string') {
    $$typeof = ELEMENT;
  }
  props.children = children.map((item) => {
    if (typeof item === 'object') {
      return item;
    } else {
      return {
        $$typeof: TEXT,
        type: TEXT,
        content: item,
      };
    }
  });
  return ReactElement($$typeof,type,key,ref,props);
}

class Component {
  static isReactComponent = true; // 静态属性 子类上可以直接获取到
  constructor(props) {
    this.props = props;
  }
}

export default {
  createElement,
  Component,
};
