import { render, screen } from '@testing-library/react'
import BookingForm from './BookingForm'
import { Booking } from 'bookings/entity/Booking'
import { Hotel } from 'hotels/entity/Hotel'
import userEvent from '@testing-library/user-event'
import { mockedBooking } from 'bookings/mocks/Booking'
import { mockedHotel } from 'hotels/mocks/hotel'

const mockOnSubmit = vi.fn()

describe('<BookingForm />', () => {
  const setup = (booking: Booking, hotel: Hotel) => {
    render(
      <BookingForm booking={booking} hotel={hotel} onSubmit={mockOnSubmit} />
    )
  }
  it('renders booking form correctly', async () => {
    setup(mockedBooking, mockedHotel)

    // Assert form elements are visible
    const periodInput = screen.getByLabelText('Reservation period')
    const roomInput = screen.getByTestId('room-select')
    const headCountInput = screen.getByLabelText('Headcount')
    const firstNameInput = screen.getByLabelText('First name')
    const lastNameInput = screen.getByLabelText('Last name')
    const emailInput = screen.getByLabelText('Email')
    const locationInput = screen.getByLabelText('Country/Region')
    const phoneNumberInput = screen.getByLabelText('Phone number')

    expect(periodInput).toBeVisible()
    expect(roomInput).toBeVisible()
    expect(headCountInput).toBeVisible()
    expect(firstNameInput).toBeVisible()
    expect(lastNameInput).toBeVisible()
    expect(emailInput).toBeVisible()
    expect(locationInput).toBeVisible()
    expect(phoneNumberInput).toBeVisible()
  })

  it('disables room selection and headcount if editing', async () => {
    setup(mockedBooking, mockedHotel)

    const headCountInput = screen.getByLabelText('Headcount')
    const roomSelect = screen.getByTestId('room-select')

    expect(headCountInput).toBeDisabled()
    expect(roomSelect).toHaveClass('ant-select-disabled')
  })

  it('disables room option if headcount is bigger than room capacity', async () => {
    setup(
      { period: mockedBooking.period, headCount: 4 } as Booking,
      mockedHotel
    )

    const roomInput = screen.getByLabelText('Room')

    await userEvent.click(roomInput)

    const option = await screen.findByText(/Standard Room/i)

    expect(option.parentElement).toHaveClass('ant-select-item-option-disabled')
  })

  it('updates total cost on room change', async () => {
    setup(
      { period: mockedBooking.period, headCount: 2 } as Booking,
      mockedHotel
    )

    const totalCostElement = await screen.findByText(/Total cost:/i)
    expect(totalCostElement.textContent).toContain('$0.00')

    const roomInput = screen.getByLabelText('Room')

    await userEvent.click(roomInput)

    const option = await screen.findByText(/Standard Room/i)

    await userEvent.click(option)

    expect(totalCostElement.textContent).toContain('$4,000.00')
  })
})
