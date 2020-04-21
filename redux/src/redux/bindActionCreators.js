// bindActionCreator 解决 store.dispatch({type:***})
// 转换为内部派发
// actionCreator 
// let actions = {
//   add(){
//     return {
//       type:'ADD'
//     }
//   }
// }

export default (actions,dispatch)=>{
  if(typeof actions === 'function'){
    return (...args)=>{
      dispatch(actions(...args))
    }
  }
  let actionCreator = {}
  for (const actionKey in actions) {
    actionCreator[actionKey] = (...args)=>{
      dispatch(actions[actionKey](...args)) // store.dispatch({type:'add'})
    }
  }
  return actionCreator
}