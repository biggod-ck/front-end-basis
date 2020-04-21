export default function(state={num:0},action){
  switch (action.type) {
    case "ADD2":
      return {
        num:state.num+ (action.num || 1)
      }
    case "MINUS2":
      return {
        num:state.num- (action.num || 1 )
      }
    default:
      return state
  }
}