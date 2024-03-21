import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

import '@testing-library/jest-dom/vitest'

dayjs.extend(isBetween)
