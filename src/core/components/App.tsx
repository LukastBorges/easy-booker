import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ConfigProvider, message } from 'antd'
import { useCallback, useEffect } from 'react'

import BookingModal from 'bookings/components/BookingModal/BookingModal'
import { ANTD_MESSAGE } from 'constants/constants'
import BookingProvider, { defaultContext } from 'core/contexts/Bookings'
import { routeTree } from 'routeTree.gen'
import { subscribe, unsubscribe } from 'utils/customEvents'

const router = createRouter({ routeTree })
const queryClient = new QueryClient()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  const [messageApi, contextHolder] = message.useMessage()

  const handleMessage = useCallback(
    (e: CustomEvent) => {
      messageApi.open(e.detail)
    },
    [messageApi]
  ) as EventListener

  useEffect(() => {
    subscribe(ANTD_MESSAGE, handleMessage)

    return () => unsubscribe(ANTD_MESSAGE, handleMessage)
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BookingProvider initialValue={defaultContext}>
        <ConfigProvider
          theme={{
            token: {
              colorText: '#0f172a',
              fontFamily: 'Noto sans, sans serif'
            }
          }}
        >
          <RouterProvider router={router} />
          <BookingModal />
          {contextHolder}
        </ConfigProvider>
      </BookingProvider>
    </QueryClientProvider>
  )
}
