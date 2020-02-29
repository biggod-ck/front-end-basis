import React, { useContext,useState, useEffect,useRef } from 'react';
import ReactReduxContext from './ReactReduxContext';
import {bindActionCreators} from '../redux'
export default function connect(mapStateToProps=()=>{}, mapDispatchToProps) {
  return function(Comp) {
    return function(props) {
      let store = useContext(ReactReduxContext)
      let actionRef = Object.create(null)
      // 常用就是 直接传入一个对象 但是会引入当前action里面的所有的type
      if(typeof mapDispatchToProps === 'object'){
      actionRef = useRef(bindActionCreators(mapDispatchToProps,store.dispatch))
      // 一个函数的形式 支持需要什么方法 就引入什么方法
      }else if(typeof mapDispatchToProps === 'function'){
       actionRef = useRef(mapDispatchToProps(store.dispatch))
      }
      useEffect(()=>{
        let unSubscribe = store.subscribe(()=>{
          setState({
            state:mapStateToProps(store.getState())
          })
        })
        return unSubscribe
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      let [state,setState] = useState({
        state:mapStateToProps(store.getState())
      })
      return <Comp {...state.state} {...actionRef.current} {...props}></Comp>;
    };
  };
}
