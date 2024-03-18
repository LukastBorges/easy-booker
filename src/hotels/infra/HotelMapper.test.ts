import { mockedHotel } from 'hotels/mocks/hotel'
import { mapHotelToApi, mapApiToHotel } from './HotelMapper'

describe('mapHotelToApi', () => {
  it('maps partial hotel data to partial hotel payload', () => {
    const partialHotel = {
      name: 'Hotel Name',
      imageUrl: 'hotel_image.jpg',
      description: 'Hotel Description'
    }

    const mappedPayload = mapHotelToApi(partialHotel)

    expect(mappedPayload).toEqual({
      name: 'Hotel Name',
      imageUrl: 'hotel_image.jpg',
      description: 'Hotel Description'
    })
  })
})

describe('mapApiToHotel', () => {
  it('maps raw hotel data to hotel object', () => {
    const mappedHotel = mapApiToHotel(mockedHotel)

    expect(mappedHotel).toEqual(mockedHotel)
  })
})
