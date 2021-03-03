// 导入包函数
import { isDev } from "./unit";
/**
 * 打印相关函数
 */
export const dump = {
  /**
   * 打印错误信息
   * @param {String} msg 错误消息
   */
  error(msg) {
    if (isDev()) {
      throw new Error(msg);
    } else {
      console.error(`Error : ${msg}`);
    }
  },
  log() {
    if (isDev()) {
      console.log(...arguments);
    }
  }
};