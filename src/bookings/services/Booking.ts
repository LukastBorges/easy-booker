import axios, { AxiosResponse } from 'axios'

import { BASE_URL } from 'constants/constants'
import type { Booking, BookingPayload } from 'bookings/entity/Booking'

export async function saveBooking(booking: BookingPayload): Promise<number> {
  const response: AxiosResponse = await axios.post(
    `${BASE_URL}/bookings`,
    booking
  )

  return response.status
}

export async function updateBooking(booking: BookingPayload): Promise<number> {
  const response: AxiosResponse = await axios.put(
    `${BASE_URL}/bookings/${booking.id}`,
    booking
  )

  return response.status
}

export async function getBookings(query: string): Promise<Booking[]> {
  const response: AxiosResponse = await axios.get(
    `${BASE_URL}/bookings${query}`
  )

  const data: Booking[] = response.data

  return data
}

export async function deleteBooking(id: string): Promise<number> {
  const response: AxiosResponse = await axios.delete(
    `${BASE_URL}/bookings/${id}`
  )

  return response.status
}
