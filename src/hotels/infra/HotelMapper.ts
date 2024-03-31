import type { Hotel, HotelPayload, RawHotel } from 'hotels/entity/Hotel'

export function mapHotelToApi(hotel: Partial<Hotel>): Partial<HotelPayload> {
  return {
    id: hotel.id,
    name: hotel.name,
    location: hotel.location,
    imageUrl: hotel.imageUrl,
    description: hotel.description,
    rooms: hotel.rooms
  }
}

export function mapApiToHotel(hotel: RawHotel): Hotel {
  return {
    id: hotel.id,
    name: hotel.name,
    location: hotel.location,
    imageUrl: hotel.imageUrl,
    description: hotel.description,
    rooms: hotel.rooms
  }
}
