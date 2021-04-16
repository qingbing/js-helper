/**
 * Session 数据存储
 */
export default {
  /**
   * 获取存储信息
   * @param {string} key 存储 key
   * @returns {string | null}
   */
  getItem(key) {
    return sessionStorage.getItem(key);
  },
  /**
  * 设置存储信息
  * @param {string} key 存储 key
  * @param {string} value 存储 value
  */
  setItem(key, value) {
    sessionStorage.setItem(key, value);
  },
  /**
   * 移除存储信息
   * @param {string} key 存储 key
   */
  removeItem(key) {
    sessionStorage.removeItem(key);
  },
  /**
   * 清空存储信息
   */
  clear() {
    sessionStorage.clear();
  }
}
