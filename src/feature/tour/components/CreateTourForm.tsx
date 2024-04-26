import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  createTourZodSchema,
  type TCreateTourInput
} from '../zod/tour.zodSchema'
import { useMutateTour } from '../hooks/useMutateTour'

const CreateTourForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
    // setError
  } = useForm<TCreateTourInput>({
    resolver: zodResolver(createTourZodSchema)
  })

  const { mutate } = useMutateTour()

  const onSubmit: SubmitHandler<TCreateTourInput> = (data) => {
    console.log(data)
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}

      <label>Duration</label>
      <input {...register('duration')} />
      {errors.duration && <span>{errors.duration.message}</span>}

      <label>Max Group Size</label>
      <input {...register('maxGroupSize')} />
      {errors.maxGroupSize && <span>{errors.maxGroupSize.message}</span>}

      <label>price</label>
      <input {...register('price')} />
      {errors.price && <span>{errors.price.message}</span>}

      <label>summary</label>
      <input {...register('summary')} />
      {errors.summary && <span>{errors.summary.message}</span>}

      <label>description</label>
      <input {...register('description')} />
      {errors.description && <span>{errors.description.message}</span>}

      <label>difficulty</label>
      <input {...register('difficulty')} />
      {errors.difficulty && <span>{errors.difficulty.message}</span>}

      <label>discount</label>
      <input {...register('discount')} />
      {errors.discount && <span>{errors.discount.message}</span>}

      <label>imageCover</label>
      <input {...register('imageCover')} type='file' />
      {errors.imageCover && <span>{errors.imageCover.message}</span>}

      <label>images</label>
      <input {...register('images')} type='file' multiple />
      {errors.images && <span>{errors.images.message}</span>}

      <label>discount</label>
      <input {...register('discount')} />
      {errors.discount && <span>{errors.discount.message}</span>}

      {/* Input fields for startLocation */}
      <label>startLocation</label>

      <input
        {...register('startLocation.coordinates.0')}
        placeholder='Longitude'
      />
      {errors.startLocation && (
        <span>{errors.startLocation.coordinates?.[0]?.message}</span>
      )}
      <input
        {...register('startLocation.coordinates.1')}
        placeholder='Latitude'
      />
      {errors.startLocation && (
        <span>{errors.startLocation.coordinates?.[1]?.message}</span>
      )}
      <input
        {...register('startLocation.description')}
        placeholder='Description'
      />
      {errors.startLocation && (
        <span>{errors.startLocation.description?.message}</span>
      )}

      {/* Input fields for a single location */}
      <label>Locations</label>
      <input
        {...register('locations.0.coordinates.0')}
        placeholder='Longitude'
      />
      {errors.locations && errors.locations[0] && (
        <span>{errors.locations[0].coordinates?.[0]?.message}</span>
      )}
      <input
        {...register('locations.0.coordinates.1')}
        placeholder='Latitude'
      />
      {errors.locations && errors.locations[0] && (
        <span>{errors.locations[0].coordinates?.[1]?.message}</span>
      )}
      <input
        {...register('locations.0.description')}
        placeholder='Description'
      />
      {errors.locations && errors.locations[0] && (
        <span>{errors.locations[0].description?.message}</span>
      )}
      <input {...register('locations.0.day')} placeholder='Day' />
      {errors.locations && errors.locations[0] && (
        <span>{errors.locations[0].day?.message}</span>
      )}

      {/*  */}
      <label>Guides</label>
      <input {...register('guides')} />
      {errors.guides && <span>{errors.guides.message}</span>}

      <button type='submit'>Create Tour</button>
    </form>
  )
}

export default CreateTourForm
