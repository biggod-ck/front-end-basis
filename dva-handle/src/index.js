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
});

function counter(props) {
  console.log(props)
  return (
    <div>
      <p>{props.number}</p>
      <button onClick={()=>{
        props.dispatch({type:'counter/add'})
      }}>+++++</button>
    </div>
  );
}

let Counter = connect(({ counter }) => counter)(counter);

app.router(() => <Counter></Counter>);

app.start('#root')
