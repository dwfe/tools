import {Observable, share, shareReplay, Subject, takeUntil} from '../re-export'
import {ISubjOpt} from './contract'
import {Stopper} from './stopper'

export class Subj<TData = any> {

  subj: Subject<TData>
  value$: Observable<TData>
  lastValue: TData
  stopper = new Stopper()

  constructor(opt: ISubjOpt = {type: 'no-share'}, initValue?: TData) {
    this.subj = new Subject()
    this.value$ = this.getValue$(opt)
    if (initValue !== undefined)
      this.setValue(initValue)
  }

  setValue(value: TData): void {
    this.lastValue = value
    this.subj.next(value)
  }

  stop(): void {
    this.stopper.terminate()
    this.subj.complete()
  }


  getValue$({type, bufferSize = 0}: ISubjOpt): Observable<TData> {
    if (bufferSize === 0 && (type === 'shareReplay' || type === 'shareReplay + refCount'))
      bufferSize = 1; // shareReplay is always replayed previous value

    const ob$ = this.subj.asObservable()

    switch (type) {
      case 'no-share':
        return ob$.pipe(
          takeUntil(this.stopper.ob$),
        );
      case 'share':
        return ob$.pipe(
          takeUntil(this.stopper.ob$),
          share(),
        );
      case 'shareReplay':
        return ob$.pipe(
          takeUntil(this.stopper.ob$),
          shareReplay({refCount: false, bufferSize}),
        );
      case 'shareReplay + refCount':
        return ob$.pipe(
          takeUntil(this.stopper.ob$),
          shareReplay({refCount: true, bufferSize}),
        );
      default:
        throw new Error(`Subj.getValue$ unknown type '${type}'`)
    }
  }

}
