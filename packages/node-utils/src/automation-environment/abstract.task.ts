import {BehaviourSubj, filter, first} from '@do-while-for-each/rxjs';
import {Page} from 'playwright';
import {IImgCompareResult, ITask, TCommand} from './contract';

export abstract class AbstractTask implements ITask {

  private allDataReceivedWrap = new BehaviourSubj<any>(null);
  private screenshotWrap = new BehaviourSubj<Buffer>(null);
  private compareScreenshotWrap = new BehaviourSubj<IImgCompareResult>(null);

  constructor(public readonly id: string) {
  }

  abstract getScript(): TCommand[];

  page?: Page;

  setAllDataReceived() {
    this.allDataReceivedWrap.setValue(true);
  }

  async allDataReceived(): Promise<any> {
    return result(this.allDataReceivedWrap);
  }

  setScreenshot(buf: Buffer) {
    this.screenshotWrap.setValue(buf);
  }

  async screenshot(): Promise<Buffer> {
    return result(this.screenshotWrap);
  }

  setCompareScreenshotResult(result: IImgCompareResult) {
    this.compareScreenshotWrap.setValue(result);
  }

  async compareScreenshotResult(): Promise<IImgCompareResult> {
    return result(this.compareScreenshotWrap);
  }

}

const result = async <T>(wrap: BehaviourSubj<T>): Promise<T> =>
  wrap.value
  || wrap.value$.pipe(
  filter(data => !!data),
  first()
  ).toPromise()
;
