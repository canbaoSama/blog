## 实现简易 Proxy 监听

``` js
const observeSet = new Set([
    function baseFun() {
        console.log("基本信息");
    }
]); // 保证没有重复方法
const observe = (fn) => {
    observeSet.add(fn);
}
const set = (target, key, value, receiver) => {
    observeSet.forEach(observer => observer()); // 将监听时需要触发的方法执行一遍
    return Reflect.set(target, key, value, receiver); // Reflect 是 ES6 为了操作对象而提供的新 API https://es6.ruanyifeng.com/#docs/reflect
}
const get = (target, propKey, receiver) => {
    console.log("get一下");
    return Reflect.get(target, propKey, receiver);
}
const observeData = data => new Proxy(data, { set, get });
const testData = observeData({ name: 'billyang', age: 18 });
const test = () => { // 监听时执行的方法
    console.log("监测中");
}
observe(test);
console.log(testData.age);
testData.age = 19;
console.log(testData.age);
```