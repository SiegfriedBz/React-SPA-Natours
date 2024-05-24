import Select, { GroupBase, OptionProps } from 'react-select'
import { useGetUsersByRoles } from '../../hooks/useGetUsersByRoles'
import Loading from '../../../../ui/components/loading/Loading'
import CloudinaryImg from '../../../../ui/components/cloudinary/CloudinaryImg'
import colourStyles from '../../../../ui/utils/reactSelectStyles.utils'
import userDefaultImage from '../../../../assets/user/default.jpg'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { TUser } from '../../../../types/user.types'
import type { TSelectOption } from './searchForms/types'

type TSelectGuideOption = TSelectOption & { photo?: string }

type SelectTourGuidesProps = {
  selectedGuides: TSelectOption[]
  setSelectedGuides: (options: TSelectOption[]) => void
  onBlur: () => void
}

const SelectTourGuides = ({
  selectedGuides,
  setSelectedGuides,
  onBlur
}: SelectTourGuidesProps) => {
  // Get all guides
  const {
    data: allGuidesData,
    isPending: allGuidesIsPending,
    isError: isErrorAllGuides
  } = useGetUsersByRoles({
    roles: ['guide', 'lead-guide']
  })

  // Map the users to the format needed for react-select
  const allGuidesOptions: TSelectGuideOption[] = (
    allGuidesData?.data?.users as TUser[]
  )?.map((guide: TUser) => ({
    value: guide._id,
    label: `${guide.name} (${guide.role})`,
    photo: guide.photo
  }))

  if (isErrorAllGuides) return <div>Error</div>

  return (
    <>
      {allGuidesIsPending ? (
        <Loading />
      ) : (
        <Select<{ value: string; label: string }, true>
          styles={colourStyles<TSelectOption>()}
          isMulti
          options={allGuidesOptions}
          components={{ Option: CustomOption }}
          value={selectedGuides}
          onChange={(value) => {
            setSelectedGuides(value as TSelectOption[])
          }}
          onBlur={onBlur}
        />
      )}
    </>
  )
}

export default SelectTourGuides

type TCustomOptionProps = OptionProps<
  TSelectGuideOption,
  true,
  GroupBase<TSelectGuideOption>
> & {
  innerProps: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}
const CustomOption = ({ data, innerProps, isDisabled }: TCustomOptionProps) => {
  return !isDisabled ? (
    <div
      {...innerProps}
      className="flex items-center
        px-4 py-2 my-2
        space-x-4 
        cursor-pointer
      hover:bg-primary-light
      hover:text-stone-50
        hover:font-semibold
      "
    >
      {data?.photo ? (
        <CloudinaryImg
          url={data?.photo}
          className="rounded-full 
            max-sm:h-10 max-sm:w-10 
            sm:h-16 sm:w-16
            object-cover
            border border-current
            shadow-md
            transition-all
            duration-200
            hover:shadow-lg
          "
        />
      ) : (
        <img
          src={userDefaultImage}
          alt="Guide photo default"
          className="rounded-full 
            max-sm:h-10 max-sm:w-10 
            sm:h-16 sm:w-16
            object-cover
            border border-current
            shadow-md
            transition-all
            duration-200
            hover:shadow-lg
          "
        />
      )}

      <div className="text-lg">
        <p>{data.label}</p>
      </div>
    </div>
  ) : null
}
