function array2tree(arr,start=0){
  if(!arr){
    return null
  }
  if(start > arr.length - 1){
    return null
  }
  if(!arr[start]){
    return null
  }
  let tree = {
    value:arr[start],
    left:null,
    right:null
  }
  tree.left = array2tree(arr,2 * start + 1) 
  tree.right = array2tree(arr,2 * start + 2)
  return tree
}
// 树转为数组 空的索引替换为 null
function tree2array(tree,rootpos=0,arr=[]){
  if(!tree){
    return null
  }

  arr[rootpos] = tree.value
  tree2array(tree.right,2*rootpos + 2,arr)
  tree2array(tree.left,2*rootpos + 1,arr)
  return arr
}



// LeetCode 版本的数组转换为树 为null的就没有下一级树 
// 思路就是 一个数组来存取值为非空的树节点，每次都取数组里面的第一项来构造一颗完整的树，构造成功就从节点数组里面移除。
// leftUsed 就是用来判断当前的节点是否具有了左右节点
function array2treeLC(arr){
  if(!arr){
    return null
  }
  let node = {
    val:arr[0],
    left:null,
    right:null
  }
  let nodeArr = [node]
  let leftUsed = false
  for(var i = 1 ; i < arr.length ; i++){
    let insideNode = {
      val:null,
      left:null,
      right:null
    }
    if(arr[i]){
      insideNode = {
        val:arr[i],
        left:null,
        right:null
      }
      nodeArr.push(insideNode)
    }else{
      insideNode = null
    }
    if(!leftUsed){
      nodeArr[0].left = insideNode 
      leftUsed = true
    }else{
      nodeArr[0].right = insideNode
      leftUsed = false
      nodeArr.shift()
    }
  }
  return node
}

// 上面函数的反函数 
function tree2ArrayLc(tree){
  if(!tree){
    return []
  }
  let arr = [tree]
  let result = []
  while (arr.length) {
    if(arr[0]){
      result.push(arr[0].val)
      arr.push(arr[0].left,arr[0].right);
    }else{
      result.push(null)
    }
    arr.shift()
  }
  return result
}

// 树的遍历 先[ 根 左  右 ]  中[ 左 根 右 ]  后[ 左 右 根 ] 
function preOrderTraverse(tree){
  if(tree){
    console.log(tree.val)
    preOrderTraverse(tree.left)
    preOrderTraverse(tree.right)
  }
}
function inOrderTraverse(tree){
  if(tree){
    inOrderTraverse(tree.left)
    console.log(tree.val)
    inOrderTraverse(tree.right)
  }
}
function postOrderTraverse(tree){
  if(tree){
    postOrderTraverse(tree.left)
    postOrderTraverse(tree.right)
    console.log(tree.val)
  }
}