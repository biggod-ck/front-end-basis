import {createDOM} from '../react/vDom'
function render(element,container){
  let dom = createDOM(element); // 虚拟DOM转换为真实的DOM
  container.appendChild(dom)
}
export default {
  render
}

