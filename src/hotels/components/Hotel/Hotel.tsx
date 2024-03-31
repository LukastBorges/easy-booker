import { Card } from 'antd'

import type { Hotel } from 'hotels/entity/Hotel'
import { locationFormatter } from 'hotels/presenters/hotelPresenters'
import { sumListProp } from 'utils/utils'

interface HotelProps {
  hotel: Hotel
  onClick: (value: Hotel) => void
}

export default function Hotel({ hotel, onClick }: HotelProps) {
  const roomsAvailable = sumListProp(hotel.rooms, 'roomsAvailable')

  return (
    <Card
      data-testid="hotel-card"
      hoverable={!!roomsAvailable}
      className={`w-80 justify-end ${
        roomsAvailable === 0 ? 'pointer-events-none saturate-0' : ''
      }`}
      cover={
        <img
          alt={hotel.name}
          src={hotel.imageUrl}
          className="h-72 object-cover"
        />
      }
      onClick={() => onClick(hotel)}
    >
      <Card.Meta title={hotel.name} description={hotel.description} />
      <p className="mt-3">{locationFormatter(hotel)}</p>
      <p className="mt-4">Rooms available: {roomsAvailable}</p>
    </Card>
  )
}
