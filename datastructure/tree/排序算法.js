function mergeSort(arr){
  if(arr.length < 2){
    return arr
  }
  let mid = arr.length >> 1
  let leftArr = mergeSort(arr.slice(0,mid));
  let rightArr = mergeSort(arr.slice(mid));
  let result = []
  while(leftArr.length && rightArr.length){
    if(leftArr[0] > rightArr[0]){
      result.push(rightArr.shift())
    }else{
      result.push(leftArr.shift())
    }
  }
  result.push(...leftArr,...rightArr)
  return result
}

// 优化归并排序的代码 去除 每次递归的时候创建左右数组 去除数组的shift操作
console.log(mergeSort([9,8,7,15,125]))

function quickSort(arr){
  if(arr.length < 2){
    return arr
  }
  let middle = arr.length >> 1;
  let middlData = arr[middle]
  let leftSmallArr = []
  let rightBigArr = []
  let middleArr = []
  for(var data of arr){
    if(data < middlData){
      leftSmallArr.push(data)
    }else if(data > middlData){
      rightBigArr.push(data)
    }else{
      middleArr.push(data)
    }
  }
  return [...quickSort(leftSmallArr),...middleArr,...quickSort(rightBigArr)]
}

console.log(quickSort([9,8,7,15,125,1,2,1,1]))