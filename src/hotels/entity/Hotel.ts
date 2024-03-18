export type Location = {
  country: string
  state: string
  city: string
  address: string
}

export type Room = {
  id: string
  name: string
  dailyRate: number
  roomCapacity: number
  roomsAvailable: number
}

export type Hotel = {
  id: string
  name: string
  location: Location
  imageUrl: string
  description: string
  rooms: Room[]
}

export type RawHotel = {
  id: string
  name: string
  location: Location
  imageUrl: string
  description: string
  rooms: Room[]
}

export type HotelPayload = {
  id?: string
  name: string
  location: Location
  imageUrl: string
  description: string
  rooms: Room[]
}
