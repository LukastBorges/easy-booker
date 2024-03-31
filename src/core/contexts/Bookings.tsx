import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer
} from 'react'

import type { Booking } from 'bookings/entity/Booking'
import type { Hotel } from 'hotels/entity/Hotel'
import type { DateStringTuple } from 'core/entity/Utils'

export type SearchParams = {
  location: string | null
  dateRange: DateStringTuple | []
  headCount: number
}

export type BookingContextType = {
  hotel: Hotel
  searchParams: SearchParams
  booking: Booking
  periods: DateStringTuple[]
  dispatch: ({ type, value }: { type: string; value: unknown }) => void
}

export type ReducerState = Omit<BookingContextType, 'dispatch'>
export type ReducerAction =
  | { type: 'SET-HOTEL'; value: Hotel }
  | { type: 'SET-BOOKING'; value: Booking }
  | { type: 'SET-PERIODS'; value: DateStringTuple[] }
  | { type: 'SET-SEARCH-PARAMS'; value: SearchParams }

interface BookingProviderProps {
  children: ReactNode
  initialValue: ReducerState
}

export const bookingReducer = (
  state: ReducerState,
  action: ReducerAction
): ReducerState => {
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

export const defaultContext: ReducerState = {
  hotel: {} as Hotel,
  searchParams: {
    location: null,
    dateRange: [],
    headCount: 1
  },
  booking: {} as Booking,
  periods: []
}

export const BookingContext = createContext({} as ReducerState)

BookingContext.displayName = 'BookingContext'

export function useBookingContext() {
  const context = useContext(BookingContext)

  return context as BookingContextType
}

export default function BookingProvider({
  children,
  initialValue
}: BookingProviderProps) {
  const [context, dispatch] = useReducer(bookingReducer, initialValue)
  const contextValue = useMemo(
    () => ({
      hotel: context.hotel,
      searchParams: context.searchParams,
      booking: context.booking,
      periods: context.periods,
      dispatch
    }),
    [context, dispatch]
  )

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  )
}
