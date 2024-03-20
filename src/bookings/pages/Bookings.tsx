import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal, ModalFuncProps, Space, Table, Tooltip } from 'antd'
import { useEffect } from 'react'

import { ANTD_MESSAGE } from 'constants/constants'
import { useBookingContext } from 'core/contexts/Bookings'
import { Booking } from 'bookings/entity/Booking'
import { useDeleteBooking, useGetBookings } from 'bookings/hooks/useBooking'
import {
  dateFormatter,
  dateRangeDurationFormatter,
  dateRangeFormatter
} from 'utils/dateFormatters'
import { moneyFormatter } from 'utils/numberFormatters'
import { fullNameFormatter } from 'utils/stringFormatters'
import { getHotel } from 'hotels/services/Hotel'
import { totalBookingValue } from 'utils/utils'
import { publish } from 'utils/customEvents'

const DeleteModalConfig: ModalFuncProps = {
  title: 'Remove booking',
  content:
    'Are you sure you want to remove this booking? You cannot retrieve it after.',
  okText: 'Yes',
  okType: 'danger',
  okButtonProps: { type: 'primary' },
  cancelText: 'No',
  centered: true
}

export default function Bookings() {
  const { bookings, isLoading, refetch } = useGetBookings()
  const [modal, contextHolder] = Modal.useModal()
  const { hotel, dispatch } = useBookingContext()
  const { handleDelete } = useDeleteBooking()

  const handleEdit = async (booking: Booking) => {
    try {
      const hotel = await getHotel(booking.hotelId)

      dispatch({ type: 'SET-HOTEL', value: hotel })
      dispatch({ type: 'SET-BOOKING', value: booking })
    } catch (e) {
      if (e instanceof Error) {
        publish(ANTD_MESSAGE, {
          key: 'getHotel',
          type: 'error',
          content:
            'Something went wrong while loading Booking hotel info. Please try again later.'
        })
      }
    }
  }

  const onDelete = async (booking: Booking) => {
    const response = await modal.confirm(DeleteModalConfig)

    if (response) {
      await handleDelete(booking.id)
      refetch()
    }
  }

  useEffect(() => {
    !hotel.id && refetch()
  }, [dispatch, hotel.id, refetch])

  useEffect(() => {
    return () => {
      dispatch({ type: 'SET-BOOKING', value: {} })
    }
  }, [dispatch])

  return (
    <>
      <Table
        data-cy="bookings-list"
        title={() => <span className="text-lg font-bold">My bookings</span>}
        dataSource={bookings}
        className="m-auto drop-shadow-md"
        loading={isLoading}
        pagination={{ position: ['bottomCenter'] }}
      >
        <Table.Column
          title="Booking date"
          dataIndex="timestamp"
          key="timestamp"
          render={dateFormatter}
          responsive={['md']}
        />
        <Table.Column
          title="Booking holder"
          key="fullName"
          render={(_, record: Booking) =>
            fullNameFormatter(record.firstName, record.lastName)
          }
        />
        <Table.Column title="Hotel" dataIndex="hotelName" key="hotelName" />
        <Table.Column
          title="Room"
          dataIndex="roomName"
          key="roomName"
          responsive={['lg']}
        />
        <Table.Column
          title="Room rate"
          dataIndex="roomDailyRate"
          key="roomDailyRate"
          render={moneyFormatter}
          responsive={['lg']}
        />
        <Table.Column
          title="People"
          dataIndex="headCount"
          key="headCount"
          responsive={['lg']}
        />
        <Table.Column
          title="Period"
          dataIndex="period"
          key="period"
          render={dateRangeFormatter}
        />
        <Table.Column
          title="Duration"
          dataIndex="period"
          key="duration"
          render={dateRangeDurationFormatter}
          responsive={['lg']}
        />
        <Table.Column
          title="Total cost"
          dataIndex="totalValue"
          key="totalValue"
          responsive={['sm']}
          render={(_, record: Booking) => {
            const totalCost = totalBookingValue(
              record.period,
              record.roomDailyRate
            )

            return moneyFormatter(totalCost)
          }}
        />
        <Table.Column
          title="Action"
          key="action"
          width={56}
          render={(_, record: Booking) => (
            <Space size="middle">
              <Tooltip title="Edit booking">
                <Button
                  data-cy="edit-button"
                  type="primary"
                  shape="circle"
                  icon={<FontAwesomeIcon icon={faPen} />}
                  onClick={() => handleEdit(record)}
                />
              </Tooltip>
              <Tooltip title="Delete booking">
                <Button
                  data-cy="remove-button"
                  type="primary"
                  shape="circle"
                  icon={<FontAwesomeIcon icon={faTrashCan} />}
                  onClick={() => onDelete(record)}
                  danger
                />
              </Tooltip>
            </Space>
          )}
        />
      </Table>
      {contextHolder}
    </>
  )
}
