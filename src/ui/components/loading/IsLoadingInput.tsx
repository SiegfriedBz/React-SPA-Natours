import Loading from './Loading'

type TIsLoadingInputProps = {
  isLoading: boolean
  children: React.ReactNode
}
const IsLoadingInput = ({ isLoading, children }: TIsLoadingInputProps) => {
  return <>{isLoading ? <Loading variant="sm" /> : children}</>
}

export default IsLoadingInput
