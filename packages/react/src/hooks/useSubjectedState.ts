import {BehaviourSubj} from '@do-while-for-each/rxjs'
import {useCallback, useState} from 'react'
import {useControlledRender} from './useControlledRender'

export const useSubjectedState = <T = any>(initValue: T): [BehaviourSubj<T>, (value: T) => void] => {
  const [wrap] = useState(new BehaviourSubj<T>(initValue))
  const renderRunFn = useControlledRender()
  const setValue = useCallback((value: T) => {
    wrap.setValue(value)
    renderRunFn()
  }, [wrap, renderRunFn])
  return [wrap, setValue]
}
