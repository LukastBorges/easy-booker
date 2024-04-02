import { useMutation, useQuery } from '@tanstack/react-query'
import { Progress } from 'antd'
import { useCallback } from 'react'

import type { Booking, BookingPayload } from 'bookings/entity/Booking'
import {
  saveBooking,
  getBookings,
  updateBooking,
  deleteBooking
} from 'bookings/services/Booking'
import {
  ANTD_MESSAGE,
  REFETCH_HOTELS,
  RESET_PERIODS
} from 'constants/constants'
import { useBookingContext } from 'core/contexts/Bookings'
import { usePatchHotel } from 'hotels/hooks/useHotel'
import type { Room } from 'hotels/entity/Hotel'
import { publish } from 'utils/customEvents'
import { isPeriodOverlap } from 'utils/dateUtils'

const getRoomsAfterBooked = (rooms: Room[], roomId: string) => {
  return rooms.map((item) => {
    if (item.id === roomId) {
      return { ...item, roomsAvailable: item.roomsAvailable - 1 }
    }
    return item
  })
}

export function useGetBookings(userId: string) {
  const query = `?userId=${userId}`
  const {
    isLoading,
    error,
    data = [],
    refetch
  } = useQuery({
    queryKey: ['getBookings', query],
    queryFn: () => getBookings(query)
  })

  const bookings = data as Booking[]

  return { isLoading, error, refetch, bookings }
}

export function useSaveBooking() {
  const { isPending, error, mutateAsync } = useMutation({
    mutationFn: saveBooking
  })
  const { handlePatch: patchHotel } = usePatchHotel()
  const periods = useBookingContext((state) => state[0].periods)

  const handleSave = useCallback(
    async (booking: BookingPayload, rooms: Room[], callback: () => void) => {
      const key = 'bookingSave'
      const roomsReduced = getRoomsAfterBooked(rooms, booking.roomId)

      publish(ANTD_MESSAGE, {
        key,
        type: 'loading',
        content: <Progress type="circle" />
      })
      try {
        const isBookingOverlap = isPeriodOverlap(booking.period, periods)

        if (isBookingOverlap) {
          throw Error('Reservation period is overlapping with another booking')
        }

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
        publish(REFETCH_HOTELS, null)
        publish(RESET_PERIODS, null)
        callback()
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
    [mutateAsync, patchHotel, periods]
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
  const periods = useBookingContext((state) => state[0].periods)

  const handleUpdate = useCallback(
    async (booking: BookingPayload, callback: () => void) => {
      const key = 'bookingUpdate'

      publish(ANTD_MESSAGE, {
        key,
        type: 'loading',
        content: <Progress type="circle" />
      })
      try {
        const isBookingOverlap = isPeriodOverlap(booking.period, periods)

        if (isBookingOverlap) {
          throw Error('Reservation period is overlapping with another booking')
        }

        await mutateAsync(booking)
        publish(ANTD_MESSAGE, {
          key,
          type: 'success',
          content: 'Booking updated successfully'
        })
        publish(REFETCH_HOTELS, null)
        publish(RESET_PERIODS, null)
        callback()
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
    [mutateAsync, periods]
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
        publish(RESET_PERIODS, null)
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
