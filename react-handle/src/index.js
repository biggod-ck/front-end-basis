import React from './react';
import ReactDOM from './react-dom';
import App from './App';
import  R from './react/index'

let ele = R.createElement('h1',{className:'title',style:{backgroundColor:'red'}},'hello',R.createElement('span',{style:{color:'green'}},'world'))

// function TestFunction(props){
//   return R.createElement('h1',{className:'title',style:{backgroundColor:'red'}},'hello',R.createElement('span',{style:{color:'green'}},props.name))
// }
// <TestFunction /> 编译过后就是 React.createElement(TestFunction,{name:'chendage'}) TestFunction({name:'我是函数组件的属性'})

class Test extends React.Component{
  render(){
    return R.createElement('h1',{className:'title',style:{backgroundColor:'red'}},'hello',R.createElement('span',{style:{color:'green'}},this.props.name))
  }
}
// 

let fnc = R.createElement(Test,{name:'我是类组件的属性'}) // 编译过后
ReactDOM.render(ele, document.getElementById('root'));
