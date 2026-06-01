import { useCallback, useState } from 'react'

function getInitialValue(initialValue) {
  return typeof initialValue === 'function' ? initialValue() : initialValue
}

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return getInitialValue(initialValue)

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : getInitialValue(initialValue)
    } catch (error) {
      console.warn('useLocalStorage read error', error)
      return getInitialValue(initialValue)
    }
  })

  const setValue = useCallback(
    (nextValue) => {
      setStoredValue((currentValue) => {
        const value =
          typeof nextValue === 'function' ? nextValue(currentValue) : nextValue

        try {
          window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
          console.warn('useLocalStorage write error', error)
        }

        return value
      })
    },
    [key],
  )

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.warn('useLocalStorage remove error', error)
    }

    setStoredValue(getInitialValue(initialValue))
  }, [initialValue, key])

  return [storedValue, setValue, removeValue]
}
