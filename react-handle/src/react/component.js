import { compileTwoElements } from "./vDom";

export class Updater {
  constructor(instance) {
    this.instance = instance; // 当前组件的实例
    this.pendingStates = []; // 保存更新操作
    this.nextProps = null;
  }
  addState(partialState) {
    this.pendingStates.push(partialState);
    this.emitUpdate();
  }
  emitUpdate(nextProps) {
    this.nextProps = nextProps;
  }
}

class Component {
  constructor(props) {
    this.props = props;
    this.$updater = new Updater(this);
    this.state = {};
    this.nextProps = null;
  }
  setState(partialState) {
    this.$updater.addState(partialState); // 保存起来
  }
  forceUpdate() {
    let { props, state, renderElement: oldRenderElement } = this;
    if (this.componentWillUpdate) {
      this.componentWillUpdate(props, state); // todo 组件将要更新的生命周期
    }
    let newRenderElement = this.render();
    let currentElement = compileTwoElements(oldRenderElement,newRenderElement);
    this.currentElement = currentElement;
  }
  static isReactComponent = {};
}

export default Component;
