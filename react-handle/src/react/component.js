import { compileTwoElements } from './vDom';
import { isFunction } from './utils';

//! updateQueue是一个全局的更新对象
// todo 记录updaters。判断当前是什么更新方式。触发更新
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
  // todo 组件更新的时候。会调用自己身上$updater上的emitUpdate方法
  emitUpdate(nextProps) {
    this.nextProps = nextProps; // 所以看出来了props的变化会直接调用组件的更新方法
    nextProps || !updateQueue.isPending ? this.updateComponent() : updateQueue.add(this); // 不是等待状态直接更新 是等待状态的话就添加到更新队列里面
  }
  updateComponent() {
    let { instance, pendingStates, nextProps } = this;
    if (nextProps || pendingStates.length > 0) {
      shouldUpdate(instance, nextProps, this.getState());
    }
  }
  getState() {
    let { instance, pendingStates } = this;
    let { state } = instance;
    if (pendingStates.length) {
      pendingStates.forEach((nextState) => {
        if (isFunction(nextState)) {
          nextState = nextState.call(instance, state);
        }
        state = { ...state, ...nextState };
      });
    }
    return state;
  }
}

function shouldUpdate(component, nextProps, nextState) {
  if (component.shouldComponentUpdate && !component.shouldComponentUpdate(nextProps, nextState)) {
    return;
  }
  component.props = nextProps;
  component.state = nextState;
  component.forceUpdate(); // 再调用组件的更新方法
}

// 每一个类都有一个对应的updater
// updater类又保存了当前的组件的实例
class Component {
  constructor(props) {
    this.props = props;
    this.$updater = new Updater(this);
    this.state = {};
    this.nextProps = null;
  }
  setState(partialState) {
    this.$updater.addState(partialState); // partialState 可以是对象 也可以是函数
  }
  forceUpdate() {
    let { props, state, renderElement: oldRenderElement } = this;
    if (this.componentWillUpdate) {
      this.componentWillUpdate(props, state); // todo 组件将要更新的生命周期
    }
    let newRenderElement = this.render(); // 拿到最新生成的虚拟DOM
    let currentElement = compileTwoElements(oldRenderElement, newRenderElement); //currentElement 当前最新的虚拟DOM结点。
    this.renderElement = currentElement; //! 当前最新的虚拟DOM。并且上面有对应的DOM，赋值给当前实例的renderElement,作为下一次更新的oldRenderElement
    // 更新完成的生命周期
    if (this.componentDidUpdate) {
      this.componentDidUpdate(props, state);
    }
  }
  static isReactComponent = {};
}

export default Component;
