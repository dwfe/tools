import {distinctUntilChanged, Observable, shareReplay, Subject, takeUntil} from '../re-export'

export class SubjectWrap<TData = any> {

  subj: Subject<TData>
  value$: Observable<TData>

  private stopper = new Subject()

  constructor() {
    this.subj = new Subject();
    this.value$ = this.subj.asObservable().pipe(
      takeUntil(this.stopper),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }

  setValue = (value: TData) => {
    this.subj.next(value)
  }

  stop() {
    this.stopper.next(true)
    this.stopper.complete()
  }

}
