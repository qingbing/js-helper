// 导入使用包
import { isUndefined, isArray, isObject, isBoolean, isFunction } from "./unit";

/**
 * @param {mixed} vals Object|Array 需要循环处理的对象或数组
 * @param {function} cb 回调处理函数
 */
export function each(vals, cb) {
  if (!isFunction(cb)) {
    throw new Error("each 函数必须传入回调处理函数");
  }
  for (const idx in vals) {
    if (Object.hasOwnProperty.call(vals, idx) && false === cb(vals[idx], idx, vals)) {
      break;
    }
  }
}

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
  each(val, (v, i) => {
    R[i] = copy(v);
  });
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
  each(b, (_, i) => {
    if (isArray(a[i]) && isArray(b[i])) {
      a[i] = a[i].concat(b[i]);
      return;
    }
    if (a[i] && recursion) {
      // 递归合并
      a[i] = _merge(a[i], b[i], true);
      return;
    }
    a[i] = b[i];
  })
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
/**
 * 获取二维对象数组中的值，成为一个新的一位数组或对象
 * 
 * @param {Array} items 二位数组（对象）
 * @param {String} fieldKey 挑选字段
 * @param {String} indexKey 挑选字段
 * @param {String} defaultVal 默认值
 */
export function col_cloumn(items, fieldKey, indexKey, defaultVal) {
  // 检查过滤字段是否定义
  if (isUndefined(fieldKey)) {
    throw new Error("col_cloumn 必须指定过滤的字段名");
  }
  // 确保默认值
  if (isUndefined(defaultVal)) {
    defaultVal = "";
  }
  let R = {};

  each(items, (item) => {
    // 计算返回的 key
    let rKey;
    if (isUndefined(indexKey)) {
      rKey = key;
    } else if (isUndefined(item[indexKey])) {
      throw new Error("col_cloumn 指定的索引字段不存在");
    } else {
      rKey = item[indexKey];
    }
    // 计算返回的值
    R[rKey] = isUndefined(item[fieldKey]) ? defaultVal : item[fieldKey];
  });
  return R;
}

/**
 * 查找集合中字段的值
 *
 * @param {String} key 需要查找的字段
 * @param {Array|Object} col 查找的集合
 * @param {Any} defaultVal 集合中没有字段时是否设置默认值
 */
export function col_value(key, col, defaultVal) {
  if (!isArray(col) && !isObject(col)) {
    throw new Error("col_value 必须指定查找集合为数组或对象");
  }
  if (col[key]) {
    return col[key];
  }
  if (isUndefined(defaultVal)) {
    throw new Error("col_value 没有对应的 key");
  }
  return defaultVal;
}
