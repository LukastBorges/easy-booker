import { Router, RouterProvider, createRouter } from '@tanstack/react-router'
import { message } from 'antd'
import { useCallback, useEffect } from 'react'

import BookingModal from 'bookings/components/BookingModal/BookingModal'
import { ANTD_MESSAGE, RESET_PERIODS, USER_ID } from 'constants/constants'
import { useSetPeriods } from 'core/hooks/useReservedPeriod'
import { routeTree } from 'routeTree.gen'
import { subscribe, unsubscribe } from 'utils/customEvents'

const router = createRouter({
  routeTree
})

declare module '@tanstack/react-router' {
  interface Register {
    router: Router
  }
}

export default function App() {
  const [messageApi, contextHolder] = message.useMessage()
  const { refetch } = useSetPeriods(USER_ID)

  const handleMessage = useCallback(
    (e: CustomEvent) => {
      messageApi.open(e.detail)
    },
    [messageApi]
  ) as EventListener

  const handleRefetchPeriods = useCallback(() => {
    refetch()
  }, [refetch]) as EventListener

  useEffect(() => {
    subscribe(ANTD_MESSAGE, handleMessage)

    return () => unsubscribe(ANTD_MESSAGE, handleMessage)
  }, [handleMessage])

  useEffect(() => {
    subscribe(RESET_PERIODS, handleRefetchPeriods)

    return () => unsubscribe(RESET_PERIODS, handleRefetchPeriods)
  }, [handleRefetchPeriods])

  return (
    <>
      <RouterProvider router={router} />
      <BookingModal />
      {contextHolder}
    </>
  )
}
