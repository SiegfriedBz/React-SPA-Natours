import Select from 'react-select'
import colourStyles from '../../../../../ui/utils/reactSelectStyles.utils'
import {
  distanceUnitOptions,
  type TDistanceUnitOption
} from './distanceUnitOptions'

type TProps = {
  selectedUnit: TDistanceUnitOption | null
  setSelectedUnit: (value: TDistanceUnitOption | null) => void
}

const SelectDistanceUnit = ({ selectedUnit, setSelectedUnit }: TProps) => {
  return (
    <>
      <label htmlFor="unit">Unit</label>
      <Select<TDistanceUnitOption, false>
        styles={colourStyles<TDistanceUnitOption>()}
        name="unit"
        id="unit"
        defaultValue={selectedUnit}
        onChange={setSelectedUnit}
        options={distanceUnitOptions}
        isClearable={true}
      />
    </>
  )
}

export default SelectDistanceUnit
