import React from 'react';
import { connect } from './react-redux';
import counterActions1 from './store/actions/counter1';
import counterActions2 from './store/actions/counter2';

import {bindActionCreators} from './redux'
const home = props => {
  return (
    <div>
      <div>
        <h1>Counter1: {props.counter1.num}</h1>
        <button onClick={props.add1}>增加</button>
        <button onClick={props.add}>增加 mapDispatchToProps函数的形式 </button>
        <button onClick={props.minus}>减少 mapDispatchToProps函数的形式</button>
      </div>

      <div>
        <h1>Counter2: {props.counter2.num}</h1>
        <button
          onClick={() => {
            props.promiseAdd({ type: 'ADD2', num: 11 });
          }}
        >
          promiseAdd2 好好理解吧
        </button>
      </div>
      <div>
        <h1>因为DVA 逼着了解一下saga</h1>
        <button
          onClick={() => {
            props.sagaRun1()
          }}
        >
          saga1
        </button>
        <button
          onClick={() => {
            props.sagaRun2()
          }}
        >
          saga2
        </button>
        <button
          onClick={() => {
            props.sagaRun3()
          }}
        >
          saga3
        </button>
        <button
          onClick={() => {
            props.sagaRun4()
          }}
        >
          saga4
        </button>
        <button
          onClick={() => {
            props.sagaRun5()
          }}
        >
          saga5
        </button>
        <button
          onClick={() => {
            props.sagaRun6()
          }}
        >
          saga6
        </button>
        <button
          onClick={() => {
            props.sagaRun7()
          }}
        >
          saga7
        </button>
        <button
          onClick={() => {
            props.sagaRun8()
          }}
        >
          saga8
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = state => state;

// dispatch 拿到了，就可以自己派发了；
// 并且可以再派发之前做自己的逻辑
const mapDispatchToProps = dispatch => {
  return {
    add(...args) {
      dispatch(counterActions1.add1(...args));
    },
    minus(...args) {
      dispatch(counterActions1.minus1(...args));
    },
    promiseAdd(...args) {
      // 这里可以随便写点什么再派发，甚至可以加一个延迟函数，其他两种不支持哟
      dispatch(counterActions2.promiseAdd(...args));
    },
  };
};

// 通过 bindActionCreators绑定 生成的形式如下
// {promiseAdd:(args)=>{dispatch(counterActions2.promiseAdd(args))}}
const mapDispatchToProps1 = dispatch => {
  return bindActionCreators({
    promiseAdd:counterActions2.promiseAdd,
    minus:counterActions1.minus1,
    add:counterActions1.add1,
    sagaRun1:()=>({type:'asyncAdd1'}),
    sagaRun2:()=>({type:'asyncAdd2'}),
    sagaRun3:()=>({type:'asyncAdd3'}),
    sagaRun4:()=>({type:'asyncAdd4'}),
    sagaRun5:()=>({type:'asyncAdd5'}),
    sagaRun6:()=>({type:'asyncAdd6'}),
    sagaRun7:()=>({type:'asyncAdd7'}),
    sagaRun8:()=>({type:'asyncAdd8'}),
  },dispatch)
};


// export default connect(mapStateToProps, counterActions1)(home);
// export default connect(mapStateToProps, mapDispatchToProps)(home);
export default connect(mapStateToProps, mapDispatchToProps1)(home);
