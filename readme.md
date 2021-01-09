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
  isObject
} from "@qingbing/helper";

// unit
console.log('isDev', isDev());
console.log('isUndefined', isUndefined(undefined));
console.log('isString', isString("12"));
console.log('isBoolean', isBoolean(true));
console.log('isNumber', isNumber('12.2'));
console.log('isArray', isArray([]));
console.log('isObject', isObject({}));
```
### 2.2 array 测试
```js
import {
  // array 
  inArray,
  explode,
  implode
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
  merge
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
```

