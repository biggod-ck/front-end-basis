import React, { useState,useEffect } from "react";
import store from "./store";
import {bindActionCreators} from './redux'
import action1 from './store/actions/counter1'
import action2 from './store/actions/counter2'

let boundActionsCounter1 = bindActionCreators(action1,store.dispatch)
let boundActionsCounter2 = bindActionCreators(action2,store.dispatch)


function App() {
  window.store = store;
  useEffect(()=>{
    store.subscribe(changeNum)
  },[])
  let [state,setState] = useState({
      num1:store.getState().counter1.num,
      num2:store.getState().counter2.num
  })
  let changeNum = ()=>{
    setState({
      num1:store.getState().counter1.num,
      num2:store.getState().counter2.num
    })
  }
  return (
    <div className="App">
      <div>
        <h1>计数器1：{state.num1}</h1>
        <button onClick={()=>{store.dispatch({type:'ADD1'})}}>增加计数器1</button>
        <button onClick={()=>{store.dispatch({type:'MINUS1'})}}>减少计数器1</button>
        <button onClick={boundActionsCounter1.add1}>增加计数器1 bindActionCreators</button>
        <button onClick={boundActionsCounter1.minus1}>减少计数器1 bindActionCreators</button>

        <button onClick={boundActionsCounter1.delayAdd}>延迟加 thunk中间件</button>
      </div>
      <div>
        <h1>计数器2：{state.num2}</h1>
        <button onClick={()=>{store.dispatch({type:'ADD2',num:10})}}>增加计数器2</button>
        <button onClick={()=>{store.dispatch({type:'MINUS2'})}}>减少计数器2</button>

        <button onClick={boundActionsCounter2.add.bind(store,100)}>增加计数器2 bindActionCreators</button>
        <button onClick={boundActionsCounter2.minus.bind(store,50)}>减少计数器2 bindActionCreators</button>

        <button onClick={boundActionsCounter2.promiseAdd.bind(store,{type:'ADD2',num:11})}>增加 promise中间件</button>
        <button onClick={boundActionsCounter2.promiseAdd.bind(store,{type:'MINUS2',num:1000})}>减少 promise中间件</button>
      </div>
    </div>
  );
}

export default App;
