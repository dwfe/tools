import {first, Observable, Subject, takeUntil} from '../re-export'

export class SubjectWrap<TData = any> {

  subj: Subject<TData>
  value$: Observable<TData>

  private stopper = new Subject()

  constructor() {
    this.subj = new Subject();
    this.value$ = this.subj.asObservable().pipe(
      takeUntil(this.stopper),
    );
  }

  setValue = (value: TData) => {
    this.subj.next(value)
  }

  getValue(): Promise<TData> {
    return this.subj.asObservable().pipe(first()).toPromise();
  }

  stop() {
    this.stopper.next(true)
    this.stopper.complete()
  }

}
