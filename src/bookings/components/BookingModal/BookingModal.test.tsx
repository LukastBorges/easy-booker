import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'

import BookingModal from './BookingModal'

import type { Booking } from 'bookings/entity/Booking'
import BookingProvider, { SearchParams } from 'core/contexts/Bookings'
import type { Hotel } from 'hotels/entity/Hotel'
import { mockedHotel } from 'hotels/mocks/hotel'
import { DateStringTuple } from 'core/entity/Utils'
import { mockedReservedPeriods } from 'core/mocks/reservedPeriods'

vi.mock('bookings/hooks/useBooking', () => ({
  useSaveBooking: vi.fn(() => ({ handleSave: vi.fn() })),
  useUpdateBooking: vi.fn(() => ({ handleUpdate: vi.fn() }))
}))

vi.mock('core/hooks/useReservedPeriod', () => ({
  useSetPeriods: vi.fn()
}))

vi.mock('bookings/services/Booking', () => ({
  getBooking: vi.fn()
}))

const mockSearchParams: SearchParams = {
  headCount: 2,
  dateRange: ['2024-05-23T03:00:00.000Z', '2024-06-12T03:00:00.000Z'],
  location: ''
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('<BookingModal />', () => {
  const setup = (
    hotel: Hotel,
    searchParams: SearchParams,
    booking: Booking,
    periods: DateStringTuple[]
  ) => {
    render(
      <BookingProvider defaultValue={{ hotel, searchParams, booking, periods }}>
        <BookingModal />
      </BookingProvider>
    ),
      { wrapper }
  }

  afterAll(() => {
    vi.resetAllMocks()
  })

  it('renders hotel name and description', () => {
    setup(mockedHotel, mockSearchParams, {} as Booking, mockedReservedPeriods)

    expect(screen.getByText(mockedHotel.name)).toBeInTheDocument()
    expect(screen.getByText(mockedHotel.description)).toBeInTheDocument()
  })
})
