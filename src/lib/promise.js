// 导入函数
import { each } from "./collection";
import { isArray, isFunction } from "./util";
import { dump } from "./assist";

/**
 * 获取 Promise 返回数据中的真正值
 * @param {Object} res 
 */
function getRealData(res) {
  if (0 != res.code) {
    dump.error(res.msg);
  }
  return res.data;
}

/**
 * 异步获取远程数据
 * 
 * @param {Object | Array} promises 
 * @param {Function | undefined} callback 
 * @param {Function | null | undefined} dataCallback 
 */
export async function asyncAll(promises, callback, dataCallback) {
  // 数据获取后处理
  let realDataCallback;
  if (null === dataCallback) {
    realDataCallback = res => res;
  } else if (isFunction(dataCallback)) {
    realDataCallback = dataCallback;
  } else {
    realDataCallback = getRealData;
  }
  const isCallback = isFunction(callback);
  const _ps = [];
  each(promises, (promise) => {
    _ps.push(promise);
  });
  // 定义返回格式
  const rData = isArray(promises) ? [] : {};
  await Promise.all(_ps).then(res => {
    let index = 0;
    each(promises, (_, idx) => {
      rData[idx] = realDataCallback(res[index++]);
    });
    if (isCallback) {
      callback(rData);
    }
  }).catch(err => err);
  if (!isCallback) {
    return rData;
  }
}
