import type { DateStringTuple } from 'core/entity/Utils'
import {
  dateFormatter,
  dateRangeFormatter,
  dateRangeDurationFormatter,
  isDateOnAnyRange,
  isPeriodOverlap
} from './dateUtils'
import dayjs from 'dayjs'

describe('dateFormatter', () => {
  it('formats date correctly', () => {
    const date = '2024-03-16'
    const formattedDate = dateFormatter(date)
    expect(formattedDate).toBe('03-16-2024')
  })
})

describe('dateRangeFormatter', () => {
  it('formats date range correctly', () => {
    const dateRange = ['2024-03-16', '2024-03-23'] as DateStringTuple
    const formattedDateRange = dateRangeFormatter(dateRange)
    expect(formattedDateRange).toBe('16 Mar, 2024 - 23 Mar, 2024')
  })
})

describe('dateRangeDurationFormatter', () => {
  it('formats date range duration correctly', () => {
    const dateRange = ['2024-03-16', '2024-03-29'] as DateStringTuple
    const formattedDuration = dateRangeDurationFormatter(dateRange)
    expect(formattedDuration).toBe('13 days')
  })
})

describe('isDateOnAnyRange', () => {
  it('returns true if date is on any range', () => {
    const date = dayjs('2024-03-15')
    const periods = [
      ['2024-03-10', '2024-03-20'],
      ['2024-03-25', '2024-03-30']
    ] as DateStringTuple[]

    const result = isDateOnAnyRange(date, periods)

    expect(result).toBe(true)
  })

  it('returns false if date is not on any range', () => {
    const date = dayjs('2024-03-25')
    const periods = [
      ['2024-03-10', '2024-03-20'],
      ['2024-03-30', '2024-04-05']
    ] as DateStringTuple[]

    const result = isDateOnAnyRange(date, periods)

    expect(result).toBe(false)
  })
})

describe('isPeriodOverlap', () => {
  it('returns true if there is overlap in periods', () => {
    const period = ['2024-03-15', '2024-03-25'] as DateStringTuple
    const periods = [
      ['2024-03-10', '2024-03-20'],
      ['2024-03-20', '2024-03-30']
    ] as DateStringTuple[]

    const result = isPeriodOverlap(period, periods)

    expect(result).toBe(true)
  })

  it('returns false if there is no overlap in periods', () => {
    const period = ['2024-03-15', '2024-03-25'] as DateStringTuple
    const periods = [
      ['2024-03-10', '2024-03-14'],
      ['2024-03-30', '2024-04-05']
    ] as DateStringTuple[]

    const result = isPeriodOverlap(period, periods)

    expect(result).toBe(false)
  })
})
