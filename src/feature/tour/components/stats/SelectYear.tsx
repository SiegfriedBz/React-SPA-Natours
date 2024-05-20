import Select from 'react-select'
import colourStyles from '../../../../ui/utils/reactSelectStyles.utils'

const years = ['2024', '2025']
const yearOptions = years.map((year) => ({
  value: year,
  label: year
}))
type TSelectYearOption = (typeof yearOptions)[number]

type TSelectYearProps = {
  selectedYear: TSelectYearOption
  setSelectedYear: (option: TSelectYearOption) => void
}

const SelectYear = ({ selectedYear, setSelectedYear }: TSelectYearProps) => {
  return (
    <Select
      className="w-32"
      styles={colourStyles<TSelectYearOption>()}
      name="year"
      id="year"
      options={yearOptions}
      value={selectedYear}
      onChange={(option) => {
        setSelectedYear(option as TSelectYearOption)
      }}
    />
  )
}

export default SelectYear
