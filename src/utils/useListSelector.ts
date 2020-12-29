import { useCallback, useEffect, useReducer } from 'react';

export const useListSelector = (
  initialIndex: number,
  list: any[],
  callback?: (index: number) => void
) => {
  const initialState = { index: initialIndex }

  const listReducer = (state, action) => {
    switch (action.type) {
      case 'next':
        return state.index >= list.length - 1 ? state : { index: state.index + 1 }
      case 'previous':
        return state.index > 0 ? { index: state.index - 1 } : state
      case 'reset':
        return initialState
      default:
        return state
    }
  }

  const [indexState, dispatch] = useReducer(listReducer, initialState);

  const next = useCallback(() => {
    dispatch({ type: 'next' })
  }, [])

  const previous = useCallback(() => {
    dispatch({ type: 'previous' })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'reset' })
  }, [])

  useEffect(() => {
    if (callback != null) {
      callback(indexState.index);
    }
  }, [indexState.index, list])

  return { next, previous, reset, index: indexState.state }
}