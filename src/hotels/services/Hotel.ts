import axios, { AxiosResponse } from 'axios'

import { BASE_URL } from 'constants/constants'
import type { Hotel } from 'hotels/entity/Hotel'
import { mapApiToHotel } from 'hotels/infra/HotelMapper'

export async function getHotel(id: string): Promise<Hotel> {
  const response: AxiosResponse = await axios.get(
    `${BASE_URL}/properties/${id}`
  )
  return mapApiToHotel(response.data)
}

export async function getHotels(query?: string): Promise<Hotel[]> {
  const response: AxiosResponse = await axios.get(
    `${BASE_URL}/properties${query}`
  )
  const hotels = response.data.map(mapApiToHotel)

  return hotels
}

export async function patchHotel({
  id,
  data
}: {
  id: string
  data: Partial<Hotel>
}): Promise<number> {
  const response: AxiosResponse = await axios.patch(
    `${BASE_URL}/properties/${id}`,
    { ...data }
  )

  return response.status
}
