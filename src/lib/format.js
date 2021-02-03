// 导入包
import { isEmpty, isObject } from "./unit";
import { each } from "./collection";

/**
 * 字符串占位替换
 * sprintf("%% %s 必须介于 %d 和 %d 之间, 性别在 %j 之中", "年龄", 18, 65, ["male", "female"])
 */
export function sprintf() {
  const formatRegExp = /%[sdj%]/g;
  for (
    var _len = arguments.length, args = Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    args[_key] = arguments[_key];
  }
  var i = 1;
  var f = args[0];
  var len = args.length;
  if (typeof f === "function") {
    return f.apply(null, args.slice(1));
  }
  if (typeof f === "string") {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === "%%") {
        return "%";
      }
      if (i >= len) {
        return x;
      }
      switch (x) {
        case "%s":
          return String(args[i++]);
        case "%d":
          return Number(args[i++]);
        case "%j":
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return "[Circular]";
          }
        default:
          return x;
      }
    });
    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " " + arg;
    }
    return str;
  }
  return f;
}

/**
 * 字符串对象替换
 * replace("{field} 必须介于 {min} 和 {max} 之间, 性别在 {sex} 之中", {field: "年龄",min: 18,max: 65,sex: ["male", "female"]})
 */
export function replace(msg, kvs) {
  if (isEmpty(msg)) {
    return "";
  }
  if (!isObject(kvs)) {
    return msg;
  }
  each(kvs, (val, key) => {
    const sKey = "{" + key + "}";
    if (-1 === msg.indexOf(sKey)) {
      return;
    }
    const repS = isObject(val) ? JSON.stringify(val) : val;
    msg = msg.replace(new RegExp(sKey, "g"), repS);
  });
  return msg;
}
