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