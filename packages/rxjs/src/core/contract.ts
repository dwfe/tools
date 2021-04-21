export type TSubjType =
  'no-share' |
  'share' |
  'shareReplay' |
  'shareReplay + refCount'
  ;

export interface ISubjOpt {
  type: TSubjType;
  bufferSize?: number;
}
