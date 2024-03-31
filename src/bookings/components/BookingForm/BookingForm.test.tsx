import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import dayjs from 'dayjs'

import BookingForm from './BookingForm'

import type { Booking, InitialBookingFormValues } from 'bookings/entity/Booking'
import { mockedBooking, mockedBookingForm } from 'bookings/mocks/Booking'
import type { Hotel } from 'hotels/entity/Hotel'
import { mockedHotel } from 'hotels/mocks/hotel'
import { DateStringTuple } from 'core/entity/Utils'

const mockOnSubmit = vi.fn()

describe('<BookingForm />', () => {
  const setup = (
    booking: Booking,
    hotel: Hotel,
    initialValues: InitialBookingFormValues,
    periods: DateStringTuple[]
  ) => {
    render(
      <BookingForm
        booking={booking}
        hotel={hotel}
        initialValues={initialValues}
        reservedPeriods={periods}
        onSubmit={mockOnSubmit}
      />
    )
  }
  it('renders new booking form correctly', async () => {
    setup(mockedBooking, mockedHotel, { period: mockedBookingForm.period }, [])

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

  it('renders editing booking form correctly', async () => {
    setup(mockedBooking, mockedHotel, mockedBookingForm, [])

    const rangeDate1 = dayjs(mockedBookingForm.period[0]).format('MM/DD/YYYY')
    const rangeDate2 = dayjs(mockedBookingForm.period[1]).format('MM/DD/YYYY')

    // Assert if input elements ar present
    const periodInput1 = screen.getByDisplayValue(rangeDate1)
    const periodInput2 = screen.getByDisplayValue(rangeDate2)
    const roomInput = screen.getByText(mockedBookingForm.room.label)
    const headCount = screen.getByDisplayValue(mockedBookingForm.headCount)
    const firstNameInput = screen.getByDisplayValue(mockedBookingForm.firstName)
    const lastNameInput = screen.getByDisplayValue(mockedBookingForm.lastName)
    const emailInput = screen.getByDisplayValue(mockedBookingForm.email)
    const locationInput = screen.getByDisplayValue(mockedBookingForm.location)
    const phoneNumberInput = screen.getByDisplayValue(
      mockedBookingForm.phoneNumber
    )

    expect(periodInput1).toBeVisible()
    expect(periodInput2).toBeVisible()
    expect(roomInput).toBeInTheDocument()
    expect(headCount).toBeVisible()
    expect(firstNameInput).toBeVisible()
    expect(lastNameInput).toBeVisible()
    expect(emailInput).toBeVisible()
    expect(locationInput).toBeVisible()
    expect(phoneNumberInput).toBeVisible()
  })

  it('disables room selection and headcount if editing', async () => {
    setup(mockedBooking, mockedHotel, mockedBookingForm, [])

    const headCountInput = screen.getByLabelText('Headcount')
    const roomSelect = screen.getByTestId('room-select')

    expect(headCountInput).toBeDisabled()
    expect(roomSelect).toHaveClass('ant-select-disabled')
  })

  it('disables room option if headcount is bigger than room capacity', async () => {
    setup(
      { period: mockedBooking.period, headCount: 4 } as Booking,
      mockedHotel,
      mockedBookingForm,
      []
    )

    const roomInput = screen.getByLabelText('Room')

    await userEvent.click(roomInput)

    const option = await screen.findByText(/Standard Room/i)

    expect(option.parentElement).toHaveClass('ant-select-item-option-disabled')
  })

  it('updates total cost on room change', async () => {
    setup(
      { period: mockedBooking.period, headCount: 2 } as Booking,
      mockedHotel,
      { period: mockedBooking.period },
      []
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
