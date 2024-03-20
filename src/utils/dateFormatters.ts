import dayjs from 'dayjs'

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
