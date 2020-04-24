import React from 'react';
import ReactDom from 'react-dom';
import createSagaMiddleware from './mySaga';

import { Provider, connect } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootSage from './saga';
import reducer from './reducer';
const sagaMiddleware = createSagaMiddleware();

const store = applyMiddleware(sagaMiddleware)(createStore)(reducer);

function App(props) {
  return (
    <div>
      <h1>{props.num}</h1>
      <button
        onClick={() => {
          props.dispatch({
            type: 'ADD',
          });
        }}
      >
        简单组合saga redux ADD操作
      </button>
      <button
        onClick={() => {
          props.dispatch({
            type: 'MINUS',
          });
        }}
      >
        简单组合saga redux MINUS操作
      </button>
      <button
        onClick={() => {
          props.dispatch({
            type: 'everyAdd',
          });
        }}
      >
        takeEvery
      </button>
    </div>
  );
}

let CApp = connect((state) => state)(App);
ReactDom.render(
  <Provider store={store}>
    <CApp></CApp>
  </Provider>,
  document.querySelector('#root'),
);
sagaMiddleware.run(rootSage);
