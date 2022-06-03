// 导入需要的包
import { isArray, isString } from "./util";

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
 * 数组移除一个元素
 * 
 * @param {mixed} val
 * @returns 
 */
Array.prototype.remove = function (val) {
  const i = this.indexOf(val);
  if (-1 === i) {
    return this.slice();
  }
  return this.slice(0, i).concat(this.slice(i + 1));
};

/**
 * 元素是否在数组中
 * 
 * @param {mixed} val
 * @returns 
 */
Array.prototype.isElement = function (val) {
  return -1 !== this.indexOf(val);
};

/**
 * 元素是否在数组中
 * 
 * @param {mixed} val
 * @returns 
 */
Array.prototype.toObject = function () {
  const o = {};
  for (const k in this) {
    if (Object.hasOwnProperty.call(this, k)) {
      o[k] = this[k];
    }
  }
  return o;
};
