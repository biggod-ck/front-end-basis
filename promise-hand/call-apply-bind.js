// 模拟实现以下 call apply
Function.prototype.call = function(context,...args){
  const key = Symbol()
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}

Function.prototype.apply = function(context,args=[]){
  const key = Symbol()
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}

function test1(){
  console.log('test1')
  setTimeout(()=>{
    console.log(this)
  })
}
function test2(){
  console.log('test2')
  setTimeout(()=>{
    console.log(this)
  })
}
test1.call({name:'test'})
test2.apply({name:'test'})


test1.call.call(test2) // 这个函数的输出结果

/**
 * call 前面是谁就是执行谁。这个地方是test1.call  就是定义再原型上的方法。将方法里面的this 改为了test2
 * context[key] 这个时候就是指的 test2
 * 执行context[key]就是执行test2
 */