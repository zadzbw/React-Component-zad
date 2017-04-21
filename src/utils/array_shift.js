/**
 * Created by zad on 17/4/20.
 */
/** to left shift an Array
 * @param {Array} arr
 * @param {Number} num
 * @return {Array}
 */
function leftShift(arr, num) {
  const result = arr.concat();
  if (num < 0) {
    return rightShift(arr, -num);
  }
  while (num > 0) {
    result.push(result.shift());
    num--;
  }
  return result;
}

/** to right shift an Array
 * @param {Array} arr
 * @param {Number} num
 * @return {Array}
 */
function rightShift(arr, num) {
  return leftShift(arr, arr.length - num);
}

export {leftShift, rightShift};
