import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import { Mock } from 'vitest'

import {
  useGetBookings,
  useSaveBooking,
  useUpdateBooking,
  useDeleteBooking
} from './useBooking'
import {
  saveBooking,
  getBookings,
  updateBooking,
  deleteBooking
} from 'bookings/services/Booking'
import { mockedBooking } from 'bookings/mocks/Booking'
import { mockedRooms } from 'hotels/mocks/hotel'

vi.mock('bookings/services/Booking', () => ({
  getBookings: vi.fn(),
  saveBooking: vi.fn(),
  updateBooking: vi.fn(),
  deleteBooking: vi.fn()
}))
vi.mock('hotels/hooks/useHotel', () => ({
  usePatchHotel: () => ({ handlePatch: vi.fn() })
}))

const mockedGetBookings = getBookings as Mock
const mockedSaveBooking = saveBooking as Mock
const mockedUpdateBooking = updateBooking as Mock
const mockedDeleteBooking = deleteBooking as Mock

const sampleError = new Error('Network error')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useGetBookings', () => {
  it('fetches bookings and returns data', async () => {
    const mockData = [{ id: 'booking1' }, { id: 'booking2' }]
    mockedGetBookings.mockResolvedValueOnce(mockData)

    const { result } = renderHook(() => useGetBookings(), { wrapper })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.bookings).toEqual(mockData)
  })

  it('rejects get booking', async () => {
    mockedGetBookings.mockRejectedValueOnce(sampleError)

    const { result } = renderHook(() => useGetBookings(), { wrapper })

    await waitFor(() => expect(result.current.error).toBeTruthy())

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toEqual(sampleError)
  })
})

describe('useSaveBooking', () => {
  it('saves booking successfully', async () => {
    mockedSaveBooking.mockReturnValueOnce(201)

    const { result } = renderHook(() => useSaveBooking(), { wrapper })
    const newBooking = { ...mockedBooking, id: undefined }

    await result.current.handleSave(newBooking, mockedRooms)

    await waitFor(() => expect(result.current.isPending).toBe(false))

    expect(mockedSaveBooking).toHaveBeenLastCalledWith(newBooking)
    expect(result.current.error).toBeNull()
  })

  it('rejects save booking', async () => {
    mockedSaveBooking.mockRejectedValueOnce(sampleError)

    const { result } = renderHook(() => useSaveBooking(), { wrapper })
    const newBooking = { ...mockedBooking, id: undefined }

    await result.current.handleSave(newBooking, mockedRooms)
    await waitFor(() => expect(result.current.error).toBeTruthy())

    expect(result.current.isPending).toBe(false)
    expect(result.current.error).toEqual(sampleError)
  })
})

describe('useUpdateBooking', () => {
  it('updates booking successfully', async () => {
    mockedUpdateBooking.mockReturnValueOnce(201)

    const { result } = renderHook(() => useUpdateBooking(), { wrapper })
    const newBooking = { ...mockedBooking, id: undefined }

    await result.current.handleUpdate(newBooking)

    await waitFor(() => expect(result.current.isPending).toBe(false))

    expect(mockedUpdateBooking).toHaveBeenLastCalledWith(newBooking)
    expect(result.current.error).toBeNull()
  })

  it('rejects update booking', async () => {
    mockedUpdateBooking.mockRejectedValueOnce(sampleError)

    const { result } = renderHook(() => useUpdateBooking(), { wrapper })
    const newBooking = { ...mockedBooking, id: undefined }

    await result.current.handleUpdate(newBooking)
    await waitFor(() => expect(result.current.error).toBeTruthy())

    expect(result.current.isPending).toBe(false)
    expect(result.current.error).toEqual(sampleError)
  })
})

describe('useDeleteBooking', () => {
  it('deletes booking successfully', async () => {
    mockedDeleteBooking.mockReturnValueOnce(201)

    const { result } = renderHook(() => useDeleteBooking(), { wrapper })

    await result.current.handleDelete(mockedBooking.id)
    await waitFor(() => expect(result.current.isPending).toBe(false))

    expect(mockedDeleteBooking).toHaveBeenLastCalledWith(mockedBooking.id)
    expect(result.current.error).toBeNull()
  })

  it('rejects delete booking', async () => {
    mockedDeleteBooking.mockRejectedValueOnce(sampleError)

    const { result } = renderHook(() => useDeleteBooking(), { wrapper })

    await result.current.handleDelete(mockedBooking.id)
    await waitFor(() => expect(result.current.error).toBeTruthy())

    expect(result.current.isPending).toBe(false)
    expect(result.current.error).toEqual(sampleError)
  })
})
