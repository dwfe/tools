import {useCallback, useEffect, useState} from 'react'
import {Subj} from '@do-while-for-each/rxjs'
import {useControlledRender} from './useControlledRender'

export const useSubjectedState = <T = any>(initValue: T): [Subj<T>, (value: T) => void] => {
  const [wrap] = useState<Subj>(new Subj<T>({type: 'shareReplay', bufferSize: 1}, initValue))
  const renderRunFn = useControlledRender()

  const setValue = useCallback((value: T) => {
    wrap.setValue(value)
    renderRunFn()
  }, [wrap, renderRunFn])

  useEffect(() => {
    return () => wrap.stop()
  }, [])

  return [wrap, setValue]
}
