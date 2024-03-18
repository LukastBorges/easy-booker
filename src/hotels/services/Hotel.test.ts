import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { getHotel, getHotels, patchHotel } from './Hotel'

import { BASE_URL } from 'constants/constants'
import { mockedHotel, mockedHotels } from 'hotels/mocks/hotel'

describe('hotelService', () => {
  const mockAxios = new MockAdapter(axios)

  it('should get a hotel by id', async () => {
    const mockHotelId = '123'
    mockAxios
      .onGet(`${BASE_URL}/properties/${mockHotelId}`)
      .reply(200, mockedHotel)

    const hotel = await getHotel(mockHotelId)

    expect(hotel).toEqual(mockedHotel)
  })

  it('should get hotels', async () => {
    const mockQuery = '?location=NewYork'
    mockAxios
      .onGet(`${BASE_URL}/properties${mockQuery}`)
      .reply(200, mockedHotels)

    const hotels = await getHotels(mockQuery)

    expect(hotels).toEqual(mockedHotels)
  })

  it('should patch a hotel', async () => {
    const mockHotelId = '123'
    const mockPartialHotelData = {}
    mockAxios.onPatch(`${BASE_URL}/properties/${mockHotelId}`).reply(204)

    const status = await patchHotel({
      id: mockHotelId,
      data: mockPartialHotelData
    })

    expect(status).toBe(204)
  })
})
