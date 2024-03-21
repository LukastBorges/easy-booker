import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Mock } from 'vitest'

import { useSetPeriods } from './useReservedPeriod'

import { mockedHotel } from 'hotels/mocks/hotel'
import BookingProvider, { defaultContext } from 'core/contexts/Bookings'
import { getBookings } from 'bookings/services/Booking'
import { mockedBooking } from 'bookings/mocks/Booking'
import { publish } from 'utils/customEvents'
import { ANTD_MESSAGE } from 'constants/constants'

const sampleError = new Error('Network error')

vi.mock('bookings/services/Booking', () => ({
  getBookings: vi.fn()
}))

vi.mock('utils/customEvents', () => ({
  publish: vi.fn()
}))

const mockedGetBookings = getBookings as Mock
const mockedPublish = publish as Mock

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})
const wrapper = ({ children }: { children: ReactNode }) => (
  <BookingProvider initialValue={defaultContext}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </BookingProvider>
)

describe('useSetPeriods', () => {
  it('set periods successfully', async () => {
    mockedGetBookings.mockResolvedValueOnce(mockedHotel)

    renderHook(() => useSetPeriods(mockedBooking.userId), {
      wrapper
    })

    await waitFor(() =>
      expect(mockedGetBookings).toHaveBeenCalledWith(
        `?userId=${mockedBooking.userId}`
      )
    )
  })

  it('fails to set periods', async () => {
    mockedGetBookings.mockRejectedValueOnce(sampleError)

    renderHook(() => useSetPeriods(mockedHotel.id), {
      wrapper
    })

    await waitFor(() =>
      expect(mockedPublish).toHaveBeenCalledWith(ANTD_MESSAGE, {
        key: 'bookingPeriodsError',
        type: 'error',
        content: sampleError.message
      })
    )
  })
})
