// 导入包
import Cookie from "js-cookie";
import { isUndefined, isNumber, isObject } from "./unit";
import { dump } from "./assist";

// 导出
export default {
  /**
   * 获取存储信息
   * @param {string} key 存储 key
   * @returns {string | undefined}
   */
  get(key) {
    return Cookie.get(key);
  },
  /**
   * 设置存储信息
   * @param {string} key 存储 key
   * @param {string} value 存储 value
   * @param {mixed} expire 有效期，可为 date 对象或数字，如果为数字单位为秒
   * @param {mixed} settings cookie的其它参数：path，domain，
   * @returns string | undefined
   */
  set(key, value, expire, settings) {
    if (isUndefined(settings)) {
      settings = {};
    }
    if (!isUndefined(expire)) {
      if (isObject(expire)) {
        settings.expires = expire;
      } else if (isNumber(expire)) {
        settings.expires = new Date(new Date().getTime() + expire * 1000);
      }
    }
    return Cookie.set(key, value, settings);
  },
  /**
   * 移除存储信息
   * @param {string} key 存储 key
   */
  remove(key) {
    Cookie.remove(key);
  },
  /**
   * 清空存储信息
   */
  clear() {
    dump.error("cookie不支持全部清除");
  },
};
