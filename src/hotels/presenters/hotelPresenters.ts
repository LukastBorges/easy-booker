import { Hotel } from 'hotels/entity/Hotel'

export function locationFormatter(hotel: Hotel) {
  return `${hotel.location.city}, ${hotel.location.country}`
}
