import {Stoppable} from '@do-while-for-each/common'
import {share, Subject} from '../re-export'

export class Stopper implements Stoppable {

  subj = new Subject<boolean>()

  ob$ = this.subj.asObservable().pipe(
    share()
  )

  stop(): void {
    this.subj.next(true)
    this.subj.complete()
  }

}
