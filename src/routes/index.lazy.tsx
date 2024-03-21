import { createLazyFileRoute } from '@tanstack/react-router'

import Hotels from 'hotels/pages/Hotels'

export const Route = createLazyFileRoute('/')({
  component: Hotels
})
