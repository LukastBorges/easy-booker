import { Booking, BookingForm } from 'bookings/entity/Booking'

export const mockedBooking: Booking = {
  id: '1adc',
  timestamp: '2024-03-16T20:52:41.071Z',
  userId: 'b1d61db7-236f-4f41-a1e4-953dd8a92b88',
  firstName: 'Lucas',
  lastName: 'Borges',
  email: 'luk4sborg3s@outlook.com',
  location: 'Brazil',
  period: ['2024-05-23T03:00:00.000Z', '2024-06-12T03:00:00.000Z'],
  phoneNumber: '+5531973116543',
  hotelName: 'Sea Breeze Resort',
  hotelId: 'b1d61db7-236f-4f41-a1e4-953dd8a92b61',
  roomId: '0e33b3c6-288d-4569-bad1-47242959aef2',
  roomName: 'Ocean View Suite',
  roomDailyRate: 400,
  headCount: 2
}

export const mockedBookings: Booking[] = [mockedBooking]

export const mockedBookingForm: BookingForm = {
  firstName: 'Lucas',
  lastName: 'Borges',
  email: 'luk4sborg3s@outlook.com',
  location: 'Brazil',
  period: ['2024-05-23T03:00:00.000Z', '2024-06-12T03:00:00.000Z'],
  phoneNumber: '+5531973116543',
  room: {
    value: '0e33b3c6-288d-4569-bad1-47242959aef2',
    label: 'Ocean View Suite'
  },
  headCount: 2
}
