import NProgress from 'nprogress';
import { logInfo, logSuccess } from '../log';

export function onStart() {
  logInfo('NProgress started');
  NProgress.start();
}

export function onComplete() {
  logSuccess('NProgress completed');
  NProgress.done();
}
