import {TEXT,ELEMENT} from '../react/constant.js'
function render(element, parent) {
  if (typeof element === 'string') {
    return parent.appendChild(document.createTextNode(element));
  }
  let type = element.type;
  let props = element.props;

  if (type.isReactComponent) {
    element = new type(props).render(); //类组件执行
    type = element.type;
    props = element.props;
  }

  if (typeof type === 'function') {
    element = type(props); // 函数组件执行
    type = element.type; // 获取函数组件返回的虚拟DOM
    props = element.props;
  }

  let domElement = document.createElement(type); // h1 span p
  for (let prop in props) {
    // ['hello',{type:p,props:{children:['world']}}]
    if (prop === 'children') {
      //...children 函数没有赋值的时候 返回的是一个空数组
      props.children.forEach((child) => {
        render(child, domElement);
      });
    } else if (prop === 'style') {
      const styleObj = props.style;
      for (let style in styleObj) {
        domElement.style[style] = styleObj[style];
      }
    } else if (prop === 'className') {
      domElement.className = props[prop];
    } else {
      domElement.setAttribute(prop, props[prop]);
    }
  }
  parent.appendChild(domElement);
}

export default {
  render,
};
