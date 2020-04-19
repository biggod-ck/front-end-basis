// 反柯理化的实现
function unCurring(fn) {
  return (context, ...args) => {
    return Reflect.apply(fn,context,...args)
    // return Function.prototype.apply.call(fn, context, ...args);
  };
}

const type = unCurring(Object.prototype.toString)
const join = unCurring(Array.prototype.join)

console.log(type('test'))
console.log(join([1,2,3],4))


