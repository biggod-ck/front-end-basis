import { createStore, combineReducers, applyMiddleware } from '../redux';
import counter1 from './reducer/counter1';
import counter2 from './reducer/counter2';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, all, call, put, delay, fork ,take} from 'redux-saga/effects';

// logger  中间件
function logger(store) {
  return function (next) {
    return function (action) {
      console.log(`派发的动作是${action.type}`, '老的值是', store.getState());
      next(action);
      console.log(`派发的动作是${action.type}`, '新的值是', store.getState());
    };
  };
}

function thunk(store) {
  return function (next) {
    return function (action) {
      if (typeof action === 'function') {
        action(store.dispatch);
      } else {
        next(action);
      }
    };
  };
}

function promise(store) {
  return function (next) {
    return function (action) {
      if (typeof action.then === 'function') {
        action.then((action) => next(action));
      } else {
        next(action);
      }
    };
  };
}

let reducers = combineReducers({ counter1, counter2 });
let sagaMiddleWare = createSagaMiddleware();
let store = applyMiddleware(sagaMiddleWare, promise, thunk, logger)(createStore)(reducers);

// dva 源码多次监听没有理解到 测试一下
sagaMiddleWare.run(function* () {
  yield takeEvery('asyncAdd1', function* (...args) {
    console.log(...args);
  });
});
sagaMiddleWare.run(function* () {
  yield takeEvery('asyncAdd2', function* () {
    console.log(2);
  });
});
sagaMiddleWare.run(function* () {
  yield takeEvery('asyncAdd3', function* () {
    console.log(3);
  });
});
sagaMiddleWare.run(function* () {
  yield all([
    yield takeEvery('asyncAdd4', function* () {
      console.log(4);
    }),
    yield takeEvery('asyncAdd5', function* () {
      console.log(5);
    }),
  ]);
});
sagaMiddleWare.run(function* () {
  
  yield fork(function* () {
    yield takeEvery('asyncAdd6', function* () {
      console.log('asyncAdd6')
      yield takeEvery('asyncAdd8',function*(){
        console.log('asyncAdd8')
      })
    });
  });
  yield fork(function* () {
    yield takeEvery('asyncAdd7', function* () {
      console.log(7);
    });
  });
});
export default store;
