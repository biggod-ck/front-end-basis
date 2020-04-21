function createElement(type,config,...children){
  const props = {
    ...config,
    children
  }
  const element = {
    type,
    props
  }
  return element
}

class Component {
  static isReactComponent=true; // 静态属性 子类上可以直接获取到
  constructor(props){
    this.props = props
  }
}

export default  {
  createElement,
  Component
}