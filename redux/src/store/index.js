import { createStore, combineReducers, applyMiddleware } from "../redux";
import counter1 from "./reducer/counter1";
import counter2 from "./reducer/counter2";


// logger  中间件
function logger(store) {
  return function(next) {
    return function(action) {
      console.log(`派发的动作是${action.type}`,'老的值是',store.getState());
      next(action);
      console.log(`派发的动作是${action.type}`,'新的值是',store.getState());
    };
  };
}

function thunk(store){
  return function(next){
    return function(action){
      if(typeof action === 'function'){
        action(store.dispatch)
      }else{
        next(action)
      }
    }
  }
}

function promise(store){
  return function(next){
    return function(action){
      if(typeof action.then === 'function'){
        action.then(action=>next(action))
      }else{
        next(action)
      }
    }
  }
}

let reducers = combineReducers({ counter1, counter2 });

let store = applyMiddleware(promise,thunk,logger)(createStore)(reducers);

export default store;
