import {animationFrame, asap, async, BehaviorSubject, combineLatest, fromEvent, merge, Observable, queue, ReplaySubject, Subject, Subscription} from 'rxjs'
import {debounceTime, delay, distinctUntilChanged, filter, finalize, first, map, mapTo, mergeMap, multicast, pairwise, publish, publishBehavior, publishLast, publishReplay, refCount, scan, share, shareReplay, skip, startWith, switchMap, takeUntil, tap, throttleTime, withLatestFrom} from 'rxjs/operators'

export {
  Observable,
  Subscription,
  Subject,
  ReplaySubject,
  BehaviorSubject,
  fromEvent,
  combineLatest,
  merge,

  tap,
  map,
  mapTo,
  filter,
  skip,
  first,
  distinctUntilChanged,
  switchMap,
  mergeMap,
  delay,
  debounceTime,
  throttleTime,
  takeUntil,
  withLatestFrom,
  startWith,
  pairwise,
  scan,
  finalize,

  multicast,
  refCount,
  publish,         // multicast(new Subject())
  share,           // multicast(() => new Subject()), refCount()
  publishReplay,   // multicast(new ReplaySubject())
  shareReplay,     // publishReplay(), refCount() - но с ньюансами
  publishBehavior, // multicast(new BehaviorSubject())
  publishLast,     // multicast(new AsyncSubject())

  async,          // Schedules on the macro task queue
  asap,           // Schedules on the micro task queue
  queue,          // Executes task synchronously but waits for current task to be finished
  animationFrame, // Relies on ‘requestAnimationFrame’
}
