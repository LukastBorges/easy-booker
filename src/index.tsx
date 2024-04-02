import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Alert, ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { createRoot } from 'react-dom/client'

import 'tailwindcss/tailwind.css'

import App from 'core/components/App'
import BookingProvider from 'core/contexts/Bookings'

dayjs.extend(isBetween)

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)
const queryClient = new QueryClient()

root.render(
  <Alert.ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BookingProvider>
        <ConfigProvider
          theme={{
            token: {
              colorText: '#0f172a',
              fontFamily: 'Noto sans, sans serif'
            }
          }}
        >
          <App />
        </ConfigProvider>
      </BookingProvider>
    </QueryClientProvider>
  </Alert.ErrorBoundary>
)
