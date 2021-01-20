# js 常规功能及函数包装

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

console.log('uniqid', uniqid());
```
### 2.2 array 测试
```js
import {
  // array 
  inArray,
  explode,
  implode,
} from "@qingbing/helper";
// array
console.log('inArray', inArray(4, [1, 2, 4, 5]));
console.log('explode', explode("i am qq", " "));
console.log('implode', implode(["i", "am qq"], "___"));

```
### 2.3 collection 测试
```js
import {
  copy,
  merge,
  col_cloumn,
  col_value,
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
