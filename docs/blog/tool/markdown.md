---
pageClass: blog-catalog
---

## MARKDOWN 语法大全整理（原生）
<p class="date">2020/06/20 15:41:20 
<span id="/blog/tool/markdown.html" class="leancloud_visitors">
    <i class="shni shn-eye-fill" />
    <i class="leancloud-visitors-count"></i>
</span>
</p>

发现自己老是忘记一些 <code class="default">markdown</code> 语法，避免百度，还是自己记录一下吧😀😀😀， <span class="text-green">如果有遗漏欢迎补充</span>

### 直接看大全
``` js
[[toc]]                         // 添加目录
 
# Heading level 1               // 标题一
## Heading level 2              // 标题一
### Heading level 3             // 标题一
#### Heading level 4            // 标题一
##### Heading level 5           // 标题一
###### Heading level 6          // 标题一

**粗体**
__粗体__
*斜体*
_斜体_
***粗体和斜体***
___粗体和斜体___

> 这是一个块                     // 特色的块，用作特殊提示
>>> 多层块引用

* 无序列表1
* 无序列表2
+ 无序列表3
+ 无序列表4
- 无序列表5
- 无序列表6

1. 有序列表1
2. 有序列表2
3. 有序列表3

// 先在我就是在代码块里嵌入代码块了
    ``` js                      
    这是一个代码块
    ```

``Use `code` in your Markdown file.``    // 表示为代码的单词或短语

***                              // 水平线
---                              // 水平线
_________________                // 水平线
       
[有机猴灬残暴Sama的博客](www.canbaoSama.site "有机猴灬残暴Sama加油")  // 链接带标题
<https://markdown.p2hp.com>      // 网址
<fake@example.com>               // 电子邮件地址

![图片](https://s2.loli.net/2022/06/23/M1P7YozxsNnklfD.jpg "图片标题")  // 图片带 alt 和 title

```

### 顺便看看运行结果
#### 标题
共计6个标题，每往下一级就加一个 #
``` markdown
# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6
```

#### 目录
对的，只要加一行这个代码就行，自动识别文档中的标题，也就是上面标题部分 # 号开头的标题
``` markdown
[[toc]]
```

#### 粗体和斜体
``` markdown
**粗体**
__粗体__
*斜体*
_斜体_
***粗体和斜体***
___粗体和斜体___
```

#### 块引用
比如下面的运行结果就是 vuepress 里的提示块，块引用就是加了一些样式的 div
```
> 这是一个块
>>> 多层块引用
```
::: tip 运行结果
> 这是一个块
>>> 多层块引用
:::

#### 列表
##### 无序列表
``` markdown
* 无序列表1
* 无序列表2
+ 无序列表3
+ 无序列表4
- 无序列表5
- 无序列表6
```
::: tip 运行结果
* 无序列表1
* 无序列表2
+ 无序列表3
+ 无序列表4
- 无序列表5
- 无序列表6
:::
##### 有序列表
vuepress 似乎不识别，所以这边就先不放运行结果了
``` markdown
1. 有序列表1
2. 有序列表2
3. 有序列表3
```

#### 代码
##### 代码块
js 代表的是代码语言，可以替换成其它的，比如 markdown
``` markdown
    ``` js
    这是一个代码块
    ```
```
##### 转义刻度线
如果要表示为代码的单词或短语包含一个或多个刻度线，可以通过将单词或短语括在双刻度线（``）中来对其进行转义。
``` markdown
``Use `code` in your Markdown file.``
```
::: tip 运行结果
``Use `code` in your Markdown file.``
:::

#### 水平线
要创建水平线***，请单独在一行上使用三个或更多的星号（），破折号（---）或下划线（___）。
``` markdown
***
---
_________________
```
::: tip 运行结果
***
---
_________________
:::

#### 链接
``` markdown
[有机猴灬残暴Sama的博客](www.canbaoSama.site)
```
::: tip 运行结果
[有机猴灬残暴Sama的博客](https://www.canbaoSama.site)
:::
##### 添加标题
``` markdown
[有机猴灬残暴Sama的博客](www.canbaoSama.site "有机猴灬残暴Sama加油")
```
::: tip 运行结果
[有机猴灬残暴Sama的博客](https://www.canbaoSama.site "有机猴灬残暴Sama加油")
:::
##### 网址和电子邮件地址
``` markdown
<https://markdown.p2hp.com><br>
<fake@example.com>
```
::: tip 运行结果
<https://markdown.p2hp.com><br>
<fake@example.com>
:::

#### 图片
``` markdown
![图片](https://s2.loli.net/2022/06/23/M1P7YozxsNnklfD.jpg "图片标题")
```
::: tip 运行结果
![图片](https://s2.loli.net/2022/06/23/M1P7YozxsNnklfD.jpg "图片标题")
:::


<base-valine />
<el-backtop :visibility-height="0"></el-backtop>