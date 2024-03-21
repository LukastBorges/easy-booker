import dayjs, { Dayjs } from 'dayjs'

import { DateStringTuple, DateTuple } from 'core/entities/Utils'
import { dateRangeDuration } from 'utils/utils'

const DEFAULT_FORMAT = 'MM-DD-YYYY'

export function getTypedDateRange(dateRange: DateStringTuple) {
  return dateRange.map((item) => dayjs(item))
}

export function dateFormatter(date: string) {
  return dayjs(date).format(DEFAULT_FORMAT)
}

export function dateRangeFormatter(dateRange: DateStringTuple | DateTuple) {
  const formattedDates = dateRange.map((item) =>
    dayjs(item).format('DD MMM, YYYY')
  )

  return formattedDates.join(' - ')
}

export function dateRangeDurationFormatter(
  dateRange: DateStringTuple | DateTuple
) {
  const totalDays = dateRangeDuration(dateRange)

  return `${totalDays} days`
}

export function isDateOnAnyRange(
  date: Dayjs,
  periods: DateStringTuple[]
): boolean {
  return periods.some((period) =>
    date.isBetween(period[0], period[1], 'day', '[]')
  )
}

/* This function is complex but the idea isn't that much.
/  We wan't to find any overlaps between two range dates, 
/  so we do an intersection between the latest start data (start)
/  and the earliest end date (end) of the two ranges. That kind of 
/  normalizes the multiple ranges in just one where the start being 
/  before the end date in any quantity means there's an overlap in place.
/  A graphical representation of this principle would make up for an easier understanding.
*/
export function isPeriodOverlap(
  period: DateStringTuple,
  periods: DateStringTuple[]
): boolean {
  const [startA, endA] = period.map((item) => dayjs(item))

  return periods.some((period) => {
    const [startB, endB] = period
    const start = startA.isAfter(startB, 'day') ? startA : dayjs(startB)
    const end = endA.isBefore(endB) ? endA : dayjs(endB)

    return start.isBefore(end)
  })
}
