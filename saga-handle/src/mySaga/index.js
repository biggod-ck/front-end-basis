// 返回一个标准中间件的形式
const eventEmitter = require('events');

function times(cb, total) {
  let count = 0;
  return function () {
    if (++count === total) {
      cb();
    }
  };
}

function createSagaMiddleware() {
  const events = new eventEmitter();
  function sagaMiddleware(API) {
    function run(generator, callback) {
      let it = generator[Symbol.iterator] ? generator : generator(); // 处理执行 generator 或者 iterator
      // 自动迭代的函数
      function next(args) {
        const { value: effect, done } = it.next(args);
        if (!done) {
          // 处理 yield function *(){} 这种的情况
          if (effect[Symbol.iterator]) {
            run(effect);
            next(args); // 注意此时的next指代的是谁
          } else if (typeof effect === 'object' && typeof effect.then === 'function') {
            effect.then(next); // yield promise 的情况。等待promise执行完过后再执行下一次的next
          } else {
            switch (effect.type) {
              case 'TAKE':
                events.once(effect.actionType, next); // 对应 yield take(TYPE) 此时就会阻止后续的yield的执行。这里使用的是 event 模块。必须触发对应的type才会继续next的执行
                break;
              case 'PUT':
                API.dispatch(effect.action); // yield put({ type:'**' }) 其实就是dispatch一个动作
                next();
                break;
              case 'CALL':
                const { fn, args, context } = effect.payload;
                fn.apply(context, args).then(next);
                break;
              case 'FORK': // 这个是最不好理解的 yield fork(generator) it.next() 执行后返回 {type:'FORK',task:generator}
                const { task } = effect;
                let returnTask = task();
                run(returnTask); // 这步会去执行fork内部的generator，如果遇到take类型的阻止后续yield执行的情况。会让出执行栈。
                next(returnTask); // 这个是将fork的generator 赋值给fork前面的变量，方便后续的取消任务。这一步需要等到上面的run执行完后才会执行。
                break;
              case 'CPS':
                effect.fn(effect.args, next);
                break;
              case 'CANCEL':
                effect.iterator.return('over'); // 取消当前的任务
                next();
                break;
              case 'ALL':
                let generators = effect.generators;
                let done = times(next, generators.length); // 所有的generator都执行完了才会执行next。
                for (let index = 0; index < generators.length; index++) {
                  const generator = generators[index];
                  run(generator, done);
                }
                break;
              default:
                break;
            }
          }
        } else {
          // 执行完毕 触发回调
          callback && callback();
        }
      }
      next();
    }
    sagaMiddleware.run = run; // 所以 sagaMiddleware.run 要放到后面执行。需要先执行完sagaMiddleware 这个函数。才能给run赋值

    return function (next) {
      return function (action) {
        // 中间件的逻辑处理
        events.emit(action.type, action);
        return next(action);
      };
    };
  }
  return sagaMiddleware;
}

export default createSagaMiddleware;
