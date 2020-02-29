export default function(state={num:0},action){
  switch (action.type) {
    case "ADD1":
      return {
        num:state.num+1
      }
    case "MINUS1":
      return {
        num:state.num-1
      }
    default:
      return state
  }
}