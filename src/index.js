// 通用函数
import { isDev, isUndefined, isString, isBoolean, isNumber, isArray, isObject, isFunction, isEmpty, uniqid, toJson } from "./lib/util";
// 数组相关函数
import { explode } from "./lib/array";
// 集合相关函数
import { copy, merge, col_cloumn, col_value, each } from "./lib/collection";
// 格式化相关函数
import { sprintf, replace } from "./lib/format";
// 辅助类相关函数
import { dump } from "./lib/assist";
// promise 相关函数
import { asyncAll } from "./lib/promise";
// idempotent 幂等控制
import idempotent from "./lib/idempotent";
// cookie 管理
import cookie from "./lib/cookie";
// session storage
import session from "./lib/session_storage";
// local storage
import local from "./lib/local_storage";
// cache 本地(浏览器)缓存
import cache from "./lib/cache";

/**
 * 导出相应函数
 */
export {
  // util
  isDev, isUndefined, isString, isBoolean, isNumber, isArray, isObject, isFunction, isEmpty, uniqid, toJson,
  // array
  explode,
  // collection
  copy, merge, col_cloumn, col_value, each,
  // format
  sprintf, replace,
  // assist
  dump,
  // promise
  asyncAll,
  // idempotent
  idempotent,
  // cookie
  cookie,
  // session_storage
  session,
  // local_storage
  local,
  // cache
  cache
};
