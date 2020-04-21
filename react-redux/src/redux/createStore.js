function createStore(reducer,preState){
  let currentState = preState;
  let listeners = []

  function getState(){
    return currentState
  }
  function subscribe(listener){
    listeners.push(listener)
    return ()=>{
      listeners.filter(item=>item === listener)
    }
  }
  function dispatch(action){
    currentState = reducer(currentState,action)
    listeners.forEach(listener=>{
      listener()
    })
  }
  dispatch({type:'@@redux_init_'})
  return {
    getState,
    subscribe,
    dispatch
  }
}

export default createStore