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

function delayP(ms = 0, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}
