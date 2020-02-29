
export default {
  add(num){
    return {
      type:'ADD2',
      num,
    }
  },
  minus(num){
    return {
      type:'MINUS2',
      num
    }
  },
  promiseAdd(action){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(action)
      },1000)
    })
  }
}