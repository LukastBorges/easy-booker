import type { BookingPayload, BookingForm } from 'bookings/entity/Booking'
import type { Hotel, Room } from 'hotels/entity/Hotel'
import { findByKey } from 'utils/utils'

export function mapBookingToApi(
  booking: BookingForm,
  hotel: Hotel,
  userId: string,
  id?: string
): BookingPayload {
  const room = findByKey(hotel.rooms, 'id', booking.room.value) as Room

  return {
    id,
    timestamp: new Date().toJSON(),
    userId: userId,
    firstName: booking.firstName,
    lastName: booking.lastName,
    email: booking.email,
    location: booking.location,
    period: booking.period,
    phoneNumber: booking.phoneNumber,
    hotelName: hotel.name,
    hotelId: hotel.id,
    roomId: room.id,
    roomName: room.name,
    roomDailyRate: room.dailyRate,
    headCount: booking.headCount
  }
}
