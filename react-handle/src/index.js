import React from './react';
import ReactDOM from './react-dom';

let onClick = (e) => {
  console.log(e);
};
let element = React.createElement(
  'button',
  { id: 'sayHello', onClick },
  'say',
  React.createElement('span', { style: { color: 'red' } }, 'Hello'),
);

function Test(props) {
  console.log(props)
  return element;
}

class C extends React.Component {
  render() {
    return <Test name={this.props.name}>
      <div>i am child</div>
    </Test>;
  }
}

ReactDOM.render(<C name="Hello React" />, document.getElementById('root'));
