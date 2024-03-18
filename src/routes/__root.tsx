import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Layout } from 'antd'

import Navbar from 'core/components/Navbar/Navbar'

export const Route = createRootRoute({
  component: () => (
    <Layout.Content className="flex min-h-[100vh] flex-col bg-slate-200">
      <Navbar />
      <Outlet />
    </Layout.Content>
  )
})
