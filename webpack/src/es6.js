const test = () => {
  console.log('jiantouhanshu')
}
test()

@log(1)
class A {
  @params a = 1
  test(a) {
    console.log(a)
  }
}
function params(...arg){
  console.log(arg)
}

function log(num) {
  return (args)=> {
    console.log(num)
    args.prototype.name = 123
  }
}
console.log(new A().a)
console.log(new A().name)

// es7语法 默认不能转换实例上的方法 promise 不推荐使用babel-polyfill 配置@bable/preset-env
// console.log([1,2,3].includes(1)) 