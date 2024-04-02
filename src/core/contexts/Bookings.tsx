import { ReactNode, useReducer } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'

import type { Booking } from 'bookings/entity/Booking'
import type { Hotel } from 'hotels/entity/Hotel'
import type { DateStringTuple } from 'core/entity/Utils'

export type BookingState = {
  hotel: Hotel
  searchParams: SearchParams
  booking: Booking
  periods: DateStringTuple[]
}

export type SearchParams = {
  location: string
  dateRange: DateStringTuple | never[]
  headCount: number
}

export type BookingAction =
  | { type: 'SET-HOTEL'; value: Hotel }
  | { type: 'SET-BOOKING'; value: Booking }
  | { type: 'SET-PERIODS'; value: DateStringTuple[] }
  | { type: 'SET-SEARCH-PARAMS'; value: SearchParams }

export const bookingReducer = (
  state: BookingState,
  action: BookingAction
): BookingState => {
  switch (action.type) {
    case 'SET-HOTEL':
      return { ...state, hotel: action.value }
    case 'SET-BOOKING':
      return { ...state, booking: action.value }
    case 'SET-PERIODS':
      return { ...state, periods: action.value }
    case 'SET-SEARCH-PARAMS':
      return { ...state, searchParams: action.value }
    default:
      return state
  }
}

export type BookingDispatch = (action: BookingAction) => void

const initialValue: BookingState = {
  hotel: {} as Hotel,
  searchParams: {
    location: '',
    dateRange: [],
    headCount: 1
  },
  booking: {} as Booking,
  periods: [] as DateStringTuple[]
}

export const BookingContext = createContext<[BookingState, BookingDispatch]>([
  initialValue,
  () => null
])

BookingContext.displayName = 'BookingContext'

type BookingSelector<T> = (state: [BookingState, BookingDispatch]) => T

export function useBookingContext<T>(selector: BookingSelector<T>) {
  return useContextSelector(BookingContext, selector)
}

interface BookingProviderProps {
  children: ReactNode
  defaultValue?: BookingState
}

export default function BookingProvider({
  children,
  defaultValue
}: BookingProviderProps) {
  const [state, dispatch] = useReducer(
    bookingReducer,
    defaultValue || initialValue
  )

  return (
    <BookingContext.Provider value={[state, dispatch]}>
      {children}
    </BookingContext.Provider>
  )
}
