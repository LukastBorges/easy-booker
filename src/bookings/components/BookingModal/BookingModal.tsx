import { Modal, Button } from 'antd'

import BookingFormComponent from 'bookings/components/BookingForm/BookingForm'
import type { Booking, BookingForm } from 'bookings/entity/Booking'
import { useSaveBooking, useUpdateBooking } from 'bookings/hooks/useBooking'
import { mapBookingToApi } from 'bookings/infra/BookingMapper'
import { RESET_BOOKING_FORM, USER_ID } from 'constants/constants'
import { useBookingContext } from 'core/contexts/Bookings'
import { useBreakpoints } from 'core/hooks/useBreakpoints'
import { useSetPeriods } from 'core/hooks/useReservedPeriod'
import type { Hotel } from 'hotels/entity/Hotel'
import { publish } from 'utils/customEvents'

const widthBreakPoints = {
  xs: '100vw',
  sm: '100vw',
  md: '650px',
  lg: '650px',
  xl: '650px',
  xxl: '650px'
}

export default function BookingModal() {
  const { hotel, booking, searchParams, periods } = useBookingContext(
    (state) => state[0]
  )
  const dispatch = useBookingContext((state) => state[1])
  useSetPeriods(USER_ID, booking.id)
  const currentBreakpoint = useBreakpoints(widthBreakPoints)
  const { handleSave } = useSaveBooking()
  const { handleUpdate } = useUpdateBooking()

  const currentBookingInfo = booking.id
    ? { ...booking, room: { label: booking.roomName, value: booking.roomId } }
    : ({
        headCount: searchParams.headCount,
        period: searchParams.dateRange
      } as Booking)

  const onSubmit = async (formData: BookingForm) => {
    const payload = mapBookingToApi(formData, hotel, USER_ID, booking.id)

    if (booking.id) {
      await handleUpdate(payload, handleCancel)
    } else {
      await handleSave(payload, hotel.rooms, handleCancel)
    }
  }

  const handleCancel = () => {
    dispatch({ type: 'SET-HOTEL', value: {} as Hotel })
    publish(RESET_BOOKING_FORM, null)
  }

  return (
    <Modal
      open={!!hotel.id}
      closeIcon={false}
      footer={[
        <Button key="cancel" onClick={handleCancel} type="default">
          Cancel
        </Button>,
        <Button
          form="bookingForm"
          key="submit"
          htmlType="submit"
          type="primary"
        >
          Save
        </Button>
      ]}
      width={currentBreakpoint}
      data-cy="booking-modal"
      destroyOnClose
      centered
    >
      <div className="flex flex-col gap-8 md:flex-row">
        <img
          alt={hotel.name}
          src={hotel.imageUrl}
          className="h-96 w-full rounded-md object-cover"
        />
        <div>
          <p className="font-bold">{hotel.name}</p>
          <p>{hotel.description}</p>
        </div>
      </div>
      <BookingFormComponent
        booking={currentBookingInfo}
        hotel={hotel}
        initialValues={currentBookingInfo}
        reservedPeriods={periods}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}
