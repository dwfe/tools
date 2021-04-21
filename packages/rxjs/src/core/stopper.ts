import {Observable, share, Subject} from '../re-export';

export class Stopper {

  private subj = new Subject<any>()
  public ob$: Observable<any>

  constructor() {
    this.ob$ = this.subj.asObservable().pipe(
      share()
    )
  }

  terminate(): void {
    this.subj.next(true)
    this.subj.complete()
  }

}
