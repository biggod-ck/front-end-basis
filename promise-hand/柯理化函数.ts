// 柯理化函数通用函数
let add = function(a, b, c, d, e, f) {
  return a + b + c + d + e + f;
};

// 通用函数转换为柯理化函数
const curring = function(fn: Function, arr: any[] = []) {
  let length: number = fn.length;
  return (...args: any[]) => {
    arr = arr.concat(args);
    if (arr.length < length) {
      return curring(fn, arr);
    }
    return fn(...arr);
  };
};

let add2 = curring(add);
console.log(add2(1)(2, 3)(4, 5)(7));

type Types = 'Number' | 'String' | 'Boolean';
const checkType = (type: Types, content: string): boolean => {
  return Object.prototype.toString.call(content) === `[object ${type}]`;
};
let types = ['Number', 'String', 'Boolean'];
interface utilsTypeArr  {
  'isNumber':string
  'isString':string
  'isBoolean':string
}
type utilsType =  {
  [key in keyof utilsTypeArr] : Function
}
let utils: utilsType = {} as utilsType;
types.forEach(item => {
  utils[`is${item}`] = curring(checkType)(item);
});

console.log(utils.isBoolean(false))


