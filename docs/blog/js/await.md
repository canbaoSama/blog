---
pageClass: blog
---

## async/await 语法分析，async 内多个await 的执行顺序
<p class="date">2020/06/20 15:41:20 
<span id="/blog/js/await.html" class="leancloud_visitors">
    <i class="shni shn-eye-fill" />
    <i class="leancloud-visitors-count"></i>
</span>
</p>

### 问题描述
今天遇到一个问题，forEach 中 await 的执行顺序和预想的同步执行顺序不一致，后面查了资料才知道 await 同样有 **串行执行** 和 **并发执行**，所以打算分析一下 async/await 的语法

##### 基本用法
* async/await 可以使用同步代码的写法，实现异步的操作；
* async 函数返回一个 Promise 对象；
* await 只能在 async 方法中使用，遇到 await 时就会先返回，等到异步操作完成，再接着执行后续语句。
``` js
const printTest = async () => {
    new Promise((resolve) => {
        console.log('执行异步方法1');
        resolve();
    }).then(() => {
        console.log('执行异步方法2');
    });
}
const test = async () => {
    await printTest();
    console.log("执行后续代码");
}
test();
```

##### 抛出问题：如果使用 setTimeOut 模拟异步呢，执行顺序是啥
``` js
const printTest = async () => {
    console.log('执行异步方法1');
    setTimeout(() => {
        console.log('执行异步方法2');
    }, 500);
}
const test = async () => {
    await printTest();
    console.log("执行后续代码");
}
test();
```
这个时候，输出顺序就和前面的 promise 不一致了<br/>
那么问题来了，为什么会导致这样的结果呢，不是说好 async/await 能够实现同步写法吗？

##### 对 await 的解释
带着疑惑，我找到了这样的解释：<br>
> **正常情况下，await 命令后面是一个 Promise 对象，这个时候它会阻塞后面的代码，等着 Promise 对象返回 resolve 并获取 resolve 的值；如果不是 Promise 对象，则直接返回对应的值**

也就是说，await 等待的结果分两种情况：Promise 和非 Pormise。只有在等待 Promise 的时候，才会阻塞代码，否则就是正常的 JS 代码执行顺序，相当于将 printTest 中的代码直接插入到了 await printTest 那里。


<base-valine />
<el-backtop :visibility-height="0"></el-backtop>