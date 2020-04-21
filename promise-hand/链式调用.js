const PENDING = 'pending';
const RESOLVE = 'resolve';
const REJECT = 'reject';

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
        this.onResolvedCallback.forEach(fn => fn())
      }
    };
    let reject = reason => {
      if (this.status === REJECT) {
        this.reason = reason;
        this.status = REJECT;
        this.onRejectedCallback.forEach(fn => fn())
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
    // ! 需要理解清楚 onFulfilled 执行完成过后的返回值 与 promise2 之间的关系
    // ! onFulfilled 执行结束的返回值会传递给promise2的resolve。给到promise2的then作为参数
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVE) {
        // ! 这个x可能是一个普通值 也可能是一个promise
        // 如果是一个promise 需要用x的状态来决定 promise2的状态
        // onFulfilled 执行可能出现异常的情况 需要捕获一下 并且将 promise2 reject掉
        try {
          let x = onFulfilled(this.value);
          resolve(x)
        } catch (error) {
          reject(error)
        }

      }
      if (this.status === REJECT) {
        try {
          let x = onRejected(this.reason); // 失败的时候 返回值只要是一个普通值 就走到promise2的成功
          resolve(x)
        } catch (error) {
          reject(error)
        }

      }
      if (this.status === PENDING) {
        this.onResolvedCallback.push(() => {
          // 方便扩展 增加其他的逻辑
          try {
            let x = onFulfilled(this.value);
            resolve(x)
          } catch (error) {
            reject(error) 
          }

        });
        this.onRejectedCallback.push(() => {
          try {
            let x = onRejected(this.reason);
            resolve(x)
          } catch (error) {
            reject(error)
          }

        });
      }
    })



    return promise2; // 保证后续可以接着调用

  }
}

new Promise((resolve) => {
  setTimeout(() => {
    resolve(200)
  }, 1000)
}).then((d) => { console.log(d) })
