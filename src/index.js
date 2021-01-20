// 通用函数
import { isDev, isUndefined, isString, isBoolean, isNumber, isArray, isObject, isFunction, uniqid } from "./lib/unit";
// 数组相关函数
import { inArray, explode, implode } from "./lib/array";
// 集合相关函数
import { copy, merge, col_cloumn, col_value } from "./lib/collection";
// 格式话相关函数
import { sprintf, replace } from "./lib/format";

/**
 * 导出相应函数
 */
export {
  // unit
  isDev, isUndefined, isString, isBoolean, isNumber, isArray, isObject, isFunction, uniqid,
  // array
  inArray, explode, implode,
  // collection
  copy, merge, col_cloumn, col_value,
  // format
  sprintf, replace
};
