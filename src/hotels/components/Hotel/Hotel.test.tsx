import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Hotel from './Hotel'

import type { Hotel as HotelEntity } from 'hotels/entity/Hotel'
import { mockedHotel } from 'hotels/mocks/hotel'
import { sumListProp } from 'utils/utils'

const mockFn = vi.fn()
const roomsAvailable = sumListProp(mockedHotel.rooms, 'roomsAvailable')

describe('<Hotel />', async () => {
  const setup = (hotel: HotelEntity) => {
    render(<Hotel hotel={hotel} onClick={mockFn} />)
  }

  beforeEach(() => {
    mockFn.mockReset()
  })

  it('renders correctly', async () => {
    setup(mockedHotel)

    const cardImage = screen.getByAltText(mockedHotel.name)

    expect(cardImage).toBeVisible()
    expect(screen.getByText(mockedHotel.name)).toBeVisible()
    expect(screen.getByText(mockedHotel.description)).toBeVisible()
    expect(
      screen.getByText(
        `${mockedHotel.location.city}, ${mockedHotel.location.country}`
      )
    ).toBeVisible()
    expect(screen.getByText(`Rooms available: ${roomsAvailable}`)).toBeVisible()

    await userEvent.click(cardImage)

    expect(mockFn).toHaveBeenCalledWith(mockedHotel)
  })

  it('hotel card disabled', async () => {
    setup({
      ...mockedHotel,
      rooms: [mockedHotel.rooms[1]]
    })

    const card = screen.getByTestId('hotel-card')

    expect(card).toHaveClass('pointer-events-none')
  })
})
