/**
 * Created by zad on 16/12/9.
 */
/** to calc the offset of an HTMLElement
 * @param {HTMLElement} target
 * @return {Object}
 */
export default function getScroll(target) {
  if (typeof window === 'undefined') {
    return {top: 0, left: 0};
  }

  const isWindow = target === window;

  return isWindow ? {
    top: target.pageYOffset,
    left: target.pageXOffset
  } : {
    top: target.scrollTop,
    left: target.scrollLeft
  };
}
