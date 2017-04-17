/**
 * Created by zad on 17/4/17.
 */
import {exec} from 'child_process';
import _debug from 'debug';

const log = _debug('deploy:gh-pages');

log('checkout branch gh-pages!!');

exec('git checkout gh-pages', () => {
  log('checkout to gh-pages');
});
