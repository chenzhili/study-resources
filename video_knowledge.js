/**
 * 先关文章：https://www.villainhr.com/page/2017/03/31/%E5%85%A8%E9%9D%A2%E8%BF%9B%E9%98%B6%20H5%20%E7%9B%B4%E6%92%AD#Media%20Source%20Extensions
 * 时间:2017.11.21
 * 内容:对于video的一些理解整理
 * 视频播放发生的事情：视频播放会录入两个端，一个是 视频，一个是 音频；下载完成这两数据后，他会将这两者进行转换成 比特流，然后 将这个资源 按一定的顺序（编码方式）
 把它放到对应的 容器里，就生成了我们的文件，在 前端 通过 相应的 解码格式 解码 ，最后就会播放了；
            **************这里要注意一个问题，视频文件 和 文件流 是不同的东西*******************
 *视频编码格式：H.264 MEPG-4 第 2 部分 VP8 Ogg WebM
 * 视频文件格式：PS（Program Stream）: 静态文件流（就是文件已经定死了，不需要随时去下载，一般的视频文件）  TS（Transport Stream）: 动态文件流 （这个需要随时获取，直播）
 *
 *
 * 直播相关：
 * 直播协议：
 * HLS：这个是 前端支持度最高的一种协议，但是由于 需要下载 .m3u8 .ts文件，所以会造成 30 - 50 秒的延迟，能够优化就是通过 将 ts 视频流的时间控制小，文件分的细
 * RTMP：Adobe 公司开发的（算吧，是被收购过来的），那么，该协议针对的就是 Flash Video，即，FLV播放，在移动端完全不能播放
 * HTTP-FLV：算是上面的提升把 ，都是 flv 格式的，比上面那种 改进大
 *
 * 对于前端：现在出现了 MSE （Media Srouce Extentsions）,可以 对 视频流 进行操作(可以进行直播 ，时时获取 视频流)
 *
 *
 * 这里出现了 两个 插件 对于 HLS 和 FLV 两种格式播放的:
 *  HLS.js
 *  网址：https://github.com/video-dev/hls.js?files=1
 *  作用：由于在 PC 端 播放不了 .m3u8 格式 ，所以用 这个插件
 *  实现：他是通过 h5 的 MSE，将 .m3u8 格式的 转换成 mp4 格式，然后进行播放的 ，FLV 也是 同样的原理
 *
 *  FLV.js
 *  网址：https://github.com/Bilibili/flv.js
 *  作用：就是 让 PC 端 能够 播放 .flv 格式的 流
 *
 *
 * 最后实现的 用 live 这个 app 实现
 * 网址：https://github.com/chenzhili/myselfStudyWeb/tree/master/live
 * master分支：是app
 * wap分支：是 web端
 *
 *
 * 一个比较终极的插件，能够解决在移动端 同时在 android 和 ios 上都能正常播放 m3u8 格式的 插件；
 * 网址：http://www.chplayer.com/
 * 由于原声的 video 标签 对于 android 上大部分浏览器 播放不了 ，有些能够播放比如 腾讯 ；（原因是因为 ios 和 这少部分的浏览器 都自带有 播放器 所以能够播放） 
 */
