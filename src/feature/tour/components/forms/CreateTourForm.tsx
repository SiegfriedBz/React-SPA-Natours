import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  SubmitHandler,
  useForm,
  Controller,
  useFieldArray,
  type FieldError
} from 'react-hook-form'
import { useMutateTour } from '../../hooks/useMutateTour'
import SelectTourGuides from './SelectTourGuides'
import SelectDifficulty from './SelectDifficulty'
import Loading from '../../../../ui/components/loading/Loading'
import FormInputError from '../../../../ui/components/FormInputError'
import {
  createTourZodSchema,
  type TCreateTourInput
} from '../../zod/tour.zodSchema'
import type { TSelectOption } from './searchForms/types'
import { difficultyOptions } from './difficultyOptions'

const CreateTourForm = () => {
  // Initialize selectedGuides state with an empty array of TSelectOption to pass to React-SELECT
  const [selectedGuides, setSelectedGuides] = useState<TSelectOption[]>([])

  const {
    getValues,
    setValue,
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TCreateTourInput>({
    resolver: zodResolver(createTourZodSchema)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'locations'
  })

  const { mutate, isPending } = useMutateTour()

  const onSubmit: SubmitHandler<TCreateTourInput> = (data) => {
    mutate(data)
  }

  // Initialize imageCover and images fields when tour is available
  useEffect(() => {
    setValue('imageCover', null)
    setValue('images', [])
    setValue('difficulty', 'easy')
  }, [setValue])

  return (
    <form className="form-responsive" onSubmit={handleSubmit(onSubmit)}>
      {isPending ? (
        <Loading />
      ) : (
        <>
          <label>Name</label>
          <input {...register('name')} />
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
                  onChange(options ? options.map((option) => option.value) : '')
                }}
                onBlur={onBlur}
              />
            )}
          />
          {errors.guides && (
            <FormInputError errorField={errors.guides as FieldError} />
          )}

          <label>Duration</label>
          <input {...register('duration')} />
          <FormInputError errorField={errors.duration} />

          <label>Max Group Size</label>
          <input {...register('maxGroupSize')} />
          <FormInputError errorField={errors.maxGroupSize} />

          <label>Price</label>
          <input {...register('price')} />
          <FormInputError errorField={errors.price} />

          <label>Summary</label>
          <input {...register('summary')} />
          <FormInputError errorField={errors.summary} />

          <label>Description</label>
          <input {...register('description')} />
          <FormInputError errorField={errors.description} />

          <Controller
            name="difficulty"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <SelectDifficulty
                selectedDifficulty={
                  difficultyOptions.find(
                    (option) => option.value === value
                  ) || {
                    value: 'easy',
                    label: 'easy'
                  }
                }
                setSelectedDifficulty={(option) =>
                  onChange(option ? option.value : '')
                }
                onBlur={onBlur}
              />
            )}
          />

          {errors.difficulty && (
            <FormInputError errorField={errors.difficulty as FieldError} />
          )}

          <label>Discount</label>
          <input
            {...register('discount')}
            defaultValue={0}
            onChange={(e) => {
              setValue(
                'discount',
                e.target.value ? parseFloat(e.target.value) : undefined
              )
            }}
          />

          {errors.discount && (
            <FormInputError errorField={errors.discount as FieldError} />
          )}

          <label>Image Cover</label>
          <input
            {...register('imageCover')}
            type="file"
            className="file-input"
          />

          {errors.imageCover && (
            <FormInputError errorField={errors.imageCover as FieldError} />
          )}

          <label>Images</label>
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
                'startLocation.coordinates.0' as keyof TCreateTourInput
              )}
              placeholder="Longitude"
              defaultValue={0}
            />
            {errors.startLocation?.coordinates?.[0] && (
              <FormInputError
                errorField={errors.startLocation.coordinates?.[0] as FieldError}
              />
            )}

            <label>Latitude</label>
            <input
              {...register(
                'startLocation.coordinates.1' as keyof TCreateTourInput
              )}
              placeholder="Latitude"
              defaultValue={0}
            />
            {errors.startLocation?.coordinates?.[1] && (
              <FormInputError
                errorField={errors.startLocation.coordinates?.[1] as FieldError}
              />
            )}

            <label>Description</label>
            <input
              {...register(
                'startLocation.description' as keyof TCreateTourInput
              )}
              placeholder="Description"
            />
            {errors.startLocation?.description && (
              <FormInputError
                errorField={errors.startLocation.description as FieldError}
              />
            )}
          </div>

          {/* Input fields for locations */}

          <label>Locations</label>
          <ul>
            {fields.map((item, index) => (
              <li key={item.id} className="px-2">
                <label>Location {index + 1}</label>
                <div className="px-2 flex flex-col">
                  <div className="pb-4">
                    <label>Longitude</label>
                    <input {...register(`locations.${index}.coordinates.0`)} />

                    {errors.locations?.[`${index}`]?.coordinates?.['0'] && (
                      <FormInputError
                        errorField={
                          errors.locations?.[`${index}`]?.coordinates?.[
                            '0'
                          ] as FieldError
                        }
                      />
                    )}
                  </div>

                  <div className="pb-4">
                    <label>Latitude</label>
                    <input {...register(`locations.${index}.coordinates.1`)} />

                    {errors.locations?.[`${index}`]?.coordinates?.['1'] && (
                      <FormInputError
                        errorField={
                          errors.locations?.[`${index}`]?.coordinates?.[
                            '1'
                          ] as FieldError
                        }
                      />
                    )}
                  </div>

                  <div className="pb-4">
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
                  </div>

                  <div className="pb-4">
                    <label>Day</label>
                    <input {...register(`locations.${index}.day`)} />

                    {errors.locations?.[`${index}`]?.day && (
                      <FormInputError
                        errorField={
                          errors.locations?.[`${index}`]?.day as FieldError
                        }
                      />
                    )}
                  </div>

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

          {/*  */}
          <button className="btn-primary btn-submit" type="submit">
            Create Tour
          </button>
        </>
      )}
    </form>
  )
}

export default CreateTourForm
