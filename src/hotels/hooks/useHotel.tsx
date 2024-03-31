import { useMutation, useQuery } from '@tanstack/react-query'

import type { Hotel } from 'hotels/entity/Hotel'
import { capitalize } from 'utils/stringUtils'
import { getHotels, getHotel, patchHotel } from 'hotels/services/Hotel'

export function useGetHotel(id: string) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['getHotel', id],
    queryFn: () => getHotel(id || 'none')
  })

  const hotel = (data || {}) as Hotel

  return { isLoading, error, hotel }
}

export function useGetHotels(search?: string | null) {
  const query = search ? `?location.country=${capitalize(search)}` : ''
  const {
    isLoading,
    error,
    data = [],
    refetch
  } = useQuery({
    queryKey: ['getHotels', query],
    queryFn: () => getHotels(query)
  })

  const hotels = data as Hotel[]

  return { isLoading, error, hotels, refetch }
}

export function usePatchHotel() {
  const { error, isPending, mutateAsync } = useMutation({
    mutationFn: patchHotel
  })

  return { error, isPending, handlePatch: mutateAsync }
}
