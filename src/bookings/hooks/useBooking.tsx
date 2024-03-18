import { useMutation, useQuery } from '@tanstack/react-query'
import { Progress } from 'antd'
import { useCallback } from 'react'

import { usePatchHotel } from 'hotels/hooks/useHotel'

import { ANTD_MESSAGE } from 'constants/constants'
import { Booking, BookingPayload } from 'bookings/entity/Booking'
import { Room } from 'hotels/entity/Hotel'
import {
  saveBooking,
  getBookings,
  updateBooking,
  deleteBooking
} from 'bookings/services/Booking'
import { publish } from 'utils/customEvents'

const getRoomsAfterBooked = (rooms: Room[], roomId: string) => {
  return rooms.map((item) => {
    if (item.id === roomId) {
      return { ...item, roomsAvailable: item.roomsAvailable - 1 }
    }
    return item
  })
}

export function useGetBookings() {
  const {
    isLoading,
    error,
    data = [],
    refetch
  } = useQuery({
    queryKey: ['getBookings'],
    queryFn: getBookings
  })

  const bookings = data as Booking[]

  return { isLoading, error, refetch, bookings }
}

export function useSaveBooking() {
  const { isPending, error, mutateAsync } = useMutation({
    mutationFn: saveBooking
  })
  const { handlePatch: patchHotel } = usePatchHotel()

  const handleSave = useCallback(
    async (booking: BookingPayload, rooms: Room[]) => {
      const key = 'bookingSave'
      const roomsReduced = getRoomsAfterBooked(rooms, booking.roomId)

      publish(ANTD_MESSAGE, {
        key,
        type: 'loading',
        content: <Progress type="circle" />
      })
      try {
        await mutateAsync(booking)
        await patchHotel({
          id: booking.hotelId,
          data: { rooms: roomsReduced }
        })
        publish(ANTD_MESSAGE, {
          key,
          type: 'success',
          content: 'Booking saved successfully'
        })
      } catch (e) {
        if (e instanceof Error) {
          publish(ANTD_MESSAGE, {
            key,
            type: 'error',
            content: e.message
          })
        }
      }
    },
    [mutateAsync, patchHotel]
  )

  return {
    isPending,
    error,
    handleSave
  }
}

export function useUpdateBooking() {
  const { isPending, error, mutateAsync } = useMutation({
    mutationFn: updateBooking
  })

  const handleUpdate = useCallback(
    async (booking: BookingPayload) => {
      const key = 'bookingUpdate'

      publish(ANTD_MESSAGE, {
        key,
        type: 'loading',
        content: <Progress type="circle" />
      })
      try {
        await mutateAsync(booking)
        publish(ANTD_MESSAGE, {
          key,
          type: 'success',
          content: 'Booking updated successfully'
        })
      } catch (e) {
        if (e instanceof Error) {
          publish(ANTD_MESSAGE, {
            key,
            type: 'error',
            content: e.message
          })
        }
      }
    },
    [mutateAsync]
  )

  return {
    isPending,
    error,
    handleUpdate
  }
}

export function useDeleteBooking() {
  const { isPending, error, mutateAsync } = useMutation({
    mutationFn: deleteBooking
  })

  const handleDelete = useCallback(
    async (id: string) => {
      const key = 'deleteBooking'
      try {
        await mutateAsync(id)
        publish(ANTD_MESSAGE, {
          key,
          type: 'success',
          content: 'Booking removed successfully'
        })
      } catch (e) {
        if (e instanceof Error) {
          publish(ANTD_MESSAGE, {
            key,
            type: 'error',
            content: e.message
          })
        }
      }
    },
    [mutateAsync]
  )

  return {
    isPending,
    error,
    handleDelete
  }
}
