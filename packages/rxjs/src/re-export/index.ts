import {animationFrame, asap, async, BehaviorSubject, combineLatest, fromEvent, merge, Observable, queue, Subject, Subscription} from 'rxjs'
import {debounceTime, delay, distinctUntilChanged, filter, first, map, mapTo, mergeMap, pairwise, scan, shareReplay, skip, startWith, switchMap, takeUntil, tap, throttleTime, withLatestFrom} from 'rxjs/operators'

export {
  Observable,
  Subscription,
  Subject,
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
  shareReplay,
  takeUntil,
  withLatestFrom,
  startWith,
  pairwise,
  scan,

  async,          // Schedules on the macro task queue
  asap,           // Schedules on the micro task queue
  queue,          // Executes task synchronously but waits for current task to be finished
  animationFrame, // Relies on ‘requestAnimationFrame’
}
