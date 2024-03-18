import { DateStringTuple, Option } from '../../core/entities/Utils'

export type Booking = {
  id: string
  timestamp: string
  userId: string
  firstName: string
  lastName: string
  email: string
  location: string
  period: DateStringTuple
  phoneNumber: string
  hotelName: string
  hotelId: string
  roomId: string
  roomName: string
  roomDailyRate: number
  headCount: number
}

export type BookingPayload = Omit<Booking, 'id'> & { id?: string }

export type BookingForm = {
  id?: string
  firstName: string
  lastName: string
  email: string
  location: string
  phoneNumber: string
  room: Option
  headCount: number
  period: DateStringTuple
}
