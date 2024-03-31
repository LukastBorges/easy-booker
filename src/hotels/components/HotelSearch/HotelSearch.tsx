import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Breakpoint,
  Button,
  DatePicker,
  Form,
  InputNumber,
  Space,
  Tooltip
} from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { Dispatch, memo } from 'react'

import map from 'assets/map.png'
import LocationSelect from 'core/components/LocationSelect/LocationSelect'
import type { ReducerAction, SearchParams } from 'core/contexts/Bookings'
import { useBreakpoints } from 'core/hooks/useBreakpoints'
import type { DateStringTuple, Directions } from 'core/entity/Utils'
import { isDateOnAnyRange } from 'utils/dateUtils'

interface HotelSearchProps {
  reservedPeriods: DateStringTuple[]
  searchParams: SearchParams
  dispatch: Dispatch<ReducerAction>
}

export type SearchForm = {
  location: string
  dateRange: [Dayjs, Dayjs]
  headCount: number
}

const directionBreakpoints: Record<Breakpoint, Directions> = {
  xs: 'vertical',
  sm: 'horizontal',
  md: 'horizontal',
  lg: 'horizontal',
  xl: 'horizontal',
  xxl: 'horizontal'
}

export default memo(function HotelSearch({
  reservedPeriods,
  searchParams,
  dispatch
}: HotelSearchProps) {
  const currentDirection = useBreakpoints(directionBreakpoints)

  const handleSearch = (formData: SearchForm) => {
    dispatch({
      type: 'SET-SEARCH-PARAMS',
      value: {
        ...formData,
        dateRange: formData.dateRange.map((item) =>
          item.toJSON()
        ) as DateStringTuple
      }
    })
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      data-cy="header"
    >
      <p className="mx-4 bg-gradient-to-br from-blue-600 to-violet-400 bg-clip-text text-center font-sans text-5xl font-bold leading-loose text-transparent">
        More than just a stay
      </p>
      <img
        className="absolute size-full object-cover opacity-30 blur-md"
        alt="world map in gray color as background"
        src={map}
      />
      <Form onFinish={handleSearch} className="mx-4">
        <Space.Compact
          className="flex-col sm:flex-row"
          direction={currentDirection}
        >
          <Form.Item className="mb-2 w-full sm:w-56" name="location">
            <LocationSelect />
          </Form.Item>
          <Form.Item
            name="dateRange"
            initialValue={searchParams.dateRange.map((item) => dayjs(item))}
            className="mb-2"
          >
            <DatePicker.RangePicker
              size="large"
              format="MM/DD/YYYY"
              disabledDate={(date) => isDateOnAnyRange(date, reservedPeriods)}
            />
          </Form.Item>
          <Form.Item
            className="mb-2 w-24"
            name="headCount"
            initialValue={searchParams.headCount}
          >
            <InputNumber
              size="large"
              suffix={
                <FontAwesomeIcon icon={faUser} className="text-gray-300" />
              }
            />
          </Form.Item>
          <Tooltip title="Search booking">
            <Button
              data-testid="search-button"
              data-cy="search-button"
              icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              size="large"
              type="primary"
              htmlType="submit"
              className="sm:ml-[-6px]"
            />
          </Tooltip>
        </Space.Compact>
      </Form>
    </div>
  )
})
