import isObject from 'lodash/isObject';

const castPath = (path) => {
  return Array.isArray(path) ? path : path.replace(/\[/g, '.').replace(/]/g, '').split('.');
};

function getValue(obj, path) {
  path = castPath(path);
  obj = Object.assign({}, obj);
  let i = 0, len = path.length;
  // 如果值为 null 或 undefined，则停止循环
  while (obj !== null && obj !== undefined && i < len) {
    obj = obj[path[i++]];
  }
  return (i && i === len) ? obj : undefined;
}

function setValue(obj, path, value) {
  path = castPath(path);
  let i = -1, nested = obj;
  const len = path.length, lastIndex = len - 1;
  while (nested !== null && nested !== undefined && ++i < len) {
    const key = path[i];
    let newValue = value;
    if (i !== lastIndex) {
      // 如果当前所设的值为对象，则将其设为该对象，否则设为空对象或空数组
      newValue = isObject(nested[key]) ? nested[key] : /^(?:0|[1-9]\d*)$/.test(path[i + 1]) ? [] : {};
    }
    nested[key] = newValue;
    if (i !== lastIndex) {
      nested = nested[key];
    }
  }
  return obj;
}

export {getValue, setValue};
