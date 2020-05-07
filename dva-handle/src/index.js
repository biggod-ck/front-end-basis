import React from 'react';
import dva, { connect } from './dva';
import { createBrowserHistory } from 'history';
let app = dva({
  history: createBrowserHistory(),
});

app.model({
  namespace: 'counter',
  state: { number: 0 },
  reducers: {
    add(state) {
      return { number: state.number + 1 };
    },
  },
  effects: {
    *asyncAdd(action, { put }) {
      yield new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
      yield put({
        type: 'add',
      });
    },
  },
});

function counter(props) {
  return (
    <div>
      <p>{props.number}</p>
      <button
        onClick={() => {
          props.dispatch({ type: 'counter/add' });
        }}
      >
        同步加
      </button>
      <button
        onClick={() => {
          props.dispatch({ type: 'counter/asyncAdd' });
        }}
      >
        异步加
      </button>
    </div>
  );
}

let Counter = connect(({ counter }) => counter)(counter);

app.router(() => <Counter></Counter>);

app.start('#root');
