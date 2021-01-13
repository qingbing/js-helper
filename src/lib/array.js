// 导入需要的包
import { isArray, isString, isUndefined } from "./unit";

/**
 * 查询 val 是否在数组中
 * @param {Mixed} v 搜索的值
 * @param {Array} arr 搜索的数组
 */
export function inArray(v, arr) {
  return -1 !== arr.indexOf(v);
}

/**
 * 将变量分割成数组
 * @param {mixed} str
 * @param {string} delimiter
 */
export function explode(str, delimiter) {
  if (isArray(str)) {
    return str;
  }
  if (isString(str)) {
    return str.split(delimiter || ",").map(str => str.trim());
  } else {
    return [str];
  }
}
/**
 * 将数组连接成字符串
 * 
 * @param {Array} arr 需要连接的数组
 * @param {String} glue 连接字符
 */
export function implode(arr, glue) {
  if (!isArray(arr)) {
    throw new Error("implode 只能合并数组");
  }
  if (isUndefined(glue)) {
    glue = " ";
  }
  return arr.join(glue);
}
/**
 * 获取二维对象数组中的值，成为一个新的一位数组或对象
 * 
 * @param {Array} items 二位数组（对象）
 * @param {String} fieldKey 挑选字段
 * @param {String} indexKey 挑选字段
 * @param {String} defaultVal 默认值
 */
export function array_cloumn(items, fieldKey, indexKey, defaultVal) {
  // 检查过滤字段是否定义
  if (isUndefined(fieldKey)) {
    throw new Error("array_cloumn 必须指定过滤的字段名");
  }
  // 确保默认值
  if (isUndefined(defaultVal)) {
    defaultVal = "";
  }
  let R = {};
  for (const key in items) {
    const item = items[key];
    // 计算返回的 key
    let rKey;
    if (isUndefined(indexKey)) {
      rKey = key;
    } else if (isUndefined(item[indexKey])) {
      throw new Error("array_cloumn 指定的索引字段不存在");
    } else {
      rKey = item[indexKey];
    }
    // 计算返回的值
    let rVal;
    if (isUndefined(item[fieldKey])) {
      rVal = defaultVal
    } else {
      rVal = item[fieldKey];
    }
    R[rKey] = rVal;
  }
  return R;
}
