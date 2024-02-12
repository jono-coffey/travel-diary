export const parseDateStringToUnix = (dateString: string) => {
  const dates = dateString.split('/')
  if (dates.length < 3) return undefined

  const unix = Date.UTC(parseInt(dates[2], 10), parseInt(dates[1], 10) - 1, parseInt(dates[0], 10))

  return unix
}

export const unixToDateString = (unix: number) => {
  return new Date(unix).toLocaleDateString('en-GB')
}
