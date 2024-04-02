import { Layout, Skeleton } from 'antd'
import { useEffect } from 'react'

import { useBookingContext } from 'core/contexts/Bookings'
import Hotel from 'hotels/components/Hotel/Hotel'
import HotelSearch from 'hotels/components/HotelSearch/HotelSearch'
import type { Hotel as HotelType } from 'hotels/entity/Hotel'
import { useGetHotels } from 'hotels/hooks/useHotel'

const SampleLoadingSkeleton = () => (
  <>
    <Layout.Content className="flex flex-col items-center gap-2">
      <Skeleton.Image active={true} />
      <Skeleton.Input active={true} size="small" />
      <Skeleton.Input active={true} size="small" />
      <Skeleton.Input active={true} size="small" />
    </Layout.Content>
    <Layout.Content className="flex flex-col items-center gap-2">
      <Skeleton.Image active={true} />
      <Skeleton.Input active={true} size="small" />
      <Skeleton.Input active={true} size="small" />
      <Skeleton.Input active={true} size="small" />
    </Layout.Content>
    <Layout.Content className="flex flex-col items-center gap-2">
      <Skeleton.Image active={true} />
      <Skeleton.Input active={true} size="small" />
      <Skeleton.Input active={true} size="small" />
      <Skeleton.Input active={true} size="small" />
    </Layout.Content>
    <Layout.Content className="flex flex-col items-center gap-2">
      <Skeleton.Image active={true} />
      <Skeleton.Input active={true} size="small" />
      <Skeleton.Input active={true} size="small" />
      <Skeleton.Input active={true} size="small" />
    </Layout.Content>
  </>
)

export default function Hotels() {
  const hotelId = useBookingContext((state) => state[0].hotel.id)
  const searchParams = useBookingContext((state) => state[0].searchParams)
  const periods = useBookingContext((state) => state[0].periods)
  const dispatch = useBookingContext((state) => state[1])
  const { isLoading, error, hotels, refetch } = useGetHotels(
    searchParams.location
  )
  const selectHotel = (hotel: HotelType) => {
    dispatch({ type: 'SET-HOTEL', value: hotel })
  }

  useEffect(() => {
    !hotelId && refetch()
  }, [hotelId, refetch])

  if (error) return 'An error has occurred: ' + error.message

  return (
    <Layout.Content>
      <HotelSearch
        reservedPeriods={periods}
        searchParams={searchParams}
        dispatch={dispatch}
      />
      <div
        className="mx-16 my-12 flex flex-wrap justify-center gap-8"
        data-cy="hotels-container"
      >
        {isLoading ? (
          <SampleLoadingSkeleton />
        ) : (
          hotels.map((item) => (
            <Hotel key={item.id} hotel={item} onClick={selectHotel} />
          ))
        )}
      </div>
    </Layout.Content>
  )
}
