import { render, screen } from '@testing-library/react'

import HotelSearch from './HotelSearch'
import BookingProvider, { defaultContext } from 'core/contexts/Bookings'

describe('<Header />', async () => {
  const setup = () => {
    render(
      <BookingProvider initialValue={defaultContext}>
        <HotelSearch
          reservedPeriods={[]}
          searchParams={{ location: '', dateRange: [], headCount: 1 }}
          dispatch={vi.fn()}
        />
      </BookingProvider>
    )
  }

  it('renders correctly', async () => {
    setup()

    expect(screen.getByText('More than just a stay')).toBeVisible()
    expect(
      screen.getByAltText('world map in gray color as background')
    ).toBeVisible()
    expect(screen.getByText('Select a place')).toBeInTheDocument()
  })
})
