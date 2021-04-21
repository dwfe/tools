import {Observable, share, Subject} from 'src/re-export';

export class Stopper {

  private subj = new Subject<any>()
  public obs$: Observable<any>

  constructor() {
    this.obs$ = this.subj.asObservable().pipe(share())
  }

  terminate(): void {
    this.subj.next(true)
    this.subj.complete()
  }

}
