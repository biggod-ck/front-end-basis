import React from 'react';
import { Provider } from './ReactReduxContext';
export default props => {
  let store = props.store; // 拿到全局的store 通过context的形式传递给下层组件
  return <Provider value={store}>{props.children}</Provider>;
};
