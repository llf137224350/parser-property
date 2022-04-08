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
 * 通过表达式获取属性值
 * @param target 对象或数组
 * @param keys 属性数组
 * @returns
 */

function _parserProperty(target, keys) {
  const key = keys.shift();
  if (!isObject(target[key]) && !isArray(target[key])) {
    return keys.length ? undefined : target[key];
  }
  return keys.length ? _parserProperty(target[key], keys) : target[key];
}

/**
 * 通过表达式获取属性值
 * @param target 对象或数组
 * @param exp 属性取值表达式
 * @returns
 */
function parserProperty(target, exp) {
  if (!target || !exp) {
    return target;
  }
  if (!isObject(target) && !isArray(target)) {
    throw new Error('target must be an object or array');
  }
  if (typeof exp !== 'string') {
    throw new Error('exp be in string，example："userInfo.userName"');
  }
  const arr = exp
    .replace(/\`|\'|\"/g, '')
    .split(/(\.|\[|\])/g)
    .filter(item => !['', '.', '[', ']'].includes(item));
  return _parserProperty(target, arr);
}

module.exports = parserProperty;
