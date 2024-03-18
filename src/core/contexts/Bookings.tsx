import dayjs from 'dayjs'
import {
  ReactElement,
  createContext,
  useContext,
  useMemo,
  useReducer
} from 'react'

import { Booking } from 'bookings/entity/Booking'
import { Hotel } from 'hotels/entity/Hotel'
import { DateStringTuple } from 'core/entities/Utils'

const TODAY = dayjs().toJSON()
const NEXT_WEEK = dayjs().add(7, 'day').toJSON()

export type SearchParams = {
  location: string | null
  dateRange: DateStringTuple
  headCount: number
}

export type BookingContextType = {
  hotel: Hotel
  searchParams: SearchParams
  booking: Booking
  dispatch: ({ type, value }: { type: string; value: unknown }) => void
}

type ReducerState = Omit<BookingContextType, 'dispatch'>
type ReducerAction =
  | { type: 'SET-HOTEL'; value: Hotel }
  | { type: 'SET-BOOKING'; value: Booking }
  | { type: 'SET-SEARCH-PARAMS'; value: SearchParams }

interface BookingProviderProps {
  children: ReactElement
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
    dateRange: [TODAY, NEXT_WEEK],
    headCount: 1
  },
  booking: {} as Booking
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
