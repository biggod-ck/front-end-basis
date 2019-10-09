
// 数组转换为链表
function array2list(ary){
  if(!ary.length){
    return null
  }
  var nodes = [];
  // 生成节点
  for(var i = 0; i < ary.length;i++){
    var node = {
      value:ary[i],
      next:null
    }
    nodes.push(node)
  }
  // 链接节点
  for(let i = 0; i< nodes.length - 1 ; i++){
    nodes[i].next = nodes[i+1]
  }
  return nodes[0]
}


function array2list(ary){
  if(!ary.length){
    return null
  }
  let prev = {
    value:ary[0],
    next:null
  }
  let head = prev; 
  // 生成节点
  for(var i = 0; i < ary.length;i++){
    var node = {
      value:ary[i],
      next:null
    }
    prev.next = node // 对象赋值是一个地址的引用 prev.next 指向的是node的地址
    prev = node
  }
  return head
}


// 递归的写法
function array2list(ary){
  if(!ary.length){
    return null
  }
  let node = {
    value:ary[0],
    next:null
  }
  node.next = array2list(ary.slice(1)) // 想象从最后一项退出执行栈 就清楚了

  return node
}


// 递归的写法 的 优化 去除slice 优化性能
function array2list(ary,start=0){
  if(!ary.length || start >= ary.length ){
    return null
  }
  let node = {
    value:ary[start],
    next:null
  }
  node.next = array2list(ary,start+1) // 想象从最后一项退出执行栈 就清楚了
  return node
}

console.log(array2list([1,2,3,4,5,6]))