import {Observable, share, Subject, takeUntil, tap} from '../re-export'
import {Stopper} from './stopper'

export class Subj<TData = any> {

  subj: Subject<TData>
  value: TData | undefined
  value$: Observable<TData>
  stopper = new Stopper()
  isDebug = false

  constructor() {
    this.subj = new Subject();
    this.value$ = this.subj.asObservable().pipe(
      tap(data => {
        if (this.isDebug)
          console.log(`obs emit`, data)
      }),
      takeUntil(this.stopper.ob$),
      share(),
    );
  }

  setValue(value: TData): void {
    this.value = value
    this.subj.next(value)
  }

  stop(): void {
    this.stopper.terminate()
    this.subj.complete()
  }

}
