import { mockedHotel } from 'hotels/mocks/hotel'
import { locationFormatter } from './hotelPresenters'

describe('locationFormatter', () => {
  test('returns formatted location', () => {
    const formattedLocation = locationFormatter(mockedHotel)

    expect(formattedLocation).toEqual(
      `${mockedHotel.location.city}, ${mockedHotel.location.country}`
    )
  })
})
