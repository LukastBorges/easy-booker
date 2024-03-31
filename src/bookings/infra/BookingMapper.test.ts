import { mapBookingToApi } from './BookingMapper'

import { mockedBookingForm } from 'bookings/mocks/Booking'
import { mockedHotel } from 'hotels/mocks/hotel'

const userId = 'user123'

describe('mapBookingToApi', () => {
  test('maps booking form to booking payload', () => {
    const bookingPayload = mapBookingToApi(
      mockedBookingForm,
      mockedHotel,
      userId
    )

    expect(bookingPayload).toEqual({
      ...mockedBookingForm,
      id: undefined,
      room: undefined,
      hotelId: 'b1d61db7-236f-4f41-a1e4-953dd8a92b61',
      hotelName: 'Sea Breeze Resort',
      roomDailyRate: 200,
      roomId: '0e33b3c6-288d-4569-bad1-47242959aef2',
      roomName: 'Standard Room',
      timestamp: expect.any(String),
      userId: userId
    })
  })

  test('handles booking id when provided', () => {
    const bookingId = 'booking123'
    const bookingPayload = mapBookingToApi(
      mockedBookingForm,
      mockedHotel,
      userId,
      bookingId
    )

    expect(bookingPayload.id).toBe(bookingId)
  })
})
