import { DateStringTuple } from 'core/entities/Utils'
import {
  dateFormatter,
  dateRangeFormatter,
  dateRangeDurationFormatter
} from './dateFormatters'

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
