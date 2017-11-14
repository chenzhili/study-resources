/**
 * 对于webpack的理解
 * 1、定义：webpack是一个模块系统代码管理工具，并且对于任何的语言都会以js的方式显示，编译是通过一个或多个入口文件往下遍历
 * 2、可以满足 es6、amd、common.js等一系列规范的 兼容，并且是以对象属性的方式进行配置
 * 3、自认为主要包含的内容 包含 4个：entry，output，loader，plugins四个主要模块；当然还有其他辅助模块
 * 4、为了启动一个 本地服务器，需要用到webpack-dev-server这个模块，他属于 第三项的其他辅助模块，名字：devServer
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
 *
 * 特别注意:如果 每一个 rules 里的 项里的 每一个 loader 有多个时，执行的顺序是 从右往左的
 *       // loader: "css-loader?importLoaders=1!postcss-loader!sass-loader",
        // loader执行顺序是从右到左：sass-loader -> postcss-loader -> css-loader
        注意对于 有 scss文件 转换成css 并且 用到 兼容性的 postcss-loader 时，书写的顺序："style-loader!css-loader!postcss-loader!sass-loader"

 *
 * 写法是形如：module:{
 *                      rules:[
 *                              test:/\.css$/ , // 这个是需要匹配的对应字符串的正则表达式
 *                              loader:'style-loader!css-loader', //用于需要用到的外部模块加载
 *                              exclude:/node_modules/ //不用匹配的文件或者文件夹
 *                          ]
 *                      }
 */
/**
 * plugins 以数组的方式添加
 * 定义：为了能够让webpack能够定制，补充loader中不足的地方，可以自定义插件的实例；就是指loader无法实现的其他事
 * 可以是第三方插件，可以是实现的一些可实例化插件
 */
/**
 * devServer 主要是启动一个 本地服务器
 * 安装:cnpm install webpack-dev-server --save-dev
 * 写法：
 *      devServer: {
            contentBase: path.join(__dirname,"./build"),//本地服务器所加载的页面所在的目录
            historyApiFallback: true,//不跳转
            inline: true,//实时刷新
            host:"localhost",
            port:8787,
            open:true //是否打开浏览器
        }
    bug:webpack-dev-server --inline 用npm运行本地服务器 npm run begin 会报错，不知道为啥，只有自己在命令行运行 webpack-dev-server 就是对的
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
  style-loader : 将css样式通过 style 标签注入到html文件中。（就是内联样式的方式注入，不能体现css和html的分离）
  file-loader : 指明webpack将所引入的对象，并返回一个公网能访问的url地址。
  url-loader : 将指定的limit文件大小以内转换成 base64编码，其他的都是照着file-loader来进行操作的
* */

/*
* 第三方插件plugins一些比较实用的插件
* */
/**
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
 * 
 **/
/**
 *2、extract-text-webpack-plugin：主要是用来提取 文本文件的，主要是用于 提取出 css 当做一个独立的文件，已外联方式存在
 * 安装：npm install extract-text-webpack-plugin --save-dev （当然这里有个问题，最新的版本有问题，我测试安装的是 2.1.2 版本）
 * 简单用法:
 * let cssExtract = require("extract-text-webpack-plugin");
 * module:{
 *      rules:[
 *          {
                test:/\.css$/,
                use:cssExtract.extract({
                    fallback:"style-loader",
                    use:"css-loader"   //这里要注意，这个是对 原声 的css解析的，如果是 其他预处理器要改
                }),
                exclude:"/node_modules/"
            }
 *      ]
 * }
 *
 * plugins:[
        new cssExtract("build/style.css") //这里的路径就是最后存放 提取出来的css 文件
   ]
 */
/*
* 对于比较重要的 loader
* */
/**
 *1、url-loader:主要就是对于文件的操作，他是 file-loader 的扩展，可以包括所有file-loader功能；（file-loader用法跟这个差不多）
 * 功能：可以把 limit 限制内 的图片 已dataURL的方式输出，就是base64的方式，不生成文件，超过的 已 file-loader的方式进行操作
 * 安装: npm install url-loader --save-dev
 * 简单用法：
  module:{
     rules:[
          //第一种写法
          {
            test:/\.(png|jpg|gif)$/,
            use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:100, //这里是限制的字节
                            name:"[path][name].[ext]"
                            //name表示输出的文件名规则，如果不添加这个参数，输出的就是默认值：文件哈希。加上[path]表示输出文件的相对路径与当前文件相对路径相同，加上[name].[ext]则表示输出文件的名字和扩展名与当前相同。加上[path]这个参数后，打包后文件中引用文件的路径也会加上这个相对路径
                            //outputPath表示输出文件路径前缀。图片经过url-loader打包都会打包到指定的输出文件夹下。但是我们可以指定图片在输出文件夹下的路径。比如outputPath=img/，图片被打包时，就会在输出文件夹下新建（如果没有）一个名为img的文件夹，把图片放到里面。
                           //publicPath表示打包文件中引用文件的路径前缀，如果你的图片存放在CDN上，那么你上线时可以加上这个参数，值为CDN地址，这样就可以让项目上线后的资源引用路径指向CDN了
                        }
                    }
                ]
            }
          //第二种简单的写法
          {
            test:/\.(png|jpg|gif)$/,
            loader:"url-loader?limit=1024&name=[path][name].[ext]"
          }
    ]
  }
 *注意：在name参数上 加 [path]可以 与 原资源文件一样的 访问方式；当图片小于 limit 不会生成 文件，已 dataURL的字符串方式存在
 * 引用：为了让wabpack能够 管理这种资源，需要在入口文件中引入
 *      如：import pause from "../img/pause.png";
 *          console.log(pause); //如果 小于 limit 就是 dataURL，否则为 资源路径
 */

/**
 * 2、sass-loader: 主要是用于将 sass 编写的 样式 转换成 css，浏览器能够加载的
 * 安装：npm install sass-loader --save-dev （注意：这个loader需要依赖于node-sass，所以需要先安装 npm install node-sass --save-dve）
 * 扩展：对于css，由于浏览器的不同，会有兼容性，所以需要用到 postcss-loader ,安装:npm install postcss-loader --save-dev
            现在在webpack中处理css的问题，基本都是通过一个 postcss-loader 去完成所有的处理问题。
            但是需要下载对应的 postcss 对应兼容性的 依赖包，而且需要配置对应的 postcss.config.js文件（里面全是 postcss 下载的依赖包的引入,与package.json在同一个目录）
            比如：
                 浏览器前缀和大部分兼容性问题： autoprefixer
                 flex 的兼容性问题： postcss-flexibility
                 opacity 兼容IE： postcss-opacity
                 颜色兼容性问题： postcss-color-rgba-fallback
                 压缩css文件： cssnano
    postcss.config.js的配置
                             module.exports = {
                                plugins: [
                                    // minify css
                                    require('cssnano')({
                                        preset: 'default'
                                    }),
                                    // 处理css前缀
                                    require('autoprefixer')({
                                        browserslist: [
                                            "> 1%",
                                            "last 2 versions",
                                            "Edge",
                                            "ie >= 9"
                                        ]
                                    }),
                                    // 处理flex浏览器兼容性
                                    require('postcss-flexibility'),
                                    // 处理css中rgba颜色代码
                                    require('postcss-color-rgba-fallback'),
                                    // 处理css中opacity的IE兼容性。
                                    require('postcss-opacity')
                                    ]
                             }
    webpack.config.js的配置：
                         {
                             test:/\.(css|scss|sass)$/,
                             use:cssExtract.extract({
                                 fallback:"style-loader",
                                 //一种use的写法: 一定要注意顺序
                                 use:[
                                     "css-loader",
                                     'postcss-loader',
                                     'sass-loader',
                                 ]
                                 //另一种 use的写法：一定要注意顺序
                                  use:"css-loader!postcss-loader!sass-loader"
                            }),
                             exclude:"/node_modules/"
                         }
 */