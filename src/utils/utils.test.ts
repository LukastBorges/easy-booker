import {
  classNames,
  findByKey,
  dateRangeDuration,
  totalBookingValue
} from './utils'

import type { DateStringTuple } from 'core/entity/Utils'

describe('classNames', () => {
  test('returns concatenated string of truthy classes', () => {
    const classes = classNames('class1', '', 'class2', null, 'class3')
    expect(classes).toBe('class1 class2 class3')
  })

  test('returns empty string if all classes are falsy', () => {
    const classes = classNames('', null, undefined)
    expect(classes).toBe('')
  })
})

describe('findByKey', () => {
  test('finds object in list by key', () => {
    const list = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ]
    const foundItem = findByKey(list, 'id', 2)
    expect(foundItem).toEqual({ id: 2, name: 'Item 2' })
  })

  test('returns undefined if key does not exist', () => {
    const list = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ]
    const foundItem = findByKey(list, 'id', 3)
    expect(foundItem).toBeUndefined()
  })
})

describe('dateRangeDuration', () => {
  test('calculates duration between dates correctly', () => {
    const startDate = '2024-03-16'
    const endDate = '2024-03-23'
    const dateRange = [startDate, endDate] as DateStringTuple

    const duration = dateRangeDuration(dateRange)

    expect(duration).toBe(7) // Expected duration between 2024-03-16 and 2024-03-23 is 7 days
  })
})

describe('totalBookingValue', () => {
  test('calculates total booking value correctly', () => {
    const startDate = '2024-03-16'
    const endDate = '2024-03-23'
    const dateRange = [startDate, endDate] as DateStringTuple
    const dailyRate = 100 // Assuming daily rate is $100

    const totalValue = totalBookingValue(dateRange, dailyRate)

    expect(totalValue).toBe(700) // Expected total value for 7 days at $100 per day is $700
  })
})
