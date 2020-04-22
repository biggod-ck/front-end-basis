export default (state = { num: 0 }, action) => {
  if (action.type === 'reducerAdd') {
    return {
      ...state,
      num: state.num + action.payload.num,
    };
  }
  if (action.type === 'reducerMinus') {
    return {
      ...state,
      num: state.num - action.payload.num,
    };
  }
  return state;
};
