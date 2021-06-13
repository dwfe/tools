export const cloneSimple = (obj) =>
  obj === undefined
    ? undefined
    : JSON.parse(JSON.stringify(obj))
;


/**
 * Каждый вызов rAF(requestAnimationFrame) добавляет callback в rAF-очередь
 * Перед каждым рендером браузер сначала последовательно исполняет ВСЕ callback'и из rAF-очереди.
 * Почему бы перед рендером не обрабатывать только тот callback, который пришел самым последним?
 * Такой подход уменьшает объем работы перед рендером минимум в 2 раза.
 *
 * Использовать, например, так:
 *   .pipe(
 *     tap(d => this.rAFQueue.push(d)),
 *     delay(0, animationFrame), // отправить в --> rAF-очередь
 *     map(() => rAFQueueLast(this)), // взять из rAF-очереди только последнюю задачу
 *     filter(x=> !!x),
 *   )
 */
export const rAFQueueLast = (obj) => {
  // предполагается, что у obj есть массив 'rAFQueue'
  const length = obj.rAFQueue.length;
  if (length > 0) {
    const last = obj.rAFQueue[length - 1]; // взять последний callback
    obj.rAFQueue = []; // очистить очередь
    return last;
  }
};
