// import { takeEvery, delay, put, all, fork, take, call } from 'redux-saga/effects';
import { take, put, delay, call, takeEvery, cps, fork } from '../mySaga/effects';

function* add() {
  console.log('add start');
  yield put({
    type: 'reducerAdd',
    payload: {
      num: 10,
    },
  });
  console.log(`add end`);
}
function* minus() {
  console.log('minus start');
  yield put({
    type: 'reducerMinus',
    payload: {
      num: 1,
    },
  });
  console.log(`minus end`);
}
const delayPromise = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('500ms过后执行minus');
    }, 500);
  });
};
const nodeCps = function (ms, callBack) {
  console.log('node cps');
  setTimeout(() => {
    callBack('node cps的参数');
  }, ms);
};

const rootSage = function* () {
  yield takeEvery('everyAdd', add);
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
  yield minus();
  let promiseArgs = yield delayPromise();
  console.log('yield 支持promise的后续参数', promiseArgs);
  let cpsArgs = yield cps(nodeCps, 1000);
  console.log('cpsArgs', cpsArgs);
  yield add();
  const t = yield fork(function* () {
    yield 1;
    yield 2;
  });
  console.log('cancel', t);
};

export default rootSage;
