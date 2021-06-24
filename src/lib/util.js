/**
 * 判断当前环境是否是 development 环境
 */
export function isDev() {
  return process.env.NODE_ENV === 'development';
}

/**
 * 判断一个变量是否是 string 类型
 * @param {mixed} v
 * @return {boolean}
 */
export function isString(v) {
  return typeof v === "string";
}

/**
 * 判断一个变量是否是 undefined 类型
 * @param {mixed} v
 * @return {boolean}
 */
export function isUndefined(v) {
  return typeof v === "undefined";
}

/**
 * 判断一个变量是否是bool类型
 * @param {mixed} v
 * @return {boolean}
 */
export function isBoolean(v) {
  return typeof v === "boolean";
}

/**
 * 判断一个变量是否是数字类型
 * @param {mixed} v
 * @return {boolean}
 */
export function isNumber(v) {
  const _t = typeof v;
  if ("number" === _t) {
    return true;
  }
  if ("string" !== _t) {
    return false;
  }
  return parseFloat(v) == v;
}

/**
 * 判断一个变量是否是数组
 * @param {mixed} v
 * @return {boolean}
 */
export function isArray(v) {
  return Object.prototype.toString.call(v) === "[object Array]";
}

/**
 * 判断一个变量是否是Object
 * @param {mixed} v
 * @return {boolean}
 */
export function isObject(v) {
  return Object.prototype.toString.call(v) === "[object Object]";
}

/**
 * 判断一个变量是否是函数
 * @param {mixed} v
 * @return {boolean}
 */
export function isFunction(v) {
  return typeof v === "function";
}

/**
 * 判断一个变量是否不为空
 * @param {mixed} v
 */
export function isEmpty(v) {
  if (isUndefined(v) || null === v) {
    return true;
  }
  if (isString(v)) {
    return '' === v.trim();
  }
  if (isArray(v)) {
    return (0 === v.length);
  }
  if (isObject(v)) {
    return (0 === Object.keys(v).length);
  }
  return false;
}

/**
 * 生成唯一的UUID
 */
export function uniqid() {
  var d = new Date().getTime();
  var id = 'xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return id;
}

/**
 * 将变量（json字符串）转换成json对象
 */
export function toJson(val) {
  if (isObject(val) || isArray(val)) {
    return val;
  }
  try {
    return JSON.parse(val);
  } catch (error) {
    return null;
  }
}
