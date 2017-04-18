/**
 * Created by zad on 17/4/17.
 */
import {exec} from 'child_process';
import fs from 'fs';
import path from 'path';
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

async function copy(src, target) {
  try {
    await Promisefy(exec)('git checkout gh-pages');
    const files = await Promisefy(fs.readdir)(src);
    fs.exists(target, (exists) => {
      if (!exists) {
        fs.mkdirSync(target);
      }
      files.forEach(async (file) => {
        const srcPath = path.resolve(src, file);
        const targetPath = path.resolve(target, file);
        const stats = await Promisefy(fs.stat)(srcPath);
        if (stats.isDirectory()) {
          copy(srcPath, targetPath);
        } else {
          const readable = fs.createReadStream(srcPath);
          // 创建写入流
          const writable = fs.createWriteStream(targetPath);
          // 通过管道来传输流
          readable.pipe(writable);
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
}

log('checkout to gh-pages');

copy('build', 'dist');