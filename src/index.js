// 通用函数
import { isDev, isUndefined, isString, isBoolean, isNumber, isArray, isObject, isFunction, isEmpty, uniqid } from "./lib/unit";
// 数组相关函数
import { inArray, explode, implode } from "./lib/array";
// 集合相关函数
import { copy, merge, col_cloumn, col_value, each } from "./lib/collection";
// 格式化相关函数
import { sprintf, replace } from "./lib/format";
// 辅助类相关函数
import { dump } from "./lib/assist";
// promise 相关函数
import { asyncAll } from "./lib/promise";
// cookie 管理
import cookie from "./lib/cookie";
// session storage
import session from "./lib/session_storage";
// local storage
import local from "./lib/local_storage";

/**
 * 导出相应函数
 */
export {
  // unit
  isDev, isUndefined, isString, isBoolean, isNumber, isArray, isObject, isFunction, isEmpty, uniqid,
  // array
  inArray, explode, implode,
  // collection
  copy, merge, col_cloumn, col_value, each,
  // format
  sprintf, replace,
  // assist
  dump,
  // promise
  asyncAll,
  // cookie
  cookie,
  // session_storage
  session,
  // local_storage
  local
};
