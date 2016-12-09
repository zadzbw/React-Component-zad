/**
 * Created by zad on 16/11/30.
 */

/** verify array whether contains the target
 * @param {Array} array
 * @param {String, Number} target
 * @return {Boolean}
 */
export default function isOneOf(array, target) {
  return Array.prototype.includes.apply(array, [target, 0]);
}
