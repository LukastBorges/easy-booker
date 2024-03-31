import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DatePicker, Form, Input, InputNumber, Layout, Select } from 'antd'
import dayjs from 'dayjs'
import { memo, useEffect, useState } from 'react'

import type {
  Booking,
  BookingForm as BookingFormType,
  InitialBookingFormValues
} from 'bookings/entity/Booking'
import {
  getBookingTotalCost,
  getHotelRoomLabel
} from 'bookings/presenters/bookingPresenters'
import { RESET_BOOKING_FORM, TODAY, YEAR_FROM_TODAY } from 'constants/constants'
import { DateStringTuple, DateTuple, Option } from 'core/entity/Utils'
import type { Hotel, Room } from 'hotels/entity/Hotel'
import { findByKey, totalBookingValue } from 'utils/utils'
import { subscribe, unsubscribe } from 'utils/customEvents'
import { getTypedDateRange } from 'utils/dateUtils'
import { isDateOnAnyRange } from 'utils/dateUtils'

interface BookingFormProps {
  booking: Booking
  hotel: Hotel
  initialValues: InitialBookingFormValues
  reservedPeriods: DateStringTuple[]
  onSubmit: (formData: BookingFormType) => void
}

type FormFieldData = {
  name: string
  value?: unknown
}

export default memo(function BookingForm({
  booking,
  hotel,
  initialValues,
  reservedPeriods,
  onSubmit
}: BookingFormProps) {
  const [form] = Form.useForm()
  const [headCount, setHeadCount] = useState(booking?.headCount || 0)
  const [dailyRate, setDailyRate] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  const isUpdate = !!booking.id

  const handleChanges = (
    fields: FormFieldData[],
    allFields: FormFieldData[]
  ) => {
    setTotalValue(totalBookingValue(allFields[0].value as DateTuple, dailyRate))
  }

  const handleHeadCountChange = (value: number | null) => {
    setHeadCount(value || 0)
    setDailyRate(0)
    form.setFieldValue('room', null)
  }

  const handleRoomChange = (roomOption: Option) => {
    const room = findByKey(hotel.rooms, 'id', roomOption.value) as Room

    setDailyRate(room.dailyRate)
  }

  useEffect(() => {
    const updatedPeriod = booking.period.map((item) => dayjs(item)) as DateTuple
    const selectedRoom = findByKey(hotel.rooms, 'id', booking.roomId)
    const dailyRate = selectedRoom ? selectedRoom.dailyRate : 0
    const totalCost = totalBookingValue(updatedPeriod, dailyRate)

    setDailyRate(dailyRate)
    setTotalValue(totalCost)
  }, [booking.period, booking.roomId, hotel.rooms])

  useEffect(() => {
    const callback = () => {
      form.resetFields()
    }

    subscribe(RESET_BOOKING_FORM, callback)

    return () => unsubscribe(RESET_BOOKING_FORM, callback)
  }, [form])

  return (
    <Layout.Content>
      <Form
        id="bookingForm"
        layout="vertical"
        className="mt-4 flex flex-wrap gap-x-4"
        onFinish={onSubmit}
        form={form}
        onFieldsChange={handleChanges}
        initialValues={{
          ...initialValues,
          period: getTypedDateRange(initialValues.period)
        }}
      >
        <Form.Item
          label="Reservation period"
          name="period"
          rules={[{ required: true }]}
          className="w-56"
        >
          <DatePicker.RangePicker
            data-cy="range-date-picker"
            minDate={TODAY}
            maxDate={YEAR_FROM_TODAY}
            size="middle"
            format="MM/DD/YYYY"
            disabledDate={(date) => isDateOnAnyRange(date, reservedPeriods)}
          />
        </Form.Item>
        <Form.Item
          label="Room"
          name="room"
          rules={[{ required: true }]}
          className="min-w-full flex-1 sm:min-w-60"
        >
          <Select
            data-cy="room-select"
            onChange={handleRoomChange}
            disabled={isUpdate}
            data-testid="room-select"
            labelInValue
          >
            {hotel.rooms.map((item) => (
              <Select.Option
                key={item.id}
                label={item.name}
                value={item.id}
                disabled={
                  item.roomCapacity < headCount || item.roomsAvailable === 0
                }
              >
                {getHotelRoomLabel(item)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Headcount"
          name="headCount"
          rules={[{ required: true }]}
        >
          <InputNumber
            data-cy="headcount-input"
            size="middle"
            onChange={handleHeadCountChange}
            disabled={isUpdate}
            suffix={<FontAwesomeIcon icon={faUser} className="text-gray-300" />}
          />
        </Form.Item>
        <Form.Item
          label="First name"
          name="firstName"
          rules={[{ required: true }]}
          className="flex-1 sm:min-w-36"
        >
          <Input data-cy="firstName-input" />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="lastName"
          rules={[{ required: true }]}
          className="flex-1 sm:min-w-36"
        >
          <Input data-cy="lastName-input" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true }]}
          className="sm:min-w-56"
        >
          <Input type="email" data-cy="email-input" />
        </Form.Item>
        <Form.Item
          label="Country/Region"
          name="location"
          rules={[{ required: true }]}
        >
          <Input data-cy="location-input" />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[{ required: true }]}
        >
          <Input type="tel" data-cy="phoneNumber-input" />
        </Form.Item>
        <div className="my-auto flex-1 text-right">
          <p className="font-bold">{getBookingTotalCost(totalValue)}</p>
        </div>
      </Form>
    </Layout.Content>
  )
})
