// 导入包
import { dump } from "./assist";
import { isObject, isFunction } from "./util";
/**
 * 导出幂等
 */
export default {
  __runningMsg: "...请不要着急，正在处理中...",
  __paramCallbackErrorMsg: "幂等函数需要传递一个方法",
  __runningData: {},
  // 设置处理中消息
  setRunningMsg(msg) {
    this.__runningMsg = msg;
    return this;
  },
  // 设置处理方法不合法消息
  setParamCallbackErrorMsg(msg) {
    this.__paramCallbackErrorMsg = msg;
    return this;
  },
  // 运行主体
  run(name, callback, obj) {
    if (!isFunction(callback)) {
      dump.error(this.__paramCallbackErrorMsg);
      return;
    }
    if (this.__runningData[name]) {
      dump.error(this.__runningMsg);
    } else {
      this.__runningData[name] = true;
      if (isObject(obj)) {
        callback.call(obj, () => {
          delete this.__runningData[name];
        });
      } else {
        callback(() => {
          delete this.__runningData[name];
        });
      }
    }
  },
};
