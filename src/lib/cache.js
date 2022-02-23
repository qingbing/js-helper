// 导入包
import { isUndefined, isObject, isFunction } from "./util";
import { asyncAll } from "./promise";
/**
 * 客户端(浏览器)本地缓存，在正式使用前，需要指定缓存的 storage
 *  storage 必须支持一下几个方法
 *    1. set(key, value)
 *    2. get(key)
 *    3. remove(key)
 *    4. clear()
 */

// 数据加密成字符串
function encodeData(data) {
  return JSON.stringify(data);
}
// 数据解密成具体数据
function decodeData(string) {
  return JSON.parse(string);
}

// 导出包
export default {
  storage: undefined,
  // 设置storage组件
  setStorage(storage) {
    this.storage = storage;
  },
  /**
   * 设置浏览器本地缓存
   * @param {string} key 缓存key
   * @param {mixed} value 缓存的数据
   * @param {int} expires 有效时间，单位秒，默认不传表示永久生效(取决于使用的storage)
   * @returns {void}
   */
  set(key, value, expires = undefined) {
    if (!this.storage) {
      return;
    }
    try {
      if (!isUndefined(expires)) {
        expires = new Date().valueOf() + expires * 1000;
      }
      this.storage.set(key, encodeData({ expires, data: value }));
    } catch (e) {
      if (e.name === "QuotaExceededError") {
        console.log("数据已满，自动清空");
        this.clear();
        this.set(key, value, expires);
      }
    }
  },
  /**
   * 获取(设置)浏览器本地缓存
   * @param {string} key 缓存key
   * @param {array|function} promises 查询不到时通过给定的promise进行数据获取，如果是函数，返回的也是promise
   * @param {int} expires 如果设置缓存时的有效时间，单位秒
   * @returns {mixed}
   */
  async get(key, promises, expires) {
    if (!this.storage) {
      promises = isFunction(promises) ? promises() : undefined;
      return !isUndefined(promises) ? asyncAll(promises) : null;
    }
    const res = decodeData(this.storage.get(key));
    if (
      isObject(res) &&
      (isUndefined(res.expires) || res.expires > new Date())
    ) {
      return res.data;
    } else if (!isUndefined(promises)) {
      promises = isFunction(promises) ? promises() : undefined;
      const data = await asyncAll(promises);
      this.set(key, data, expires);
      return data;
    } else {
      this.storage.remove(key);
      return null;
    }
  },
  /**
   * 移除本地缓存
   * @param {string} key 缓存key
   * @returns {void}
   */
  remove(key) {
    if (!this.storage || !this.storage.remove) {
      return;
    }
    this.storage.remove(key);
  },
  /**
   * 清空本地缓存
   * @returns {void}
   */
  clear() {
    if (!this.storage || !this.storage.clear) {
      return;
    }
    this.storage.clear();
  },
};
