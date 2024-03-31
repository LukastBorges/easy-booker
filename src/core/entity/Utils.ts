import { Dayjs } from 'dayjs'

export type Option = {
  label: string
  value: string | number
}

export type DateStringTuple = [string, string]
export type DateTuple = [Dayjs, Dayjs]

export type Directions = 'vertical' | 'horizontal'
