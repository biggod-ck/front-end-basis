var EventEmitter = require('events');

var ee = new EventEmitter();

function run(generator) {
  let it = generator[Symbol.iterator] ? generator : generator();
  function next(...args) {
    const { value, done } = it.next(...args);
    if (value && value[Symbol.iterator]) {
      run(value); // 执行到这里的时候。回去执行新的iterator。进入新的执行栈。下面的next是当前的iterator的next。如果新的执行栈里面iterator没有手动执行next。那么就会退出，执行后续代码。
      next(value); // 这里的next表示的是外部的iterator的执行。 递归
    } else {
      if (!done) {
        switch (value.type) {
          case 'TAKE':
            ee.once(value.actionType, next);
            break;
          default:
            next(value);
            break;
        }
      }
    }
  }
  next();
}

function* a() {
  yield b();
  var t = yield 123;
  console.log('执行了吗t', t);
}

function* b() {
  yield take('CCCC');
  console.log('被阻塞了');
  yield take('BBBB');
  console.log('执行完毕');
}

function take(actionType) {
  // 这里的take 与 *take的区别
  // 如果是 *take yield take 的时候返回的就是一个iterator。就会递归执行。阻塞的就是take这个iterator。然后执行next() *b的下一步继续执行
  // 如果 take不是一个generator take执行的时候，返回的就是一个 对象，就被阻塞了，就去执行a的next了。
  return {
    type: 'TAKE',
    actionType,
  };
}

run(a);

ee.emit('CCCC');
ee.emit('BBBB');
