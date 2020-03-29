export * from './fetch/index';

export { valiFilename } from './other/vali-filename';
export { fileDownload } from './other/file-download';
export * from './other/value-checker';

export * from './store/history';
export * from './store/local-storage';
export * from './store/lstore-db-search_words';

export * from './browser';

export * from './date';

export * from './mvp';

export * from './native';

export * from './number';

export * from './regex';

const { IS_PRODUCTION } = process.env.app;

if (IS_PRODUCTION) {
  ['log', 'error', 'warn'].forEach(k => {
    window.console[k] = func;
  });
}

export function func(i) {
  return i;
}

export function sleep(callback, delay = 1000) {
  return setTimeout(callback, delay);
}

export function sleepAsync(delay = 1000) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function sleepUnique(uniqueId, callback, delay) {
  if (sleepUnique.DICT[uniqueId]) {
    clearTimeout(sleepUnique.DICT[uniqueId]);
  }
  sleepUnique.DICT[uniqueId] = sleep(() => {
    callback();
    delete sleepUnique.DICT[uniqueId];
  }, delay);
}
sleepUnique.DICT = {};
