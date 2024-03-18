import { Breakpoint, Grid } from 'antd'

type BreakpointValues<T> = {
  [K in Breakpoint]: T
}

export function useBreakpoints<T>(breakPointValues: BreakpointValues<T>) {
  const screens = Grid.useBreakpoint()
  const activeBreakpoints = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((screen) => screen[0]) as Breakpoint[]
  const currentBreakpoint = activeBreakpoints[activeBreakpoints.length - 1]

  return breakPointValues[currentBreakpoint]
}
