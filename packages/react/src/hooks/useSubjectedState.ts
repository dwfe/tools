import {BehaviourSubjWrap} from '@do-while-for-each/rxjs'
import {useCallback, useState} from 'react'
import {useControlledRender} from './useControlledRender'

export const useSubjectedState = <T = any>(initValue: T): [BehaviourSubjWrap<T>, (value: T) => void] => {
  const [wrap] = useState(new BehaviourSubjWrap<T>(initValue))
  const renderRunFn = useControlledRender()
  const setValue = useCallback((value: T) => {
    wrap.setValue(value)
    renderRunFn()
  }, [wrap, renderRunFn])
  return [wrap, setValue]
}
