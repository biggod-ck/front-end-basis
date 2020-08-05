import { compileTwoElements } from './vDom';

export let updateQueue = {
  updaters: [],
  isPending: false,
  add(updater) {
    this.updaters.push(updater);
  },
  batchUpdate() {
    if (this.isPending) {
      return;
    }
    this.isPending = true;
    let { updaters } = this;
    let updater;
    while ((updater = updaters.pop())) {
      updater.updateComponent();
    }
    this.isPending = false;
  },
};

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
    let newRenderElement = this.render(); //
    let currentElement = compileTwoElements(oldRenderElement, newRenderElement);
    this.currentElement = currentElement;
    // 更新完成的生命周期
    if (this.componentDidUpdate) {
      this.componentDidUpdate(props, state);
    }
  }
  static isReactComponent = {};
}

export default Component;
