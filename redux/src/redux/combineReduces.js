export default  (reducers)=>(allState={},action)=>{
  let combineState = {}
  for(let key in reducers){
    let reducer = reducers[key]
    let reducerState = allState[key]  // 值为undefined 就会走reducer对应的初始的state
    combineState[key] = reducer(reducerState,action) // 执行每一个单独的reducer 返回对应key的state
  }
  return combineState // 返回总的state
}