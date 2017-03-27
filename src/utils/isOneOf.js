/**
 * Created by zad on 16/11/30.
 */

/** verify array whether contains the target
 * @param {Array} array
 * @param {String, Number} target
 * @param {Number} fromIndex
 * @return {Boolean}
 */
export default function isOneOf(array, target, fromIndex = 0) {
  if (!Array.prototype.includes) {
    return includesPolyfill(array, target, fromIndex);
  }
  return Array.prototype.includes.apply(array, [target, fromIndex]);
}

function includesPolyfill(array, target, fromIndex = 0) {
  const len = array.length;
  while (fromIndex < len) {
    if (array[fromIndex] === target) {
      return true;
    }
    fromIndex++;
  }
  return false;
}
