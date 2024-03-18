import { renderHook } from '@testing-library/react'
import { useBreakpoints } from './useBreakpoints'

vi.mock('antd', () => ({
  Grid: {
    useBreakpoint: vi.fn(() => ({
      xs: false,
      sm: false,
      md: true,
      lg: false,
      xl: false,
      xxl: false
    }))
  }
}))

describe('useBreakpoints', () => {
  it('returns value based on active breakpoint', () => {
    const breakPointValues = {
      xs: 'Extra Small',
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
      xl: 'Extra Large',
      xxl: 'Extra Extra Large'
    }

    const { result } = renderHook(() => useBreakpoints(breakPointValues))

    expect(result.current).toEqual('Medium')
  })
})
