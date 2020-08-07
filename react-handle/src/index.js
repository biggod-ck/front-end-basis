import React from './react';
import ReactDOM from './react-dom';

// let onClick = (e) => {
//   console.log(e);
// };
// let element = React.createElement(
//   'button',
//   { id: 'sayHello', onClick },
//   'say',
//   React.createElement('span', { style: { color: 'red' } }, 'Hello'),
// );

// function Test(props) {
//   return (
//     <div>
//       {element}
//       <div>{props.children}</div>
//     </div>
//   );
// }

// class C extends React.Component {
//   state = { name: 'hello world' };
//   changeName = () => {
//     this.setState({
//       name: this.state.name.split('').reverse().join(''),
//     });
//   };
//   render() {
//     console.log(this.state.name)
//     return (
//       <div name = {this.state.name}>
//         <button onClick={this.changeName}>更改状态</button>
//       </div>
//     );
//   }
// }

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
    setInterval(() => {
      this.setState({
        number: this.state.number + 1,
      });
    }, 1000);
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log(this.state, this.props, nextProps, nextState);
    return true;
  }
  render() {
  return <div number={this.state.number}>{this.state.number}</div>;
  }
}

ReactDOM.render(<Counter />, document.getElementById('root'));
