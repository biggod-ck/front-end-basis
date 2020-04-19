import React from './buildOwnReact/react'

let ele = React.createElement(
  'div',
  { id: 'app' },
  React.createElement('span', { style: { color: 'red' } }, 'hello'),
  React.createElement('span', { style: { color: 'green' } }, 'word'),
);

function App(props) {
  const [state, setState] = React.useState('么么哒😘');
  const [state1, setState1] = React.useState('么么哒😘');
  return (
    <div>
      <h1>Hi {props.name}</h1>
      <div
        onClick={() => {
          setState(()=>new Date().getTime());
        }}
      >
        {state}
      </div>
      <div
        onClick={() => {
          setState1(()=>new Date().getTime());
        }}
      >
        {state1}
      </div>
    </div>
  );
}
const element = <App name="foo" />;

React.render(element, document.getElementById('root'));
