var isType = function (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  };
};
var Type = {};
for (var i = 0, type; (type = ['Array', 'String', 'Number'][i++]); ) {
  (function (type) {
    Type[`is${type}`] = function (...args) {
      return isType(type)(...args);
    };
  })(type);
}
console.log(Type.isArray([1, 2, 3]));

// AOP方法的实现 实现一个函数的after 与 before
Function.prototype.before = function (beforeFn) {
  var _self = this; // 保留当前的函数
  return function () {
    beforeFn.apply(this, arguments); // 修正this
    return _self.apply(this, arguments);
  };
};
Function.prototype.after = function (afterFn) {
  var _self = this;
  return function () {
    var ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  };
};
var func = function () {
  console.log(2);
};
func
  .before(function () {
    console.log(1);
  })
  .after(function () {
    console.log(3);
  })();

// 柯理化函数
var curring = function (fn) {
  var args = [];
  return function c() {
    if (arguments.length === 0) {
      return fn.apply(this, args);
    } else {
      [].push.apply(args, arguments);
      return c;
    }
  };
};
var coast = (function () {
  var money = 0;
  return function () {
    for (var i = 0, l = arguments.length; i < l; i++) {
      money += arguments[i];
    }
    console.log(money)
    return money;
  };
})();
var coast = curring(coast);
coast(200)(300)(300)();


// 反柯理化
