import React from 'react';
import reactDom from 'react-dom';
import C from './counter';
require('./style/index.css');
require('./style/index.less');
import img from '../assets/lz.jpg';
console.log('study-webpack');
console.log(img);
require('./es6');

interface Istate {
  count: number;
}
interface Ipros {
  count: number;
}

class Counter extends React.Component<Ipros, Istate> {
  public state: Istate = {
    count: this.props.count,
  };
  public add = () => {
    this.setState({
      count: ++this.state.count,
    });
  };
  public loadFIle = () => {
    // 懒加载js 前面是打包的名字
    import(/* webpackChunkName:'lazyLoad' */ './dlltest.js').then(data => {
      console.log(data.add(1, 2));
    });
  };
  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.add}> 加</button>
        <button onClick={this.loadFIle}>懒加载js</button>
        <C></C>
      </div>
    );
  }
}

// 配置react
reactDom.render(<Counter count={2} />, document.getElementById('root'));
