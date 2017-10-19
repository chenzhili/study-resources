/**
 * 对于webpack的理解
 * 1、定义：webpack是一个模块系统代码管理工具，并且对于任何的语言都会以js的方式显示，编译是通过一个或多个入口文件往下遍历
 * 2、可以满足 es6、amd、common.js等一系列规范的 兼容，并且是以对象属性的方式进行配置
 * 3、自认为主要包含的内容 包含 4个：entry，output，loader，plugins四个主要模块；当然还有其他辅助模块
 */
/**
 *entry
 * 定义：就是当前项目的入口文件
 * 能够有三种方式：字符串、数组、对象，但是为了可扩展性，用对象是最好的（对应的key能够当做output输出口的文件的路径存在，这样就上输出的文件可以灵活的在不同的位置）
 */
/**
 *output
 * 定义：代码输出文件
 * 就是通过webpack编译后输出，主要的两个属性，path(文件输出的位置),filename(输出的文件名);）
 * 生成文件时候的名字：
 * filename:[name][hash][id][chunkhash][单个入口文件可以写死文件名].js
 * (分别代表：name：为入口文件的文件名字，hash和chunkhash都是唯一的hash值,id:为chunk内部的id)
 *
 *
 * 其他属性的运用：
 * publicPath：这个属性主要是用于有其他外部资源或者是cdn上的资源文件的引用地址
 */
/**
 *loader
 * 定义：就是对对应的不同的文件，包括css、sass，less、typescript等转换成对应的js文件进行管理
 * 写法是形如：module:{
 *                      rules:{
 *                              test:/\.css$/ , // 这个是需要匹配的对应字符串的正则表达式
 *                              loader:'style-loader!css-loader', //用于需要用到的外部模块加载
 *                              exclude:/node_modules/ //不用匹配的文件或者文件夹
 *                          }
 *                      }
 */
/**
 * plugins 以数组的方式添加
 * 定义：为了能够让webpack能够定制，补充loader中不足的地方，可以自定义插件的实例；就是指loader无法实现的其他事
 * 可以是第三方插件，可以是实现的一些可实例化插件
 */
/*
对于loader和plugin之间关系的解释
* 以babel为例，当webpack发现模块名称匹配test中的正则/js[x]?的时候。

 它会将当前模块作为参数传入babel函数处理，babel([当前模块资源的引用])。

 函数执行的结果将会缓存在webpack的compilation对象上，并分配唯一的id 。

 以上的这一步，非常非常关键。唯一的id值决定了webpack在最后的编译结果中，是否会存在重复代码。
 而缓存在compilation对象上，则决定了webpack可以在plugin阶段直接拿取模块资源进行二度加工。
* */

/*
* 对于loader中加入的插件，一般感觉是加了 -loader 的都是 loader上能够直接引入的，不用加载到 plugin 中
* css-loader : 解析css文件中的 import 和 require ，并处理他们。
  style-loader : 将css样式通过 style 标签注入到html文件中。
  file-loader : 指明webpack将所引入的对象，并返回一个公网能访问的url地址。
  url-loader : 将文件转换成 base64编码。
* */

/*
* 第三方插件plugins一些比较实用的插件
*
* 1、html-webpack-plugin ：主要功能就是生成HTML文件，并且可以根据 入口文件 来进入相应的文件
* 安装：npm install html-webpack-plugin --save-dev
* 简单的用法：
* let extractHtml = require("html-webpack-plugin");
* plugins:[
*   new extractHtml({
*    filename:path.join(__dirname,"public/main.html"), //对应生成的html的文件位置
     template:path.join(__dirname,"public/index.html"), //可以选择一个项目中存在的html作为模板进行生，当然这里不需要去加载link，script标签，因为入口文件会被自动加入
     inject:"body", //入口文件引入的具体位置
     minify:{
         removeComments:true, //是否删除注释
         collapseWhitespace:false //是否删除多余的空格
     }
*   })
* ]
* */