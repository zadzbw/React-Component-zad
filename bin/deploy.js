/**
 * Created by zad on 17/4/17.
 */
import {exec} from 'child_process';
import _debug from 'debug';

const log = _debug('deploy:gh-pages');

log('checkout branch gh-pages!!');

async function deploy() {
  const a = await exec('git checkout gh-pages');
  console.log(a);
  log('checkout to gh-pages');
}

deploy();
