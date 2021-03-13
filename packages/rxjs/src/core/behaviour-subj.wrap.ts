import {BehaviorSubject, Observable, shareReplay, Subject, takeUntil} from '../re-export'

export class BehaviourSubjWrap<TData = any> {

  subj: BehaviorSubject<TData>
  value$: Observable<TData>

  private stopper = new Subject()

  constructor(initValue: TData) {
    this.subj = new BehaviorSubject(initValue);
    this.value$ = this.subj.asObservable().pipe(
      takeUntil(this.stopper),
      shareReplay(1)
    );
  }

  get value(): TData {
    return this.subj.getValue()
  }

  setValue = (value: TData) => {
    if (this.value !== value)
      this.subj.next(value)
  }

  stop() {
    this.stopper.next(true)
    this.stopper.complete()
  }

}