// 洋葱圈模型的调用 (...args)=>a(b(c(d(...args))))
export default (...middleware) => {
  return middleware.reduce((now, next) => (...args) => {
    return now(next(...args));
  });
};
