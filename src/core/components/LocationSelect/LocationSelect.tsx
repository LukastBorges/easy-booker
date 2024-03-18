import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Select, SelectProps } from 'antd'

const LocationOptions = [
  {
    value: 'united states',
    label: 'United States'
  },
  {
    value: 'canada',
    label: 'Canada'
  },
  {
    value: 'greece',
    label: 'Greece'
  },
  {
    value: 'australia',
    label: 'Australia'
  },
  {
    value: 'thailand',
    label: 'Thailand'
  },
  {
    value: 'japan',
    label: 'Japan'
  }
]

export default function LocationSelect(props: SelectProps) {
  return (
    <Select
      id="location-select"
      data-testid="location-select"
      data-cy="location-select"
      options={LocationOptions}
      placeholder="Select a place"
      suffixIcon={
        <FontAwesomeIcon icon={faLocationDot} className="text-gray-300" />
      }
      size="large"
      {...props}
    />
  )
}
