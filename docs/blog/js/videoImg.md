---
pageClass: blog
---

## 上传视频生成视频封面图展示
<p class="date">2020/06/20 15:41:20 
<span id="/blog/js/videoImg.html" class="leancloud_visitors">
    <i class="shni shn-eye-fill" />
    <i class="leancloud-visitors-count"></i>
</span>
</p>

### 问题描述
最近在开发过程中，遇到这样的需求：上传视频并在同一页面的多个模拟机型上展示并播放该视频。
这就导致了一个问题，我们这些视频虽然是同一个，但是由于加载视频的请求是在同一时间发出的，所以会导致加载多次视频，加载的数据翻倍。
所以需要思考如何减少视频的加载，保证后续其它的视频都能够走缓存。由于不知道上传的视频加载需要多长事件、所以延迟其它机型的视频加载显然不太现实，所以经过思考，不如换成封面来替代视频，后续点击播放的时候再赋值src。

##### 利用canvas形成视频封面
``` JS
const video = document.getElementById('videoPlay');
const canvas = document.createElement('canvas');
canvas.width = video.videoWidth; // 这里的宽高可以自己设置决定，建议按照实际需求缩减
canvas.height = video.videoHeight;

const ctx = canvas.getContext('2d');
ctx.drawImage(video, 0, 0 canvas.width, canvas.height);
ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

// 不要用png格式，png格式图片太大了；质量可以调整为更小，看实际情况
// 直接形成图片，贴到img标签
// toDataURL()方法会返回一个包含图片展示的data URL，是一个UTF-16字符串
const imageUrl = canvas.toDataURL('image/jpeg', 0.5);

// 上传图片，根据返回值获取图片url贴到img标签
// toBlob()方法创建Blob对象，在Web中，Blob类型的对象表示不可变的类似文件对象的原始数据
// 通俗点说，就是Blob对象是二进制数据，但它是类似文件对象的二进制数据
// 因此可以像操作File对象一样操作Blob对象，实际上，File继承自Blob
// File对象是特殊类型的Blob,所以也继承了Blob特有的方法和属性,同时又有自己独特的属性和方法
canvas.toBlob((blob) => {
    const fd = new FormData();
    fd.append('file', blob, `xxx.jpeg`);
    // 形成的封面图上传，获取图片url展示
}, 'image/jpeg', 0.5); 

canvas.remove();
```

将video标签放入canvas,然后利用drawImage生成封面图，**这个video标签必须要有首帧数据**。换句话说，页面上的video标签是存在且已经加载出第一帧的页面，我们的封面图其实就是第一帧的视频。

***1. canvas数据来源：加载视频的第一帧数据***
``` js
<video :poster="poster" :src="src" controls @loaddeddata="loadVideo"></video>
```
将获取到的视频url贴到一个video标签中，通过video标签的[`loadeddata`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/loadeddata_event "loadeddata")事件，在加载了第一帧后立刻形成封面图，然后贴到所有video标签的poster属性上。

***2. canvas数据来源：本地视频数据***
```
const localUrl = URL.createObjectURL(file);
```

以ant-design 的upload组件为例，上传视频后能获取到file信息，然后根据**URL.createObjectURL()**方法获取到本地视频播放地址，贴到video中然后利用canvas生成封面，然后贴到所有video标签的poster属性上。

**URL.createObjectURL()** 获取的url对视频文件的引用会一直存在内存中，只有在页面触发了unload时或者使用 **URL.revokeObjectURL()** 释放后才会从内存清除。所以要使用本地视频数据时，在生成封面图后一定要通过 **URL.revokeObjectURL()** 释放。
```
// vue3
const localUrl = ref('');
localUrl.value = URL.createObjectURL(file);
URL.revokeObjectURL(localUrl.value)
```

<base-valine />
<el-backtop :visibility-height="0"></el-backtop>