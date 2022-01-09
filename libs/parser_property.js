/**
 * 判断是否为一个对象
 * @param target 对象
 * @returns
 */
function isObject(target) {
  // undefined、null
  if (!target) {
    return false;
  }
  return typeof target === 'object' && !isArray(target);
}
/**
 * 是否为一个数组
 * @param target 对象
 * @returns
 */
function isArray(target) {
  // undefined、null
  if (!target) {
    return false;
  }
  return target instanceof Array;
}

/**
 * 通过表达式获取属性值
 * @param exp 属性取值表达式
 * @param target 对象或数组
 * @returns
 */
function _parserProperty(exp, target) {
  const squareBracketsRegExp = /^\[(\"|\'|\`)?([_?a-zA-Z0-9]+)(\"|\'|\`)?\]$/g;
  const arrRegExp = /^([_?a-zA-Z0-9]+)(\[(\"|\'|\`)?([_?a-zA-Z0-9]+)(\"|\'|\`)?\])/g;
  if (!isObject(target) && !isArray(target)) {
    if (target === undefined) {
      // 不是对象或数组，还有表达式没有匹配完成，直接返回undefined
      return undefined;
    }
  }
  if (!exp) {
    // 表达式已经匹配完
    return target;
  }
  if (squareBracketsRegExp.test(exp)) {
    // [key/index]
    const $2 = RegExp.$2;
    return _parserProperty($2, target);
  }

  // data[0]/data[0].fileUrl
  const res = arrRegExp.exec(exp);
  if (res && res.length > 2) {
    let otherExp = exp.replace(res[1] + res[2], '');
    if (otherExp.startsWith('.')) {
      otherExp = otherExp.substring(1);
    }
    // 再次匹配得到下一级对象
    squareBracketsRegExp.test(res[2]);
    const $2 = RegExp.$2;
    return _parserProperty(otherExp, target[res[1]][$2]);
  }
  // 普通属性直接取值
  if (exp.indexOf('.') === -1) {
    exp = exp.replace(/(\"|\'|\`)/g, '');
    return isObject(target) || isArray(target) ? target[exp] : undefined;
  }
  // a.b.c
  const arr = exp.split('.');
  const value = target[arr.shift()];
  return _parserProperty(arr.join('.'), value);
}

/**
 * 通过表达式获取属性值
 * @param exp 属性取值表达式
 * @param target 对象或数组
 * @returns
 */
function parserProperty(exp, target) {
  if (typeof exp !== 'string') {
    throw new Error('第一个参数必须为字符串形式，如："userInfo.userName"');
  }
  if (!isObject(target) && !isArray(target)) {
    throw new Error('第二个参数必须为一个对象或数组');
  }
  return _parserProperty(exp, target);
}

module.exports = parserProperty;
