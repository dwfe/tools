import {first, Observable, share, Subject, takeUntil} from '../re-export'
import {Stopper} from './stopper'

export class Subj<TData = any> {

  public subj: Subject<TData>
  public value$: Observable<TData>
  public stopper = new Stopper()

  constructor() {
    this.subj = new Subject();
    this.value$ = this.subj.asObservable().pipe(
      takeUntil(this.stopper.ob$),
      share(),
    );
  }

  value(): Promise<TData> {
    return this.value$.pipe(first()).toPromise();
  }

  setValue(value: TData): void {
    this.subj.next(value)
  }

  stop(): void {
    this.stopper.terminate()
    this.subj.complete()
  }

}
