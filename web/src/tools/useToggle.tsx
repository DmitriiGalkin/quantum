import {useReducer} from 'react'

type UseToggle = (initial?: boolean) => [open: boolean, toggle: () => void]

const useToggle: UseToggle = (initial = false) => {
  return useReducer((open) => !open, initial)
}

export default useToggle
