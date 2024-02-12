import { useEffect, useState } from 'react'

import { unixToDateString } from '../utils/dates'

interface DateFormatter {
  date: string | undefined
  handleChange: (text: string) => void
}

export const useDateFormatter = (initialState?: number | undefined): DateFormatter => {
  const [date, setDate] = useState<string | undefined>()

  useEffect(() => {
    if (initialState) {
      const tempDate = unixToDateString(initialState)
      setDate(tempDate)
    }
  }, [initialState])

  const handleChange = (text: string) => {
    const digits = text.replace(/[^\d]/g, '')

    let formatted = ''
    if (digits.length <= 2) {
      formatted = digits
    } else if (digits.length <= 4) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`
    } else {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`
    }
    setDate(formatted)
  }

  return { date, handleChange }
}
