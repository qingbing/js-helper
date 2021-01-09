// 导入使用包
import { isArray, isObject, isBoolean } from "./unit";

/**
 * 复制一个变量，主要为数组或对象
 * @param {Object | Array} val 
 */
export function copy(val) {
  if (!isArray(val) && !isObject(val)) {
    return val;
  }
  let R;
  if (isArray(val)) {
    R = [];
  }
  if (isObject(val)) {
    R = {};
  }
  for (const i in val) {
    R[i] = copy(val[i]);
  }
  return R;
}

/**
 * 合并两个变量
 * @param {mixed} a 目标参数
 * @param {mixed} b 合并参数
 * @param {boolean} recursion 是否递归覆盖
 */
function _merge(a, b, recursion) {
  // 定义无效类型
  const invalidA = !a || (!isArray(a) && !isObject(a));
  const invalidB = !b || (!isArray(b) && !isObject(b));
  if (invalidA) {
    if (invalidB) {
      return null;
    }
    return b;
  }
  if (invalidB) {
    return a;
  }
  // 如果是两个数组，直接合并
  if (isArray(a) && isArray(b)) {
    return a.concat(b);
  }
  // 是否递归
  recursion = true === recursion;
  for (const i in b) {
    if (isArray(a[i]) && isArray(b[i])) {
      a[i] = a[i].concat(b[i]);
      continue;
    }
    if (a[i] && recursion) {
      // 递归合并
      a[i] = _merge(a[i], b[i], true);
      continue;
    }
    a[i] = b[i];
  }
  return a;
}

/**
 * 如果最后一个参数为boolean值，表示递归合并，否则表示单层覆盖
 */
export function merge() {
  let len = arguments.length;
  const larg = arguments[len - 1];
  let recursion = false; // 最后一个参数如果为bool，表示是否深度递归，默认false不递归
  if (isBoolean(larg)) {
    len--;
    if (true === larg) {
      recursion = true;
    }
  }
  if (0 === len) {
    return {};
  } else if (1 === len) {
    return copy(arguments[0]);
  }
  let R;
  for (let i = 0; i < len; i++) {
    R = _merge(R, copy(arguments[i]), recursion);
  }
  return R;
}
