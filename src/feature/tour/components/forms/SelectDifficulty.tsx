import Select from 'react-select'
import colourStyles from '../../../../ui/utils/reactSelectStyles.utils'
import type { TSelectOption } from './searchForms/types'
import { difficultyOptions } from './difficultyOptions'

type TProps = {
  selectedDifficulty: TSelectOption | null
  setSelectedDifficulty: (option: TSelectOption | null) => void
  onBlur?: () => void
}

const SelectDifficulty = ({
  selectedDifficulty,
  setSelectedDifficulty,
  onBlur
}: TProps) => {
  return (
    <>
      <label htmlFor="difficulty">Difficulty</label>
      <Select<TSelectOption, false>
        styles={colourStyles<TSelectOption>()}
        name="difficulty"
        id="difficulty"
        value={selectedDifficulty}
        onChange={setSelectedDifficulty}
        onBlur={onBlur}
        options={difficultyOptions}
        isClearable={true}
      />
    </>
  )
}

export default SelectDifficulty
