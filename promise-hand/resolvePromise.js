const PENDING = 'pending';
const RESOLVE = 'resolve';
const REJECT = 'reject';

// 链式调用的核心逻辑 x 主要是
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(`自己返回了自己，卡死了`);
  }
  // 判断x的值的情况 普通值 对象{then:} promise
  if ((typeof x === 'object' && typeof x !== null) || typeof x === 'function') {
    try {
      let then = x.then // 这里可能抛出异常 Object.defineProperty() 
      if (typeof then === 'function') {
        // 这里对应的就是这个情况。then
        // promise1.then((data)=>{
        //   return M = new Promise((resolve,reject)=>{
        //     resolve(100) // resolve(new Promise(...))
        //   })
        // })
        // 上面的M 即使x为一个promise的情况。内部的resolve() 参数可能又有两种情况 普通值 和 promise 
        then.call(x, (y) => {
          //  成功的函数
          resolvePromise(promise2, y, resolve, reject) // 需要看 y 是一个值 还是一个promise
        }, (error) => {
          // 失败的函数
          reject(error)
        })
      } else {
        // 不是函数的情况 {then:2,a:1}
        resolve(x);
      }
    } catch (error) {
      reject(error)
    }
  } else {
    // 这里就是一个普通值
    resolve(x); //promise2 直接成功了
  }

}

class Promise {
  constructor(actuator) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallback = []; // 成功的回调
    this.onRejectedCallback = []; //失败的回调
    let resolve = value => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVE;
        this.onResolvedCallback.forEach(fn => fn());
      }
    };
    let reject = reason => {
      if (this.status === REJECT) {
        this.reason = reason;
        this.status = REJECT;
        this.onRejectedCallback.forEach(fn => fn());
      }
    };
    try {
      actuator(resolve, reject);
    } catch (error) {
      reject(error); // 内部出错直接reject掉
    }
  }

  //! 链式调用的原理就是 then方法执行过后 返回值仍然是一个promise 但是这个promise必须是一个全新的promise
  then(onFulfilled, onRejected) {
    // 参数穿透
    onFulfilled = typeof onFulfilled !== 'function' ? (data) => data : onFulfilled
    onRejected = typeof onRejected !== 'function' ? error => { throw error } : onRejected


    // ! 需要理解清楚 onFulfilled 执行完成过后的返回值 与 promise2 之间的关系
    // ! onFulfilled 执行结束的返回值会传递给promise2的resolve。给到promise2的then作为参数
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVE) {
        // ! 这个x可能是一个普通值 也可能是一个promise
        // 如果是一个promise 需要用x的状态来决定 promise2的状态
        // onFulfilled 执行可能出现异常的情况 需要捕获一下 并且将 promise2 reject掉
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject); // promise2 直接放进来会报错，因为promise2还没有new完，这个时候还没拿到值
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.status === REJECT) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason); // 失败的时候 返回值只要是一个普通值 就走到promise2的成功
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0)

      }
      if (this.status === PENDING) {
        this.onResolvedCallback.push(() => {
          // 方便扩展 增加其他的逻辑
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0)

        });
        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0)

        });
      }
    });

    return promise2; // 保证后续可以接着调用
  }
}

new Promise(resolve => {
  setTimeout(() => {
    resolve(200);
  }, 1000);
}).then(d => {
  console.log(d);
});
