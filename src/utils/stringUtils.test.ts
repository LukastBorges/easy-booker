import { fullNameFormatter, capitalize } from './stringUtils'

describe('fullNameFormatter', () => {
  it('formats full name correctly', () => {
    expect(fullNameFormatter('John', 'Doe')).toBe('John Doe')
    expect(fullNameFormatter('Jane', 'Smith')).toBe('Jane Smith')
  })
})

describe('capitalize', () => {
  it('capitalizes each word in a string', () => {
    expect(capitalize('hello world')).toBe('Hello World')
    expect(capitalize('jane doe')).toBe('Jane Doe')
    expect(capitalize('this is a test')).toBe('This Is A Test')
  })

  it('handles empty string', () => {
    expect(capitalize('')).toBe('')
  })

  it('handles single word', () => {
    expect(capitalize('hello')).toBe('Hello')
    expect(capitalize('world')).toBe('World')
  })
})
