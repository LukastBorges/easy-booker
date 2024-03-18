import { createLazyFileRoute } from '@tanstack/react-router'

import BookingsList from 'bookings/pages/Bookings'

export const Route = createLazyFileRoute('/bookings')({
  component: Bookings
})

function Bookings() {
  return (
    <div className="mx-4 my-8 flex flex-wrap gap-8">
      <BookingsList />
    </div>
  )
}
