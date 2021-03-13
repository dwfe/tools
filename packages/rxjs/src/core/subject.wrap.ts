import {first, Observable, shareReplay, Subject, takeUntil} from '../re-export'

export class SubjectWrap<TData = any> {

  subj: Subject<TData>
  value$: Observable<TData>
  stopper$: Observable<any>
  private stopper = new Subject<any>()

  constructor() {
    this.subj = new Subject();
    this.stopper$ = this.stopper.asObservable().pipe(
      shareReplay(1),
    );
    this.value$ = this.subj.asObservable().pipe(
      takeUntil(this.stopper$),
    );
  }

  value(): Promise<TData> {
    return this.subj.asObservable().pipe(first()).toPromise();
  }

  setValue = (value: TData) => {
    this.subj.next(value)
  }

  stop() {
    this.stopper.next(true)
    this.stopper.complete()
  }

}
