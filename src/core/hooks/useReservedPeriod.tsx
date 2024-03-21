import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { Booking } from 'bookings/entity/Booking'
import { getBookings } from 'bookings/services/Booking'
import { ANTD_MESSAGE } from 'constants/constants'
import { useBookingContext } from 'core/contexts/Bookings'
import { publish } from 'utils/customEvents'
import { DateStringTuple } from 'core/entities/Utils'

export function useSetPeriods(userId: string, bookingId?: string) {
  const { dispatch } = useBookingContext()
  const query = `?userId=${userId}`
  const {
    error,
    data = [],
    refetch
  } = useQuery({
    queryKey: ['getBookings', query],
    queryFn: () => getBookings(query)
  })

  if (error) {
    publish(ANTD_MESSAGE, {
      key: 'bookingPeriodsError',
      type: 'error',
      content: error.message
    })
  }

  useEffect(() => {
    if (data.length) {
      const bookings = data as Booking[]
      const periods = bookings.reduce((acc, item) => {
        if (item.id !== bookingId) {
          acc.push(item.period)
        }
        return acc
      }, [] as DateStringTuple[])

      dispatch({ type: 'SET-PERIODS', value: periods })
    }
  }, [data, bookingId, dispatch])

  return { refetch }
}
