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
- 解析react语法 @babel/preset-react 就可以使用了。 要配合ts的话，需要再预设下面添加 @babel/preset-typescript，再webpack里面配置一下.(js|tsx)$使用babel来转换， 还需要一个 typescript init 申明一个tsconfig.js 来配置ts的规则，presets的顺序是从下到上的执行

- 解析Vue 只需要配置 vue-loader vue-template-compile，vue-loader 会去调用vue-template-compile去编译， 配合ts的话 谷歌一下 vue.shims.d.ts 的申明文件。让引入.vue文件被认定为是一个Vue的模块

### webpack优化部分
1. 删除无效的css代码 `npm i -D extract-text-webpack-plugin`
2. 图片优化 image-webpack-loader
3. 外部的不打包，例如全局cdn引入了jquery(就是html里面以script的标签形式加载了jquery)，我们再页面里面再使用import $ from 'jquery'就会出打包jquery的情况，怎么避免呢，配置externals:{
  'jquery':'$' // 意思就是 import $ from 'jquery' 这句话就不打包
} 可以使用 webpack-cdn-plugin 这个包配合使用,查看官网实例，使用这个配合html-webpack-plugin 可以不用配置 externals 也可以达到忽略打包 jquery的目的 

- tree-shaking scope-hoisting 
  1. package.json  配置sideEffects:false 不应用副作用，可以删除导入了没有使用的包，但是存在问题，引入css的会出问题。可以使用 require('./***.css) 的样式来引用css，因为只针对es6的模块。但是这种写法有点丑陋,使用sideEffects:[ "**/*.css" ],这样css就不会被移除了

- dll 动态链接库


