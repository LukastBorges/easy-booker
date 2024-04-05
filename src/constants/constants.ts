import dayjs from 'dayjs'

// Base URL for dev run
export const BASE_URL = 'http://localhost:3000'

// ANT Design Message component
export const ANTD_MESSAGE = 'message-notification'

// CRUD booking related
export const REFETCH_HOTELS = 'refetch-hotels'
export const SAVE_BOOKING = 'save-booking'
export const UPDATE_BOOKING = 'update-booking'
export const DELETE_BOOKING = 'delete-booking'

export const RESET_PERIODS = 'reset-periods'

// Mocked userId since login feature are not implemented at this moment
export const USER_ID = 'b1d61db7-236f-4f41-a1e4-953dd8a92b88'

// Date (DayJS) related
export const TODAY = dayjs()
export const YEAR_FROM_TODAY = dayjs().add(1, 'year')
