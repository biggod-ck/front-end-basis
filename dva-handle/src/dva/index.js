import React from 'react';
import ReactDom from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as sagaEffects from 'redux-saga/effects';
import { Provider, connect } from 'react-redux';
import { createHashHistory } from 'history';
export { connect };
const NAMESPACE_SEP = '/';

export default function (opts = {}) {
  let history = opts.history || createHashHistory();
  let app = {
    _models: [],
    model,
    _router: null,
    router,
    start,
  };

  function model(m) {
    prefixNamespace(m);
    app._models.push(m);
  }

  function router(router) {
    app._router = router;
  }

  function start(container) {
    let reducers = getReducers(app);
    const sagas = getSagas(app);
    const sagaMiddleware = createSagaMiddleware();
    app._store = applyMiddleware(sagaMiddleware)(createStore)(reducers);
    sagas.forEach((saga) => {
      sagaMiddleware.run(saga);
    });
    ReactDom.render(
      <Provider store={app._store}>{app._router()}</Provider>,
      document.querySelector(container),
    );
  }

  return app;
}
// 拿到所有modal里面的reducer
function getReducers(app) {
  let reducers = {}; // 这个是合并的reducer，传递给combineReducers({counter1:function(){},counter2:function(){}})
  for (let model of app._models) {
    // m.reducers 可以拿到 reducers
    reducers[model.namespace] = function (state = model.state, action) {
      // debugger
      let reducer = model.reducers ? model.reducers[action.type] : undefined; // 类似于策略模式的写法。获取到对应的reducer进行执行
      return reducer ? reducer(state, action) : state;
    };
  }
  return combineReducers(reducers);
}

function getSagas(app) {
  let sagas = [];
  for (let model of app._models) {
    sagas.push(function* () {
      for (let key in model.effects) {
        const watcher = getWatcher(key, model.effects[key], model);
        yield sagaEffects.fork(watcher);
      }
    });
  }
  return sagas; // sagaMiddleware.run 执行的就是这个数组里面的saga
}

function getWatcher(type, currentSaga, model) {
  // 重写put方法。将put内部的type替换为对应的key
  function put(action) {
    return sagaEffects.put({
      ...action,
      type: prefixType(action.type, model),
    });
  }
  return function* () {
    yield sagaEffects.takeEvery(type, function* (action) {
      yield currentSaga(action, {
        ...sagaEffects,
        put,
      });
    });
  };
}

function prefixType(type, model) {
  if (!type.includes(NAMESPACE_SEP)) {
    return `${model.namespace}${NAMESPACE_SEP}${type}`;
  } else if (type.startsWith(model.namespace)) {
    console.warn('不需要带命名空间');
  }
  return type;
}

function prefixNamespace(model) {
  if (model.reducers) {
    model.reducers = prefix(model.reducers, model.namespace);
  }
  if (model.effects) {
    model.effects = prefix(model.effects, model.namespace);
  }
}

function prefix(obj, namespace) {
  return Object.keys(obj).reduce((memo, key) => {
    let newKey = `${namespace}${NAMESPACE_SEP}${key}`;
    memo[newKey] = obj[key];
    return memo;
  }, {});
}
