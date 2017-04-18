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

async function copy(src, target) {
  try {
    const files = await Promisefy(fs.readdir)(src);
    fs.exists(target, async (exists) => {
      if (!exists) {
        fs.mkdirSync(target);
      }
      log('copy file start');
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
      log('copy file done');
    });
  } catch (e) {
    console.log(e);
  }
}

async function deploy() {
  try {
    await Promisefy(exec)('git checkout gh-pages');
    log('checkout to branch gh-pages');
    await Promisefy(fs.rmdir)('dist');
    copy('build', 'dist'); // 开始读写文件
    await Promisefy(exec)('git add dist'); // add
    await Promisefy(exec)('git commit -a -m "deploy"'); // commit
    await Promisefy(exec)('git push origin gh-pages'); // push

  } catch (e) {
    console.log(e);
  }
}

deploy();