
import { cube, square } from './math.js';

function component() {
  const element = document.createElement('pre');
  // Lodash, now imported by this script
  element.innerHTML = _lodash_.join(['Hello', 'webpack'], ' ');
  element.innerHTML = ['Hello webpack!', '5 cubed is equal to ' + cube(5)].join('\n\n');

  return element;
}

document.body.appendChild(component());
