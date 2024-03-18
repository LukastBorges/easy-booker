import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'

import Navbar from './Navbar'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children }: { children: ReactNode }) => <a>{children}</a>
}))

describe('<Navbar />', () => {
  it('renders navbar correctly', () => {
    render(<Navbar />)

    // Assert logo is visible
    const logo = screen.getByAltText('easy booker logo')
    expect(logo).toBeVisible()

    // Assert title is visible
    const title = screen.getByText('easy booker')
    expect(title).toBeVisible()

    // Assert links are visible
    const hotelsLink = screen.getByText('Hotels')
    const bookingsLink = screen.getByText('Bookings')
    expect(hotelsLink).toBeVisible()
    expect(bookingsLink).toBeVisible()

    // Assert avatar image is visible
    const avatar = screen.getByRole('img')
    expect(avatar).toBeVisible()
  })
})
