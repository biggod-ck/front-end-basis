// 测试 require.context 的使用
const cache = {};
function importAll(r) {
  r.keys().forEach((key) => {
    cache[key] = r(key);
  });
}
var a = importAll(require.context('./', true, /.js$/));
console.log(cache)
