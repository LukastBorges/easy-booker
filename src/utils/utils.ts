import dayjs from 'dayjs'
import { DateStringTuple, DateTuple } from 'core/entities/Utils'

export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export function findByKey<T>(
  list: T[],
  key: keyof T,
  value: T[keyof T]
): T | undefined {
  return list.find((item) => item[key] === value)
}

export function dateRangeDuration(dateRange: DateStringTuple | DateTuple) {
  const startDate = dayjs(dateRange[0])
  const endDate = dayjs(dateRange[1])
  const totalDays = endDate.diff(startDate, 'days')

  return totalDays
}

export function totalBookingValue(
  period: DateStringTuple | DateTuple,
  dailyRate: number
): number {
  const totalDays = dateRangeDuration(period)
  const totalValue = dailyRate * totalDays

  return totalValue
}

export function sumListProp<T extends Record<string, unknown>>(
  list: T[],
  keyToSum: keyof T
): number {
  return list.reduce((prev, current) => {
    const value = +current[keyToSum]

    return prev + value
  }, 0)
}
