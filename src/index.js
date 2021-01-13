// 通用函数
import { isDev, isUndefined, isString, isBoolean, isNumber, isArray, isObject } from "./lib/unit";
// 数组相关函数
import { inArray, explode, implode, array_cloumn } from "./lib/array";
// 集合相关函数
import { copy, merge } from "./lib/collection";
// 格式话相关函数
import { sprintf, replace } from "./lib/format";

/**
 * 导出相应函数
 */
export {
  // unit
  isDev, isUndefined, isString, isBoolean, isNumber, isArray, isObject,
  // array
  inArray, explode, implode, array_cloumn,
  // collection
  copy, merge,
  // format
  sprintf, replace
};
