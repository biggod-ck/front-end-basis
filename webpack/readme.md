#### loader 执行顺序
1. 从下到上 从右向左
2. loader 写法 [] / {} / ''

- .less less less-loader
- .scss sass-loader node-sass
- .stylus stylus stylus-loader
- 上线分离样式 mini-css-extract-plugin 

#### 图片处理 url-loader file-loader 
- `url-loader `里面的配置 绝大部分是file-loader的配置

#### 复杂的JS处理
- 基于babel7的处理
- @babel/core @babel/preset-env(包含了es6转换为es5的集合) bable-loader(联系webpack与babel，调用core，core再调用presets-env)
- @babel其实就是一个作用域，将相关的包都安装在里面
- .babelrc presets 从下往上执行 plugins 从上往下执行
- 装饰器语法 多个装饰器执行顺序是，由近到远,type1(type2(A))。  装饰类的时候，参数只有构造函数。装饰属性（原型对象,key,对象描述对象，initializer） 方法（原型对象，）静态（类、属性）对应构造函数，因为这个时候类还未创建出来