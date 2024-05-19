import { FieldError } from 'react-hook-form'

type TProps = {
  errorField: FieldError | undefined
}

const FormInputError = ({ errorField }: TProps) => {
  return (
    errorField && (
      <span className="text-warning">{errorField.message as string}</span>
    )
  )
}

export default FormInputError
