// import { takeEvery, delay, put, all, fork, take, call } from 'redux-saga/effects';
import { take, put, delay, call } from '../mySaga/effects';

function* add() {
  console.log('add start');
  // yield delay(2000);
  console.log(`add end`);
  yield put({
    type: 'reducerAdd',
    payload: {
      num: 10,
    },
  });
}
function* minus() {
  console.log('minus start');
  // yield delay(1000);
  console.log(`minus end`);
  yield put({
    type: 'reducerMinus',
    payload: {
      num: 1,
    },
  });
}

const rootSage = function* () {
  // ! 1
  // yield takeEvery('ADD', add);
  // yield takeEvery('MINUS', minus);

  // !2
  // yield all([
  //   yield takeEvery('ADD', add),
  //   yield takeEvery('MINUS', minus)
  // ])

  // !3
  // yield all([takeEvery('ADD', add), takeEvery('MINUS', minus)]);

  // !4 无阻塞
  // yield fork(function* () {
  //   yield takeEvery('ADD', add);
  // });
  // yield fork(function* () {
  //   yield takeEvery('MINUS', minus);
  // });

  // take
  // yield fork(function* () {
  //   yield take('ADD');
  //   yield call(add);
  // });
  // yield fork(function* () {
  //   yield take('MINUS');
  //   yield call(minus);
  // });
  yield take('ADD');
  const value = yield delay(2000, 'delay第二个参数');
  console.log(value);
  const args = yield call(
    function (...args) {
      return new Promise((resolve) => {
        resolve(args);
      });
    },
    1,
    2,
  );
  console.log('call args', args);
  yield put({
    type: 'reducerAdd',
    payload: {
      num: 50,
    },
  });
};

export default rootSage;
