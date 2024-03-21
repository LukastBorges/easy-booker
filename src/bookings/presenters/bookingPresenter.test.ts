import { mockedRoom } from 'hotels/mocks/hotel'
import { getHotelRoomLabel, getBookingTotalCost } from './bookingPresenters'

describe('getHotelRoomLabel', () => {
  it('returns formatted room label', () => {
    const label = getHotelRoomLabel(mockedRoom)

    expect(label).toEqual(
      `${mockedRoom.name} (${mockedRoom.roomCapacity} people, $${mockedRoom.dailyRate}/day)`
    )
  })
})

describe('getBookingTotalCost', () => {
  it('returns formatted total cost', () => {
    const totalValue = 500

    const totalCost = getBookingTotalCost(totalValue)

    expect(totalCost).toEqual('Total cost: $500.00')
  })
})
