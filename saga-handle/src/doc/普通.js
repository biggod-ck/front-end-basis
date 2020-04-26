function run(generator) {
  let it = generator();
  function next(...args) {
    const { value, done } = it.next(...args);
    if (!done) {
      next(value);
    } else {
      console.log('generator执行完成并且最后返回值', value);
    }
  }
  next();
}

function* a() {
  let a1 = yield 1;
  console.log(a1, 'a1');
  let a2 = yield 2;
  console.log(a2, 'a2');
  let a3 = yield 3;
  console.log(a3, 'a3');
  return 4;
}

run(a);
