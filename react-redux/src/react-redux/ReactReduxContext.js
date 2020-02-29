import {createContext} from 'react';
let ReactReduxContext = createContext(null);
let {Consumer,Provider} = ReactReduxContext
export default ReactReduxContext;
export {
  Provider,
  Consumer
}
