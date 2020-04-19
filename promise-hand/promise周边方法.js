const Promise = require('./完整版本');

function isPromise(value) {
  if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
    if (typeof value.then === 'function') {
      return true;
    }
  }
  return false;
}

Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    // 需要等到内部的所有的 promise 全部执行完毕 才 resolve 或者 reject 当前返回的这个promise
    let arr = [];
    let index = 0;
    function processData(i, y) {
      arr[i] = y;
      if (++index === promises.length) {
        resolve(arr);
      }
    }
    for (let i = 0; i < promises.length; i++) {
      let value = promises[i];
      if (isPromise(value)) {
        value.then(
          data => {
            processData(i, data);
          },
          error => reject,
        );
      } else {
        processData(i, value);
      }
    }
  });
};

Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let promise of promises) {
      if (isPromise(promise)) {
        promise.then(resolve, reject);
      } else {
        resolve(promise);
      }
    }
  });
};

Promise.race([
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(200);
    }, 2000);
  }),
]).then(d => {
  console.log(d);
});

// resolve中的data可以是 普通值 或者是一个promise
Promise.resolve = function(data) {
  // todo data是一个promise。直接返回的意思就是，后续的then执行时机取决于当前的data什么时候resolve
  if (isPromise(data)) {
    return data;
  }
  // todo 普通值需要用一个promise来包装一下
  return new Promise(resolve => {
    resolve(data);
  });
};

const resolveTest = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(`测试promise.resolve 需要等待3s`);
    reject(100);
  }, 3000);
});

Promise.resolve(resolveTest).then(data => {
  console.log(data);
});

Promise.reject = function(error) {
  return new Promise((resolve, reject) => {
    reject(error);
  });
};

// 实例上的catch方法
// 实际上就是借用的参数的穿透效果与then方法返回的是一个promise
Promise.prototype.catch = function(onRejected) {
  console.log('自定义的catch方法');
  return this.then(undefined, onRejected);
};

new Promise((resolve, reject) => {
  reject('自定义实现的catch方法');
}).catch(e => {
  console.log(e);
});

// 实例上的 finally方法 this就是前一个Promise
Promise.prototype.finally = function(cb) {
  // this.then 就可以获取到前面的promise是成功还是失败
  return this.then(
    (value) => {
      return Promise.resolve(cb()).then(() => value);
    },
    error => {
      return Promise.resolve(cb()).then(() => {
        throw error;
      });
    },
  );
};
