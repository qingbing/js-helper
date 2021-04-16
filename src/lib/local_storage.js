/**
 * 客户端（浏览器）数据存储
 */
export default {
  /**
   * 获取存储信息
   * @param {string} key 存储 key
   * @returns {string | null}
   */
  getItem(key) {
    return localStorage.getItem(key);
  },
  /**
   * 设置存储信息
   * @param {string} key 存储 key
   * @param {string} value 存储 value
   */
  setItem(key, value) {
    localStorage.setItem(key, value);
  },
  /**
   * 移除存储信息
   * @param {string} key 存储 key
   */
  removeItem(key) {
    localStorage.removeItem(key);
  },
  /**
   * 清空存储信息
   */
  clear() {
    localStorage.clear();
  }
}
