## Input 标签有最小宽度

### Input 标签默认有 size="20" 属性

如果外层div过小，input标签无法自适应长度,这是因为input标签默认有一个size="20"的属性导致


### [`MDN`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input)文档上是这样解释的

::: tip

input 控件的初始大小。以像素为单位。但当 type 属性为 text 或 password 时, 它表示输入的字符的长度。从HTML5开始, 此属性仅适用于当 type 属性为 text,search,tel,url,email,或 password；否则会被忽略。 此外，它的值必须大于0。 如果未指定大小，则使用默认值20。 HTML5 概述 "用户代理应该确保至少大部分字符是可见的", 但是不同的字符的用不同的字体表示可能会导致宽度不同。在某些浏览器中，一串带有x的字符即使定义了到x的大小也将显示不完整。
:::

### 解决方法 (推荐第一种方法，最实用)
``` css {2}
input {
    width: 100%; // 设置百分比宽度
}

input {
    width: 100%; // 设置最小宽度,需要外层设置flex布局
}

input {
    font-size: 12px; // 既然是size导致的，那就可以设置font-size去修改默认长度
}
```