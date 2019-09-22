import { useMemo } from 'preact/hooks'

let counter = 0

export default function useId() {
  return useMemo(() => {
    counter += 1
    return `id${counter}`
  }, [])
}
