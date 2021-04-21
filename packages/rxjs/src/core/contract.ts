export type TSubjType =
  'no-share' |
  'share' |                // share()
  'shareReplay' |          // shareReplay({refCount: false, bufferSize})
  'shareReplay + refCount' // shareReplay({refCount: true, bufferSize})
  ;

export interface ISubjOpt {
  type: TSubjType;
  bufferSize?: number;
}
