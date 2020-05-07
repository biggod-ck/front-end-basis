export function take(actionType) {
  return {
    type: 'TAKE',
    actionType,
  };
}

export function put(action) {
  return {
    type: 'PUT',
    action,
  };
}

export function delay(...args) {
  return {
    type: 'CALL',
    payload: {
      fn: delayP,
      args,
    },
  };
}

// todo call可以传递一个数组 [fn,context] 后续处理
export function call(fn, ...args) {
  let context = null;
  if (Array.isArray(fn)) {
    context = fn[0] || null;
    fn = fn[1];
  }
  return {
    type: 'CALL',
    payload: {
      fn,
      args,
      context,
    },
  };
}

export function fork(task) {
  return {
    type: 'FORK',
    task,
  };
}

export function cancel(iterator) {
  return {
    type: 'CANCEL',
    iterator,
  };
}

export function all(generators) {
  return {
    type: 'ALL',
    generators,
  };
}

/**
 *rootSagas里面调用的时候 yield takeEvery(类型,生成器) value是一个 iterator。就会去run这个iterator
 * 1. 执行到 yield fork() 的时候。返回了一个 {type:"FORK"，task}的对象
 * 2. 走进switch里面 我们就可以 run(task) 此时的task是一个生成器。程序会走进这个task的内部去执行。理论上会等到这个task内部的所有yield都执行完毕才会让出执行栈，走最外层的next。
 * 但是。task内部是一个死循环。第一次进入while。遇到了take。此时放入了events这个事件里面。必须等到中间件里面派发了对应的type才会继续往下执行。由于这个情况，程序会退出当前的iterator，执行next。
 * 这就是所谓不阻塞的原理
 */

export function* takeEvery(actionType, task) {
  yield fork(function* () {
    while (true) {
      let action = yield take(actionType);
      yield task(action); // 我们已经支持了 yield generator的做法
    }
  });
}

export function cps(fn, ...args) {
  return {
    type: 'CPS',
    fn,
    args,
  };
}

function delayP(ms = 0, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}
