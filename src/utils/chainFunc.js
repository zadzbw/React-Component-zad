/**
 * Created by zad on 16/12/21.
 */
export default function chainFunc() {
  const args = arguments;
  return function () {
    for (let i = 0; i < args.length; i++) {
      if (args[i] && typeof args[i] === 'function') {
        args[i].apply(this, arguments);
      }
    }
  };
}
