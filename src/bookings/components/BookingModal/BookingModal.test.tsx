import { render, screen } from '@testing-library/react'

import BookingModal from './BookingModal'

import { Booking } from 'bookings/entity/Booking'
import BookingProvider, { SearchParams } from 'core/contexts/Bookings'
import { Hotel } from 'hotels/entity/Hotel'
import { mockedHotel } from 'hotels/mocks/hotel'

vi.mock('bookings/hooks/useBooking', () => ({
  useSaveBooking: vi.fn(() => ({ handleSave: vi.fn() })),
  useUpdateBooking: vi.fn(() => ({ handleUpdate: vi.fn() }))
}))

const mockSearchParams: SearchParams = {
  headCount: 2,
  dateRange: ['2024-05-23T03:00:00.000Z', '2024-06-12T03:00:00.000Z'],
  location: null
}

describe('<BookingModal />', () => {
  const setup = (
    hotel: Hotel,
    searchParams: SearchParams,
    booking: Booking
  ) => {
    render(
      <BookingProvider initialValue={{ hotel, searchParams, booking }}>
        <BookingModal />
      </BookingProvider>
    )
  }

  afterAll(() => {
    vi.resetAllMocks()
  })

  it('renders hotel name and description', () => {
    setup(mockedHotel, mockSearchParams, {} as Booking)

    expect(screen.getByText(mockedHotel.name)).toBeInTheDocument()
    expect(screen.getByText(mockedHotel.description)).toBeInTheDocument()
  })
})
