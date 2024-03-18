import { render, screen } from '@testing-library/react'

import LocationSelect from './LocationSelect'
import userEvent from '@testing-library/user-event'

describe('LocationSelect', () => {
  it('renders select with placeholder and options', async () => {
    render(<LocationSelect virtual={false} />)

    const selectElement = screen.getByTestId('location-select')
      .firstElementChild as Element
    expect(selectElement).toBeInTheDocument()

    await userEvent.click(selectElement)

    const options = screen.getAllByRole('option')

    expect(options).toHaveLength(6)
  })

  it('calls onChange when an option is selected', async () => {
    const handleChange = vi.fn()
    render(<LocationSelect onChange={handleChange} />)

    const selectElement = screen.getByTestId('location-select')
      .firstElementChild as Element

    await userEvent.click(selectElement)
    await userEvent.click(await screen.findByText('Greece'))

    expect(handleChange).toHaveBeenCalledWith('greece', {
      label: 'Greece',
      value: 'greece'
    })
  })
})
