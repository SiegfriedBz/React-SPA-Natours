import { useState, useEffect } from 'react'
import {
  Controller,
  FieldError,
  SubmitHandler,
  useForm,
  useFieldArray
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetTour } from '../../hooks/useGetTour'
import { useMutateTour } from '../../hooks/useMutateTour'
import SelectDifficulty from './SelectDifficulty'
import SelectTourGuides from './SelectTourGuides'
import Loading from '../../../../ui/components/loading/Loading'
import FormInputError from '../../../../ui/components/FormInputError'
import RefetchButton from '../../../../ui/components/RefetchButton'
import {
  updateTourZodSchema,
  type TUpdateTourInput
} from '../../zod/tour.zodSchema'
import type { TTour } from '../../../../types/tour.types'
import type { TUser } from '../../../../types/user.types'
import type { TSelectOption } from './searchForms/types'
import { difficultyOptions } from './difficultyOptions'

const API_PUBLIC_URL = import.meta.env.VITE_API_PUBLIC_URL

type TProps = {
  tourId: string
}

const UpdateTourForm = ({ tourId }: TProps) => {
  // Initialize selectedGuides state with an empty array of TSelectOption to pass to React-SELECT
  const [selectedGuides, setSelectedGuides] = useState<TSelectOption[]>([])

  // Get tour data for tourId
  const {
    data: tourData,
    refetch: refetchTour,
    isPending: tourIsPending,
    isError: isErrorFetchingTour
  } = useGetTour({ tourId })

  const tour: TTour | undefined = tourData?.data?.tour

  // Initialize React-HOOK-FORM
  const {
    getValues,
    setValue,
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TUpdateTourInput>({
    resolver: zodResolver(updateTourZodSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'locations'
  })

  // Initialize useMutateTour hook
  const { isPending: mutateIsPending, mutate } = useMutateTour({ tourId })

  // onSubmit
  const onSubmit: SubmitHandler<TUpdateTourInput> = (data) => {
    mutate(data)
  }

  // Initialize imageCover and images fields
  useEffect(() => {
    setValue('imageCover', null)
    setValue('images', [])
  }, [setValue])

  // Initialize locations field with tour locations
  useEffect(() => {
    if (!tour?.locations) return

    tour?.locations.forEach((location) => append(location))

    // Cleanup
    return () => {
      remove()
    }
  }, [remove, append, tour?.locations])

  // Initialize difficulty field with tour difficulty
  useEffect(() => {
    if (!tour?.difficulty) return

    setValue('difficulty', tour?.difficulty)
  }, [setValue, tour?.difficulty])

  // Initialize guides field with tour guides
  // and update selectedGuides state passed to React-SELECT
  useEffect(() => {
    if (!tour?.difficulty || !tour?.guides) return

    setValue(
      'guides',
      tour?.guides?.map((guide) => (guide as TUser)._id)
    )

    setSelectedGuides(
      (tour.guides as TUser[]).map((guide) => {
        return {
          value: guide._id,
          label: `${guide.name} (${guide.role})`
        }
      })
    )
  }, [setValue, tour?.difficulty, tour?.guides])

  if (isErrorFetchingTour) {
    return <RefetchButton refetch={refetchTour} />
  }

  return (
    <>
      <form className="form-responsive" onSubmit={handleSubmit(onSubmit)}>
        {tourIsPending || mutateIsPending ? (
          <Loading />
        ) : (
          <>
            <label>Name</label>
            <input {...register('name')} defaultValue={tour?.name} />
            <FormInputError errorField={errors.name} />

            <label>Guides</label>
            <Controller
              control={control}
              name="guides"
              render={({ field: { onChange, onBlur } }) => (
                <SelectTourGuides
                  selectedGuides={selectedGuides}
                  setSelectedGuides={(options) => {
                    // update state passed to React-SELECT
                    setSelectedGuides(options)
                    // update React-HOOK-FORM "guides" field state
                    onChange(
                      options ? options.map((option) => option.value) : ''
                    )
                  }}
                  onBlur={onBlur}
                />
              )}
            />

            <label>Duration</label>
            <input {...register('duration')} defaultValue={tour?.duration} />
            <FormInputError errorField={errors.duration} />

            <label>Max Group Size</label>
            <input
              {...register('maxGroupSize')}
              defaultValue={tour?.maxGroupSize}
            />
            <FormInputError errorField={errors.maxGroupSize} />

            <label>Price</label>
            <input {...register('price')} defaultValue={tour?.price} />
            <FormInputError errorField={errors.price} />

            <label>Summary</label>
            <input {...register('summary')} defaultValue={tour?.summary} />
            <FormInputError errorField={errors.summary} />

            <label>Description</label>
            <input
              {...register('description')}
              defaultValue={tour?.description}
            />
            <FormInputError errorField={errors.description} />

            <Controller
              name="difficulty"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectDifficulty
                  selectedDifficulty={
                    difficultyOptions.find(
                      (option) => option.value === value
                    ) ||
                    (tour?.difficulty && {
                      value: tour?.difficulty,
                      label: tour?.difficulty
                    }) ||
                    null
                  }
                  setSelectedDifficulty={(option) =>
                    onChange(option ? option.value : '')
                  }
                  onBlur={onBlur}
                />
              )}
            />

            <label>Discount</label>
            <input
              {...register('discount')}
              defaultValue={tour?.discount || 0}
              onChange={(e) => {
                setValue(
                  'discount',
                  e.target.value ? parseFloat(e.target.value) : undefined
                )
              }}
            />
            <FormInputError errorField={errors.discount} />

            <label>Image Cover</label>
            {tour?.imageCover && (
              <img
                src={`${API_PUBLIC_URL}/img/tours/${tour.imageCover}`}
                alt="Tour"
                className="h-64 w-64 object-cover rounded-lg mb-2 shadow-xl"
              />
            )}
            <input
              {...register('imageCover')}
              type="file"
              className="file-input"
            />
            {errors.imageCover && (
              <FormInputError errorField={errors.imageCover as FieldError} />
            )}

            <label>Images</label>
            <ul className="flex mb-2 flex-wrap justify-between gap-4">
              {tour?.images.map((image) => (
                <img
                  key={image}
                  src={`${API_PUBLIC_URL}/img/tours/${image}`}
                  alt="Tour"
                  className=" w-64 object-cover rounded-lg shadow-xl"
                />
              ))}
            </ul>

            <input
              {...register('images')}
              type="file"
              multiple
              className="file-input"
            />
            {errors.images && (
              <FormInputError errorField={errors.images as FieldError} />
            )}

            {/* Input fields for startLocation */}

            <label>Start Location</label>
            <div className="px-2">
              <label>Longitude</label>
              <input
                {...register(
                  'startLocation.coordinates.0' as keyof TUpdateTourInput
                )}
                placeholder="Longitude"
                defaultValue={tour?.startLocation?.coordinates?.[0]}
              />

              <label>Latitude</label>
              <input
                {...register(
                  'startLocation.coordinates.1' as keyof TUpdateTourInput
                )}
                placeholder="Latitude"
                defaultValue={tour?.startLocation?.coordinates?.[1]}
              />
              {errors.startLocation?.coordinates?.[1] && (
                <FormInputError
                  errorField={
                    errors.startLocation.coordinates?.[1] as FieldError
                  }
                />
              )}

              <label>Description</label>
              <input
                {...register(
                  'startLocation.description' as keyof TUpdateTourInput
                )}
                placeholder="Description"
                defaultValue={tour?.startLocation?.description}
              />
              {errors.startLocation?.description && (
                <FormInputError
                  errorField={errors.startLocation.description as FieldError}
                />
              )}
            </div>

            {/* Input fields for locations */}
            <div>
              <label>Locations</label>
              <ul>
                {fields.map((item, index) => (
                  <li key={item.id} className="px-2">
                    <label>Location {index + 1}</label>
                    <div className="px-2 flex flex-col">
                      <label>Longitude</label>
                      <input
                        {...register(`locations.${index}.coordinates.0`)}
                      />

                      {errors.locations?.[`${index}`]?.coordinates?.['0'] && (
                        <FormInputError
                          errorField={
                            errors.locations?.[`${index}`]?.coordinates?.[
                              '0'
                            ] as FieldError
                          }
                        />
                      )}

                      <label>Latitude</label>
                      <input
                        {...register(`locations.${index}.coordinates.1`)}
                      />

                      {errors.locations?.[`${index}`]?.coordinates?.['1'] && (
                        <FormInputError
                          errorField={
                            errors.locations?.[`${index}`]?.coordinates?.[
                              '1'
                            ] as FieldError
                          }
                        />
                      )}

                      <label>Description</label>
                      <input {...register(`locations.${index}.description`)} />

                      {errors.locations?.[`${index}`]?.description && (
                        <FormInputError
                          errorField={
                            errors.locations?.[`${index}`]
                              ?.description as FieldError
                          }
                        />
                      )}

                      <label>Day</label>
                      <input {...register(`locations.${index}.day`)} />

                      {errors.locations?.[`${index}`]?.day && (
                        <FormInputError
                          errorField={
                            errors.locations?.[`${index}`]?.day as FieldError
                          }
                        />
                      )}

                      <button
                        className="btn-warning self-end btn capitalize rounded-2xl"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Delete location {index + 1}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                className="btn-primary btn capitalize rounded-2xl"
                type="button"
                onClick={() =>
                  append({
                    type: 'Point',
                    coordinates: [
                      getValues('startLocation.coordinates.0') ?? 0,
                      getValues('startLocation.coordinates.1') ?? 0
                    ],
                    description: '',
                    day: 42
                  })
                }
              >
                Add Location
              </button>
            </div>

            {/*  */}
            <button className="btn-primary btn-submit" type="submit">
              Update Tour
            </button>
          </>
        )}
      </form>
    </>
  )
}

export default UpdateTourForm
