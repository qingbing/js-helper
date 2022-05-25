# js 常规功能及函数包装

## version 说明
- 1.0.4
  - isEmpty : 新增函数，判断一个变量是否为空
  - each : 新增函数，数组或对象的遍历函数，可以通过回调中返回false来终止遍历
- 1.0.5
  - each : 修改函数，将 each(arr, (idx, val, arr) => {}) 改造成 each(arr, (val, idx, arr) => {})
- 1.0.6
  - dump.error : 新增函数，打印消息，在开发环境中使用 throw Error 的方式，在 生产环境中使用 console.error 的方式
- 1.0.7
  - dump.error : 修改函数的前置提示
- 1.0.8
  - dump.log : 新增函数，打印消息，在开发环境中打印控制台，其它环境忽略
- 1.0.9
  - asyncAll : 新增函数，多个 Promise 异步请求
- 1.0.10
  - 新增 sessionStorage、localStoreage 的封装
- 1.0.11
  - sessionStorage、localStoreage 修改
- 1.0.12
  - 新增 cookie 的封装
- 1.0.13
  - 修改 cookie 中错误打印，采用 dump.error 的方式
  - 增加 toJson 函数，将json字符串转换成json对象
- 1.0.14
  - 修复13中修改文件名导致的bug
- 1.0.15
  - 增加 cache(本地|浏览器缓存)
- 1.0.16
  - 增加 idempotent 幂等控制
- 1.0.17
  - 删除原有的 implode 方法，使用原生的 Array.join
  - 增加了 Array.remove(val) 方法


## 1. 在node中使用方法
```
npm install @qingbing/helper
```

## 2. 测试代码
### 2.1 unit 测试
```js
import {
  // unit
  isDev,
  isUndefined,
  isString,
  isBoolean,
  isNumber,
  isArray,
  isObject,
  isFunction
  uniqid
} from "@qingbing/helper";

// unit
console.log('isDev', isDev());
console.log('isUndefined', isUndefined(undefined));
console.log('isString', isString("12"));
console.log('isBoolean', isBoolean(true));
console.log('isNumber', isNumber('12.2'));
console.log('isArray', isArray([]));
console.log('isObject', isObject({}));
console.log('isFunction', isFunction({}));
console.log('isEmpty', isEmpty(undefined));
console.log('isEmpty', isEmpty(null));
console.log('isEmpty', isEmpty(''));
console.log('isEmpty', isEmpty([]));
console.log('isEmpty', isEmpty({}));

console.log('uniqid', uniqid());
console.log('toJson', toJson("{\"name\":\"qingbing\"}"));
```
### 2.2 array 测试
```js
import { explode } from "@qingbing/helper";
// array
console.log([1, 2, 4, 5].inArray(4));
console.log([1, 2, 4, 5].inArray(0));
console.log([1, 2, 4, 5].remove(4));
console.log([1, 2, 4, 5].remove(0));
console.log('explode', explode("i am qq", " "));

```
### 2.3 collection 测试
```js
import {
  copy,
  merge,
  col_cloumn,
  col_value,
  each,
} from "@qingbing/helper";
// collection
const arr1 = {
  "age": 19,
  "user": [
    { "name": "du" },
    { "name": "qing" },
    { "name": "bing" },
  ]
};
const arr2 = {
  sex: "gg",
  "user": [
    { "name": "1" },
    { "name": "2" },
  ]
};
console.log(arr1, arr3);

// 复制为值复制，返回一个副本
const arr3 = copy(arr1);
arr3.user[0].name = "change";
// 修改不影响原数据
console.log(arr1, arr3);

// 合并为副本合并，修改不影响原数据
const arr4 = merge(arr1, arr2);
console.log("arr4", arr4);
arr1.age = 88;
arr1.user[0].name = "change11";
// 修改不影响原数据
console.log("arr1", arr1);
console.log("arr4", arr4);

// col_cloumn 测试
const items = [
  {
    field: "name",
    default: "q",
    label: "姓名",
  },
  {
    field: "sex",
    default: "qsss",
    label: "性别",
    age: 222,
  },
];
console.log(items);
console.log("===============");
let data;
data = col_cloumn(items, "field");
console.log(data);
data = col_cloumn(items, "default", "field");
console.log(data);
data = col_cloumn(items, "age", "field");
console.log(data);
console.log("===============");


// col_value 测试
console.log(col_value(1, ["app", "ba", "xx"]));
console.log(col_value(4, ["app", "ba", "xx"], "-"));
console.log(col_value("c", { a: "app", b: "ba", c: "xx" }));
console.log(col_value("d", { a: "app", b: "ba", c: "xx" }, "--"));

// each 测试
each([1, 2], function (val, idx, arr) {
  console.log(val, idx, arr);
});
each(
  {
    name: "qing",
    sex: "sex",
  },
  function (val, idx, arr) {
    console.log(val, idx, arr);
    if (idx === "name") {
      return false; // 通过返回false实现遍历的继续
    }
  }
);

```

### 2.5 format 测试
```js
import { sprintf, replace } from "@qingbing/helper";

console.log(sprintf("我是 %s, 今年 %d 岁，基础信息: %j", "张三", 5, { "age": 44, "high": 1.12 }));
console.log(replace("我是 {name}, 今年 {age} 岁，基础信息: {info}", {
  name : "张三",
  age : 12,
  info : { "age": 44, "high": 1.1222 }
}));
```


### 2.6 assist 测试
```js
import { dump } from "@qingbing/helper";

dump.error("不存在的字段");
dump.log("username"，"sex"，"age");
```


### 2.7 promise 测试
- asyncAll 用于多个remote接口异步请求
  - promises : Promise 对象列表，可以为 Object 或 Array
  - callback : 回调处理，如果为 function，表示异步，否则同步有 return 结果
  - dataCallback : 异步请求的结果处理函数，如果为 null 表示数据不做处理，undefined 表示使用内置默认的处理函数（返回结果集中的 .data）
  
```js
import { asyncAll } from "@qingbing/helper";

// 结果集异步
asyncAll(
  {
    sexLabels: getLabels({ type: "sex" }),
    enableLabels: getLabels({ type: "enable" }),
    delLabels: getLabels({ type: "delete" }),
  },
  (data) => {
    console.log(data);
  }
);

// 结果集同步
const data = await asyncAll({
  sexLabels: getLabels({ type: "sex" }),
  enableLabels: getLabels({ type: "enable" }),
  delLabels: getLabels({ type: "delete" }),
});
console.log(data);

```

### 2.8 session 测试
```js
import { session } from "@qingbing/helper";

// 设置 sessionStorage
session.set("id", "name");
// 获取 sessionStorage
session.get("id");
// 移除 sessionStorage
session.remove("id");
// 清空 sessionStorage
session.clear();
```

### 2.9 localStorage 测试
```js
import { local } from "@qingbing/helper";

// 设置 localStorage
local.set("id", "name");
// 获取 localStorage
local.get("id");
// 移除 localStorage
local.remove("id");
// 清空 localStorage
local.clear();
```

### 2.10 cookie 测试
```js
import { cookie } from "@qingbing/helper";

// 设置 cookie
cookie.set("id", "name");
cookie.set("id", "name", 60 * 15); // 15分钟有效
cookie.set("id", "name", new Date().setTime(new Date().getTime() + 60 * 15 * 1000)); // 15分钟有效
// 获取 cookie
cookie.get("id");
// 移除 cookie
cookie.remove("id");
// 清空 cookie，目前不支持，会控制台提示
// cookie.clear();
```

### 2.11 cache 测试
```js
// 封装:cache.js
// 导入包和方法
import { local, cache } from "@qingbing/helper";
/**
 * 设置缓存具体实现位置，可为session或local，或者自行封装，自行封装需要实现
 *    1. set(key, value)
 *    2. get(key)
 *    3. remove(key)
 *    4. clear()
 */
cache.setStorage(local);
// 导出缓存
export default cache;


// 使用封装
// 导入包和方法
import cache from "./cache";
// 设置
async function getData(){
  const res = await cache.get(
    `local.cache.xxxxx`,
    () => {
      return {
        key1: axios(...),
        key2: axios(...),
        key3: axios(...),
      };
    },
    7200
  );
  console.log(res);
}
```

### 2.12 idempotent 幂等控制
```js
import { idempotent } from "@qingbing/helper";
// 使用
idempotent
  .setRunningMsg('使用中')
  .setRunningMsg('使用中')
  .run("uniqidKey", (cb) => {
      // 逻辑方法写这里
      // cb 为关闭幂等回调，如果不回调，将永远退不出幂等
      // ... real logic coding
      cb();
    },
    obj // 逻辑方法中， this 代表的this指针，非必填字段
  );
```
