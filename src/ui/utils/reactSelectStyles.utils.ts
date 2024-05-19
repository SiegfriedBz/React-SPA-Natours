import { StylesConfig } from 'react-select'

const focusedBorderColor = '1px solid #7ad197'
const defaultBorderColor = '1px solid #57534e'

const colourStyles = <TOption>(): StylesConfig<TOption, boolean> => ({
  option: (styles, { isSelected }) => {
    const selectedColor = '#7ad197'
    const defaultColor = '#f5f5f4'
    return {
      ...styles,
      backgroundColor: isSelected ? selectedColor : defaultColor,
      color: isSelected ? defaultColor : '#57534e',
      fontWeight: isSelected ? 'bold' : 'normal'
    }
  },
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: '#f5f5f4',
    boxShadow: 'none',
    border: isFocused ? focusedBorderColor : defaultBorderColor,
    '&:hover': {
      border: focusedBorderColor
    },
    '&:focus': {
      border: focusedBorderColor
    },
    '&:active': {
      border: focusedBorderColor
    }
  })
})

export default colourStyles
