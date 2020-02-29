export default {
  add1() {
    return {
      type: "ADD1"
    };
  },
  minus1() {
    return {
      type: "MINUS1"
    };
  },
  delayAdd() {
    return dispatch => {
      setTimeout(() => {
        dispatch({ type: "ADD1" });
      }, 1000);
    };
  }
};
