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