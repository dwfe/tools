import {IStoppable} from '@do-while-for-each/common'
import {Observable, share, shareReplay, startWith, Subject, takeUntil} from '../re-export'
import {ISubjOpt} from './contract'
import {Stopper} from './stopper'

export class Subj<TData = any> implements IStoppable {

  subj: Subject<TData>
  value$: Observable<TData>
  lastValue: TData
  stopper = new Stopper()

  constructor(opt: ISubjOpt = {type: 'no-share'}, initValue?: TData) {
    this.subj = new Subject()
    this.value$ = this.createValue$(opt, initValue)
  }

  setValue(value: TData): void {
    this.lastValue = value
    this.subj.next(value)
  }

  stop(): void {
    this.stopper.stop()
    this.subj.complete()
  }


  createValue$({type, bufferSize = 0}: ISubjOpt, initValue?: TData): Observable<TData> {
    if (bufferSize === 0
      && (type === 'shareReplay' || type === 'shareReplay + refCount'))
      throw new Error(`Instead of 'shareReplay({refCount: false/true, bufferSize: 0})', use 'share()' operator`)

    let ob$ = this.subj.asObservable().pipe(
      takeUntil(this.stopper.ob$),
    )
    if (initValue !== undefined && this.lastValue === undefined) {
      this.lastValue = initValue
      ob$ = ob$.pipe(
        startWith(initValue),
      )
    }

    switch (type) {
      case 'no-share':
        return ob$
      case 'share':
        return ob$.pipe(
          share(),
        );
      /**
       * Will NOT unsubscribe from Source until Source will complete or error,
       * no matter if there are active subscribers or not.
       * Instead of shareReplay({refCount: false, bufferSize: 0}), use share()
       */
      case 'shareReplay':
        return ob$.pipe(
          shareReplay({refCount: false, bufferSize}),
        );
      /**
       * Instead of shareReplay({refCount: true, bufferSize: 0}), use share()
       */
      case 'shareReplay + refCount':
        return ob$.pipe(
          shareReplay({refCount: true, bufferSize}),
        );
      default:
        throw new Error(`Subj.getValue$ unknown type '${type}'`)
    }
  }

}
