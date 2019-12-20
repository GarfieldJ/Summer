# Live2D Widget

## 特性 Feature

在网页中添加 Live2D 看板娘。兼容 PJAX，支持无刷新加载。  
Add Live2D widget to web page. Compatible with PJAX.

**警告：本项目不支持 IE 11 等老旧浏览器。**  
**WARNING: This project does not support legacy browsers such as IE 11.**

## 依赖 Dependencies

本插件需要 jQuery 和 Font Awesome 支持，请确保它们已在页面中加载，例如在 `<head>` 中加入：  
jQuery and Font Awesome is required for this plugin. You can add this to `<head>`:
```xml
<script src="https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css">
```
否则无法正常显示。（如果你的网页已经加载了 jQuery，就不要重复加载了）

## 目录结构 Files

- `waifu-tips.json` 中包含了触发条件（`selector`，选择器）和触发时显示的文字（`text`）；
- `waifu.css` 是看板娘的样式表。

## 鸣谢 Credits

代码自这篇博文魔改而来：  
https://www.fghrsh.net/post/123.html  
相比初始的版本，这个仓库增加了一些功能，并优化了提示展现机制。

更多内容可以参考：  
https://imjad.cn/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-02  
https://github.com/xiazeyu/live2d-widget.js  
https://github.com/summerscar/live2dDemo

还可以自行搭建后端api，并增加模型（需要修改的内容比较多，此处不再赘述）：  
https://github.com/fghrsh/live2d_api  
https://github.com/xiazeyu/live2d-widget-models  
https://github.com/xiaoski/live2d_models_collection

除此之外，还有桌面版本：  
https://github.com/amorist/platelet  
https://github.com/akiroz/Live2D-Widget

点击看板娘的纸飞机按钮时，会出现一个彩蛋，这来自于[WebsiteAsteroids](http://www.websiteasteroids.com)。

## 更多 More

Live2D官方网站：  
https://www.live2d.com/en/  
https://live2d.github.io

可以在官方网站下载、打包 SDK，以获取更多的功能。具体操作是：
- 点击Cubism SDK for Web，下载相关文件；
- 解压并进入目录，执行 `npm install`；
- 执行 `npm run build-sample`。

## 许可证 License

Released under the GNU General Public License v3  
http://www.gnu.org/licenses/gpl-3.0.html

## 更新 Update

2018年10月31日，由 fghrsh 提供的原 API 停用，请更新至新地址。参考文章：  
https://www.fghrsh.net/post/170.html
