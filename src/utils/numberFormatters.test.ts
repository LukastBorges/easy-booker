import { moneyFormatter } from './numberFormatters'
import { sumListProp } from 'utils/utils'

describe('moneyFormatter', () => {
  it('formats money correctly', () => {
    // Test cases with numbers
    expect(moneyFormatter(100)).toBe('$100.00')
    expect(moneyFormatter(1000)).toBe('$1,000.00')
    expect(moneyFormatter(123456)).toBe('$123,456.00')

    // Test cases with strings
    expect(moneyFormatter('100')).toBe('$100.00')
    expect(moneyFormatter('1000')).toBe('$1,000.00')
    expect(moneyFormatter('123456')).toBe('$123,456.00')
  })
})

describe('sumListProp', () => {
  it('sums list property correctly', () => {
    const list = [
      { id: 1, amount: 100 },
      { id: 2, amount: 200 },
      { id: 3, amount: 300 }
    ]

    // Summing 'amount' property in the list
    expect(sumListProp(list, 'amount')).toBe(600)

    // Testing with empty list
    expect(sumListProp([], 'amount')).toBe(0)

    // Testing with list containing objects with 0 value
    const listWithZeroValues = [
      { id: 1, amount: 0 },
      { id: 2, amount: 0 },
      { id: 3, amount: 0 }
    ]
    expect(sumListProp(listWithZeroValues, 'amount')).toBe(0)
  })

  it('returns 0 if the list is empty', () => {
    expect(sumListProp([], 'amount')).toBe(0)
  })

  it('returns correct sum for non-empty list', () => {
    const list = [
      { id: 1, amount: 100 },
      { id: 2, amount: 200 },
      { id: 3, amount: 300 }
    ]
    expect(sumListProp(list, 'amount')).toBe(600)
  })
})
