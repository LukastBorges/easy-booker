import { Room } from 'hotels/entity/Hotel'
import { moneyFormatter } from 'utils/numberFormatters'

export function getHotelRoomLabel(room: Room) {
  return `${room.name} (${room.roomCapacity} people, ${room.dailyRate}/day)`
}

export function getBookingTotalCost(totalValue: number) {
  return `Total cost: ${moneyFormatter(totalValue)}`
}
