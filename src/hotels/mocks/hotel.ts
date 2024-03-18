export const mockedHotels = [
  {
    id: 'b1d61db7-236f-4f41-a1e4-953dd8a92b61',
    name: 'Sea Breeze Resort',
    location: {
      country: 'United States',
      state: 'California',
      city: 'Santa Monica',
      address: '123 Ocean View Ave'
    },
    imageUrl:
      'https://images.pexels.com/photos/2227774/pexels-photo-2227774.jpeg',
    description:
      'Experience the refreshing ocean breeze and luxury accommodations at Sea Breeze Resort in the heart of Santa Monica. With 15 available rooms, indulge in coastal comfort and stunning views.',
    rooms: [
      {
        id: '0e33b3c6-288d-4569-bad1-47242959aef2',
        name: 'Standard Room',
        dailyRate: 200,
        roomCapacity: 2,
        roomsAvailable: 1
      },
      {
        id: '33e4a750-1999-47db-b442-e4a839098134',
        name: 'Ocean View Suite',
        dailyRate: 400,
        roomCapacity: 4,
        roomsAvailable: 0
      }
    ]
  },
  {
    id: '63e9b3f7-9f9b-4e45-b3d1-0d303b6f6f27',
    name: 'Mountain Lodge Retreat',
    location: {
      country: 'Canada',
      state: 'British Columbia',
      city: 'Whistler',
      address: '456 Pine Tree Rd'
    },
    imageUrl:
      'https://images.pexels.com/photos/5651729/pexels-photo-5651729.jpeg',
    description:
      'Embrace the serene beauty of the mountains at Mountain Lodge Retreat in Whistler. Nestled among the pines, this retreat offers 20 cozy rooms, perfect for a tranquil escape into nature.',
    rooms: [
      {
        id: '33e4a750-1999-47db-b442-e4a750199985',
        name: 'Luxury Cabin',
        dailyRate: 700,
        roomCapacity: 4,
        roomsAvailable: 0
      }
    ]
  }
]

export const mockedHotel = mockedHotels[0]

export const mockedRooms = mockedHotel.rooms
