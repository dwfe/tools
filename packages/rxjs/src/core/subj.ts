import {first, Observable, shareReplay, Subject, takeUntil} from '../re-export'

export class Subj<TData = any> {

  public subj: Subject<TData>
  public value$: Observable<TData>
  public stopper$: Observable<any>
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
    return this.value$.pipe(first()).toPromise();
  }

  setValue(value: TData): void {
    this.subj.next(value)
  }

  stop(): void {
    this.stopper.next(true)
    this.stopper.complete()
  }

}
