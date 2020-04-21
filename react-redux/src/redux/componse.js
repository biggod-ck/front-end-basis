// 洋葱圈模型的调用
export default (...middleware)=>{
  return middleware.reduce((now,next)=>(...args)=>{
   return now(next(...args))
  })
}



