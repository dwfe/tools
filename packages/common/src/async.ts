export const delay = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms)
});

export const timeout = (ms, promise): Promise<any> => new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('TIMEOUT'));
  }, ms);
  promise.then(value => {
    clearTimeout(timer);
    resolve(value);
  }).catch(reason => {
    clearTimeout(timer);
    reject(reason);
  });
});
