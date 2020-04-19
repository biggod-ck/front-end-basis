// 位置可以是多个条件的结合体
// 第一个条件：不是单词的边界 第二个条件：3的整数倍个数字加单词边界的位置 两个条件的组合就可以确定到目标了
// \B表示一个位置 (?!|B)表示不是|B这个位置
// (?!^) 不是开始的位置
let reg = /\B(?=(\d{3})+\b)/g //将位置理解为一个空字符串。
let num = `123456789`
console.log(num.replace(reg,','))

// 密码长度 6-12 位，由数字、小写字符和大写字母组成，但必须至少包括 2 种字符
let password = / ((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z]))^[0-9a-z]{6,12}/
