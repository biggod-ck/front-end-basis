// 返回一个标准中间件的形式
const eventEmitter = require('events');

function createSagaMiddleware() {
  const events = new eventEmitter();
  function sagaMiddleware(API) {
    function run(generator) {
      let it = generator[Symbol.iterator] ? generator : generator();
      function next(args) {
        const { value: effect, done } = it.next(args); // 返回yield后面的值 yield take('abc') 返回的就是 take('abc')的返回值
        if (!done) {
          if (effect[Symbol.iterator]) {
            // todo yield generate 的情况
            run(effect); // 执行内部的iterator。执行完毕后，继续外层的next
            next(args);
          } else if (typeof effect === 'object' && typeof effect.then === 'function') {
            // 支持 yield 为promise的情况
            effect.then(next);
          } else {
            switch (effect.type) {
              case 'TAKE':
                events.once(effect.actionType, next);
                break;
              case 'PUT':
                API.dispatch(effect.action);
                next();
                break;
              case 'CALL':
                const { fn, args, context } = effect.payload;
                fn.apply(context, args).then(next);
                break;
              case 'FORK':
                const { task } = effect;
                let returnTask = task(); // 执行 返回一个迭代器。 我们的run既可以执行迭代器 也可以执行生成器
                run(returnTask);
                next(returnTask);
                break;
              case 'CPS':
                effect.fn(effect.args, next);
                break;
              case 'CANCEL':
                effect.iterator.return('over');
                next();
                break;
              default:
                break;
            }
          }
        }
      }
      next();
    }
    sagaMiddleware.run = run; // 所以 sagaMiddleware.run 要放到后面执行。需要先执行完sagaMiddleware 这个函数。才能给run赋值

    return function (next) {
      return function (action) {
        // 中间件的逻辑处理
        events.emit(action.type);
        return next(action);
      };
    };
  }
  return sagaMiddleware;
}

export default createSagaMiddleware;
