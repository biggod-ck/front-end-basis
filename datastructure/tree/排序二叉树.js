// 对树进行中序遍历 得到的就是一个有序的序列
function binarySortTree(bstTree, val) {
  if(!bstTree){
    return {
      val,
      left:null,
      right:null
    }
  }else{
    if(bstTree.val < val){
      bstTree.right = binarySortTree(bstTree.right,val)
    }else{
      bstTree.left = binarySortTree(bstTree.left,val)
    }
  }
  return bstTree
}

// 中序遍历的代码
function inOrderTraverse(tree,fn){
  if(tree){
    inOrderTraverse(tree.left,fn)
    fn(tree.val)
    inOrderTraverse(tree.right,fn)
  }
}

function bstSort(array){
  // for (const data of array) {
  //   tree = binarySortTree(tree,data) // 这个就是reduce的特性
  // }
  let tree = array.reduce(binarySortTree,null)
  console.log(tree)
  let result = []
  inOrderTraverse(tree,(v)=>result.push(v))
  console.log(result)
}
