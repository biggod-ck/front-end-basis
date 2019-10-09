

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

console.log(list2Array(array2list([1,2,3,4,5,6])))

// 递归的写法
function list2Array(head){
  if(!head.next){
    return []
  }
  let value = head.value;
  let result = list2Array(head.next)
  result.unshift(value)
  return result
}



function list2Array(head){
  let result = [];
  while(head){
    result.push(head.value)
    head =head.next
  }
  return result
}