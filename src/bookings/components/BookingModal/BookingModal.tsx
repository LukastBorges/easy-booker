import { Modal, Button } from 'antd'

import BookingFormComponent from 'bookings/components/BookingForm/BookingForm'
import { REFETCH_HOTELS, RESET_BOOKING_FORM } from 'constants/constants'
import { useBookingContext } from 'core/contexts/Bookings'
import { Booking, BookingForm } from 'bookings/entity/Booking'
import { useBreakpoints } from 'core/hooks/useBreakpoints'
import { useSaveBooking, useUpdateBooking } from 'bookings/hooks/useBooking'
import { mapBookingToApi } from 'bookings/infra/BookingMapper'
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
  const { hotel, booking, searchParams, dispatch } = useBookingContext()
  const currentBreakpoint = useBreakpoints(widthBreakPoints)
  const currentBookingInfo = booking.id
    ? { ...booking, room: { label: booking.roomName, value: booking.roomId } }
    : ({
        headCount: searchParams.headCount,
        period: searchParams.dateRange
      } as Booking)

  const { handleSave } = useSaveBooking()
  const { handleUpdate } = useUpdateBooking()

  const onSubmit = async (formData: BookingForm) => {
    const payload = mapBookingToApi(
      formData,
      hotel,
      'b1d61db7-236f-4f41-a1e4-953dd8a92b88', // Mocked UserID
      booking.id
    )

    if (booking.id) {
      await handleUpdate(payload)
    } else {
      await handleSave(payload, hotel.rooms)
    }

    handleCancel()
    publish(REFETCH_HOTELS, null)
  }

  const handleCancel = () => {
    dispatch({ type: 'SET-HOTEL', value: {} })
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
        onSubmit={onSubmit}
      />
    </Modal>
  )
}
