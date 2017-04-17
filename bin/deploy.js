/**
 * Created by zad on 17/4/17.
 */
import {exec} from 'child_process';
import _debug from 'debug';

function Promisefy(fn, ctx) {
  return function (...args) {
    ctx = ctx || this;
    return new Promise((resolve, reject) => {
      fn.apply(ctx, [...args, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }]);
    });
  };
}

const log = _debug('deploy:gh-pages');

log('checkout branch gh-pages!!');

async function deploy() {
  try {
    const a = await Promisefy(exec)('git checkout gh-pages');
    console.log(a);
    log('checkout to gh-pages');
  } catch (e) {
    console.log(e);
  }
}

deploy();
