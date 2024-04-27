import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutateTour } from '../hooks/useMutateTour'
import {
  updateTourZodSchema,
  type TUpdateTourInput
} from '../zod/tour.zodSchema'

type TProps = {
  tourId?: string
}

const UpdateTourForm = ({ tourId }: TProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
    // setError
  } = useForm<TUpdateTourInput>({
    resolver: zodResolver(updateTourZodSchema)
  })

  const { mutate } = useMutateTour({ tourId })

  const onSubmit: SubmitHandler<TUpdateTourInput> = (data) => {
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

      <label>Price</label>
      <input {...register('price')} />
      {errors.price && <span>{errors.price.message}</span>}

      <label>Summary</label>
      <input {...register('summary')} />
      {errors.summary && <span>{errors.summary.message}</span>}

      <label>Description</label>
      <input {...register('description')} />
      {errors.description && <span>{errors.description.message}</span>}

      <label>Difficulty</label>
      <input {...register('difficulty')} />
      {errors.difficulty && <span>{errors.difficulty.message}</span>}

      <label>Discount</label>
      <input {...register('discount')} />
      {errors.discount && <span>{errors.discount.message}</span>}

      <label>Image Cover</label>
      <input {...register('imageCover')} type="file" />
      {errors.imageCover && <span>{errors.imageCover.message}</span>}

      <label>Images</label>
      <input {...register('images')} type="file" multiple />
      {errors.images && <span>{errors.images.message}</span>}

      {/* Input fields for startLocation */}
      <label>Start Location</label>

      <input
        {...register('startLocation.coordinates.0')}
        placeholder="Longitude"
      />
      {errors.startLocation && (
        <span>{errors.startLocation.coordinates?.[0]?.message}</span>
      )}
      <input
        {...register('startLocation.coordinates.1')}
        placeholder="Latitude"
      />
      {errors.startLocation && (
        <span>{errors.startLocation.coordinates?.[1]?.message}</span>
      )}
      <input
        {...register('startLocation.description')}
        placeholder="Description"
      />
      {errors.startLocation && (
        <span>{errors.startLocation.description?.message}</span>
      )}

      {/* Input fields for a single location */}
      <label>Locations</label>
      <input
        {...register('locations.0.coordinates.0')}
        placeholder="Longitude"
      />
      {errors.locations && errors.locations[0] && (
        <span>{errors.locations[0].coordinates?.[0]?.message}</span>
      )}
      <input
        {...register('locations.0.coordinates.1')}
        placeholder="Latitude"
      />
      {errors.locations && errors.locations[0] && (
        <span>{errors.locations[0].coordinates?.[1]?.message}</span>
      )}
      <input
        {...register('locations.0.description')}
        placeholder="Description"
      />
      {errors.locations && errors.locations[0] && (
        <span>{errors.locations[0].description?.message}</span>
      )}
      <input {...register('locations.0.day')} placeholder="Day" />
      {errors.locations && errors.locations[0] && (
        <span>{errors.locations[0].day?.message}</span>
      )}

      {/*  */}
      <label>Guides</label>
      <input {...register('guides')} />
      {errors.guides && <span>{errors.guides.message}</span>}

      <button type="submit">Create Tour</button>
    </form>
  )
}

export default UpdateTourForm
