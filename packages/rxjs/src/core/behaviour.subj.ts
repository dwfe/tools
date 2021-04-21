import {BehaviorSubject, multicast, Observable, refCount, ReplaySubject, takeUntil} from '../re-export'
import {Stopper} from './stopper'

export class BehaviourSubj<TData = any> {

  public subj: BehaviorSubject<TData>
  public value$: Observable<TData>
  public stopper = new Stopper()

  constructor(initValue: TData) {
    this.subj = new BehaviorSubject(initValue);
    this.value$ = this.subj.asObservable().pipe(
      takeUntil(this.stopper.ob$),
      multicast(new ReplaySubject(1)),
      refCount(),
      // shareReplay({refCount: false, bufferSize: 1}),
    );
  }

  get value(): TData {
    return this.subj.getValue()
  }

  setValue(value: TData): void {
    if (this.value !== value)
      this.subj.next(value)
  }

  stop(): void {
    this.stopper.terminate()
    this.subj.complete()
  }

}
