export interface Elapsed {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
  totalDays: number
}

/** Calendar-aware breakdown of the time elapsed since `startDate` (an ISO date string). */
export function getElapsed(startDate: string): Elapsed {
  const start = new Date(startDate)
  const now = new Date()

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()
  let hours = now.getHours() - start.getHours()
  let minutes = now.getMinutes() - start.getMinutes()
  let seconds = now.getSeconds() - start.getSeconds()

  if (seconds < 0) {
    seconds += 60
    minutes -= 1
  }
  if (minutes < 0) {
    minutes += 60
    hours -= 1
  }
  if (hours < 0) {
    hours += 24
    days -= 1
  }
  if (days < 0) {
    const daysInPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
    days += daysInPrevMonth
    months -= 1
  }
  if (months < 0) {
    months += 12
    years -= 1
  }

  const totalDays = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

  return { years, months, days, hours, minutes, seconds, totalDays }
}
