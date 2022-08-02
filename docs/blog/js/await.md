---
pageClass: blog-catalog
---

## async/await 语法分析，async 内多个await 的执行顺序
<p class="date">2020/06/20 15:41:20 
<span id="/blog/js/await.html" class="leancloud_visitors">
    <i class="shni shn-eye-fill" />
    <i class="leancloud-visitors-count"></i>
</span>
</p>

### 问题描述
今天遇到一个问题，<code class="default">forEach 中 await</code> 的执行顺序和预想的同步执行顺序不一致，后面查了资料才知道 <code class="default">await</code> 同样有 <span class="text-green">串行执行</span> 和 <span class="text-green">并发执行</span>，所以打算了解一下 <code class="default">async/await</code> 的语法

### 基本用法
* <code class="default">async/await</code> 可以使用同步代码的写法，实现异步的操作；
* <code class="default">async</code> 函数返回一个 <code class="default">Promise</code> 对象；
* <code class="default">await</code> 只能在 <code class="default">async</code> 方法中使用，遇到 <code class="default">await</code> 时就会先返回，等到异步操作完成，再接着执行后续语句。
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
::: tip 运行结果
![图片](https://s2.loli.net/2022/07/27/SyGDe8ETFPX1p3f.png)
:::

### 抛出问题：如果使用 <code class="default">setTimeOut</code> 模拟异步呢，执行顺序是啥
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
::: tip 运行结果
![图片](https://s2.loli.net/2022/07/27/Su8NiXaMAIpwyLc.png)
:::

这个时候，输出顺序就和前面的 <code class="default">Promise</code> 不一致了<br/>
那么问题来了，为什么会导致这样的结果呢，不是说好 <code class="default">async/await</code> 能够实现同步写法吗？

### 对 <code class="default">await</code> 的解释
带着疑惑，我找到了这样的解释：<br>
> **正常情况下，await 命令后面是一个 Promise 对象，这个时候它会阻塞后面的代码，等着 Promise 对象返回 resolve 并获取 resolve 的值；如果不是 Promise 对象，则直接返回对应的值**

也就是说，await 等待的结果分两种情况：<code class="default">Promise</code> 和<code class="default">非 Pormise</code>。只有在等待 <code class="default">Promise</code> 的时候，才会阻塞代码，否则就是正常的 JS 代码执行顺序，相当于将 <code class="default">printTest</code> 中的代码直接插入到了 <code class="default">await printTest</code> 那里。

### 那有多个 await 呢
如果一个 <code class="default">async</code> 中要执行多个 <code class="default">await</code> 呢，应该怎么办？<br>
这个时候也要分两种情况：

* 后一个 <code class="default">await</code> 需要依赖前一个的结果，既 <span class="text-green">串行执行</span>
``` js
const test1 = async () => {
    new Promise((resolve) => {
        console.log('test1');
        resolve();
    }).then(() => {
        console.log('test1 then');
    });
}
const test2 = async () => {
    new Promise((resolve) => {
        console.log('test2');
        resolve();
    }).then(() => {
        console.log('test2 then');
    });
}

// 第一种写法，直接按顺序写就行了，执行完 test1 才会去执行 test2
const test = async () => {
    const res = await test1();
    await test2(res)
}

// 第二种写法，如果要循环调用，则采用 for 循环可以
async function test() {
    const funcs = [test1, test2];
    for (let fun of funcs) {
        await fun();
    }
}
```
::: tip 运行结果
![图片](https://s2.loli.net/2022/07/27/PfClRMbEyDwu6Fs.png)
:::

* 内部的 <code class="default">await</code> 是独立的异步操作（即互不依赖），既 <span class="text-green">并发执行</span>
``` js
const test1 = async () => {
    new Promise((resolve) => {
        console.log('test1');
        resolve();
    }).then(() => {
        console.log('test1 then');
    });
}
const test2 = async () => {
    new Promise((resolve) => {
        console.log('test2');
        resolve();
    }).then(() => {
        console.log('test2 then');
    });
}

// 第一种写法,采用 Promise.all()并发执行
async function test() {
    const [test1Res, test2Res] = await Promise.all([test1(), test2()]);
}

// 第二种写法，采用 forEach 循环
async function test() {
    const funcs = [test1, test2];
    funcs.forEach(async (fun) => {
        await fun();
    });
}

// 第三种写法
async function test() {
    let test1Pro = test1();
    let test2Pro = test2();
    let foo = await test1Pro;
    let bar = await test2Pro;
}
```
::: tip 运行结果
![图片](https://s2.loli.net/2022/07/27/PUIku4qRyV2BlC8.png)
:::

### 如果多个 <code class="default">await</code>, 前面的 <code class="default">await</code> 报错呢
由于 <code class="default">await</code> 命令后面的 <code class="default">Promise</code> 对象，运行结果可能是 <code class="default">rejected</code>, 所以如果某个 <code class="default">await</code> 出错，就会导致后续的所有代码都不能执行，所以这个时候我们需要将 <code class="default">await</code> 用 <code class="default">try/catch</code> 包裹起来，包裹后，<code class="default">try/catch</code> 后面的代码就能够正常运行<br>
多个 <code class="default">await</code> 串行执行时，如果不想因为前面的代码报错而不执行，那么也能用 <code class="default">try/catch</code> 包裹，即使前面的 <code class="default">await</code> 报错，也能保证后续的 <code class="default">await</code> 继续执行
> 虽然串行执行一般依赖前面 await 返回的数据，但是有时候还是会有无数据的处理方式
``` js
const test1 = async () => {
    new Promise((resolve, reject) => {
        console.log('test1');
        reject();
    }).then(() => {
        console.log('test1 then');
    });
}
const test2 = async () => {
    new Promise((resolve) => {
        console.log('test2');
        resolve();
    }).then(() => {
        console.log('test2 then');
    });
}

async function test() {
  const funcs = [test1, test2];
  for (let i = 0; i < funcs.length; i++) { // 串行执行，前面的 await 不影响后续 await
    try {
      await funcs[i]();
    } catch(err) {}
  }
  console.log("这里是后续代码");
}
```
::: tip 运行结果
![图片](https://s2.loli.net/2022/07/27/R5VYtGSk7XiU96z.png)
:::

<base-valine />
<el-backtop :visibility-height="0"></el-backtop>