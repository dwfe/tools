import {BehaviorSubject, Observable, shareReplay, Subject, takeUntil} from '../re-export'

export class BehaviourSubj<TData = any> {

  public subj: BehaviorSubject<TData>
  public value$: Observable<TData>
  public stopper$: Observable<any>
  private stopper = new Subject()

  constructor(initValue: TData) {
    this.subj = new BehaviorSubject(initValue);
    this.stopper$ = this.stopper.asObservable().pipe(
      shareReplay(1),
    );
    this.value$ = this.subj.asObservable().pipe(
      takeUntil(this.stopper$),
      shareReplay(1),
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
    this.stopper.next(true)
    this.stopper.complete()
  }

}
