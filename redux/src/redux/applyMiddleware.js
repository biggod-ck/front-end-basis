// 使用中间件 并且返回一个store
// 改写store上的dispatch
import componse from './componse';
// redux 中间件的形式

// function logger(store){
//   return function(next){
//     return function (action){
//       console.log(store.getState());
//       next(action);
//       console.log(store.getState())
//     }
//   }
// }

export default (...middlewares) => (createStore) => (reducer) => {
  const store = createStore(reducer); // 创建store
  let dispatch = null; // 需要增强的dispatch
  const middlewareAPI = {
    getState: store.getState,
    dispatch: (...args) => dispatch(...args), // dispatch 需要后面赋值
  };
  const chain = middlewares.map((middleware) => middleware(middlewareAPI)); // [(next)=>(action)=>{},(next)=>(action)=>{}] 这个再通过compose组合一下

  // chian 想象成 [函数a，函数b，函数c] 组合后返回的就是 (args)=>a(b(c(args))) 当传入了 store.dispatch 返回的就是 a(b(c(store.dispatch)))的结果
  // 不考虑其他的中间件 假设 a,b,c 都是logger中间件 那么 c(store.dispatch) 返回 (action)=>{} 这个函数。假设叫做MM
  // b(MM) b里面的next 就变成了 MM  b(MM) 执行返回 (action)=>{} 这个函数。假设叫做GG
  // a(GG) a内部的next 就变成了 GG 。a(GG)返回值就成为了一个新的 dispatch 函数 类似于 (action)=>{} 这个形式。这个就是串联了所有中间件的dispatch函数。
  // 增强版的函数收到了一个action。执行next上面的代码。遇到next，此时的next就是b(MM)执行的返回值GG。 进入GG执行。遇到next，此时的next就是 c()执行返回的函数PP。
  // 执行PP。遇到next。此时的next就是 compose组合的时候传入的store.dispatch。派发真正的action。函数在一步一步出栈。形成洋葱圈的模型

  // 这一次的理解是不用想上面那么多 反正返回的就是 (args)=>a(b(c(args)))
  // 只有最里面的中间件可以拿到真正的store.dispatch。
  // 执行完毕过后返回的就是一个 (action)=>{...} 这就是加强的dispatch函数
  dispatch = componse(...chain)(store.dispatch); // 增强的dispatch 就是一个串联了所有的中间件的dispatch
  return {
    ...store,
    dispatch,
  };
};
