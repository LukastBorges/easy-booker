import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  saveBooking,
  updateBooking,
  getBookings,
  deleteBooking
} from './Booking'
import { BASE_URL } from 'constants/constants'
import { mockedBooking, mockedBookings } from 'bookings/mocks/Booking'

describe('bookingService', () => {
  const mockAxios = new MockAdapter(axios)

  it('should save a booking', async () => {
    mockAxios.onPost(`${BASE_URL}/bookings`).reply(201)

    const status = await saveBooking(mockedBooking)

    expect(status).toBe(201)
  })

  it('should update a booking', async () => {
    mockAxios.onPut(`${BASE_URL}/bookings/123`).reply(204)

    const status = await updateBooking({ ...mockedBooking, id: '123' })

    expect(status).toBe(204)
  })

  it('should get bookings', async () => {
    mockAxios.onGet(`${BASE_URL}/bookings`).reply(200, mockedBookings)

    const bookings = await getBookings()

    expect(bookings).toEqual(mockedBookings)
  })

  it('should delete a booking', async () => {
    const bookingId = '123'

    mockAxios.onDelete(`${BASE_URL}/bookings/123`).reply(204)

    const status = await deleteBooking(bookingId)

    expect(status).toBe(204)
  })
})
