import React from 'react';
import ReactDom from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { createHashHistory } from 'history';
export { connect };
const NAMESPACE_SEP = '/'
export default function (opts = {}) {
  let history = opts.history || createHashHistory();
  let app = {
    _modals: [],
    model,
    _router: null,
    router,
    start,
  };

  function model(m) {
    prefixNamespace(m)
    console.log(m)
    app._modals.push(m);
  }
  function router(router) {
    app._router = router;
  }
  function start(container) {
    let reducers = getReducers(app);
    app._store = createStore(reducers);
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
  for (let modal of app._modals) {
    // m.reducers 可以拿到 reducers
    reducers[modal.namespace] = function (state = modal.state, action) {
      // debugger
      let reducer = modal.reducers[action.type]; // 拿到对应的 reducer
      return reducer ? reducer(state, action) : state;
    };
  }
  return combineReducers(reducers);
}

function prefixNamespace(model) {
  let reducers = model.reducers || {};
  model.reducers= Object.keys(reducers).reduce((memo, key) => {
    let newKey = `${model.namespace}${NAMESPACE_SEP}${key}`;
    memo[newKey] = reducers[key]
    return memo;
  }, {});
}
