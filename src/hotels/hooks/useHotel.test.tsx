import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Mock } from 'vitest'

import { useGetHotel, useGetHotels, usePatchHotel } from './useHotel'

import { getHotel, getHotels, patchHotel } from 'hotels/services/Hotel'
import { mockedHotel, mockedHotels } from 'hotels/mocks/hotel'

const sampleError = new Error('Network error')

vi.mock('hotels/services/Hotel', () => ({
  getHotel: vi.fn(),
  getHotels: vi.fn(),
  patchHotel: vi.fn()
}))

const mockedGetHotel = getHotel as Mock
const mockedGetHotels = getHotels as Mock
const mockedPatchHotel = patchHotel as Mock

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

describe('useGetHotel', () => {
  it('fetches hotel by id', async () => {
    mockedGetHotel.mockResolvedValueOnce(mockedHotel)

    const { result } = renderHook(() => useGetHotel(mockedHotel.id), {
      wrapper
    })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.hotel).toEqual(mockedHotel)
  })

  it('rejects get hotel', async () => {
    mockedGetHotel.mockRejectedValueOnce(sampleError)

    const { result } = renderHook(() => useGetHotel(mockedHotel.id), {
      wrapper
    })

    await waitFor(() => expect(result.current.error).toBeTruthy())

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toEqual(sampleError)
  })
})

describe('useGetHotels', () => {
  it('fetches hotels with optional search parameter', async () => {
    mockedGetHotels.mockResolvedValueOnce([mockedHotel])

    const { result } = renderHook(
      () => useGetHotels(mockedHotel.location.country),
      {
        wrapper
      }
    )

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.hotels).toEqual([mockedHotel])
  })

  it('fetches hotels without query params', async () => {
    mockedGetHotels.mockResolvedValueOnce(mockedHotels)

    const { result } = renderHook(() => useGetHotels(), {
      wrapper
    })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.hotels).toEqual(mockedHotels)
  })

  it('rejects get hotels', async () => {
    mockedGetHotels.mockRejectedValueOnce(sampleError)

    const { result } = renderHook(() => useGetHotels(), { wrapper })

    await waitFor(() => expect(result.current.error).toBeTruthy())

    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toEqual(sampleError)
  })
})

describe('usePatchHotel', () => {
  it('patches hotel data', async () => {
    mockedPatchHotel.mockReturnValueOnce(201)

    const { result } = renderHook(() => usePatchHotel(), { wrapper })
    const sampleHotelChange = {
      id: mockedHotel.id,
      data: { name: 'Test name' }
    }

    await result.current.handlePatch(sampleHotelChange)

    await waitFor(() => expect(result.current.isPending).toBe(false))

    expect(mockedPatchHotel).toHaveBeenLastCalledWith(sampleHotelChange)
    expect(result.current.error).toBeNull()
  })
})
