import { createLazyFileRoute } from '@tanstack/react-router'

import HotelSearch from 'hotels/components/HotelSearch/HotelSearch'
import Hotels from 'hotels/pages/Hotels'

export const Route = createLazyFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <>
      <HotelSearch />
      <Hotels />
    </>
  )
}
