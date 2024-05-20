import z from 'zod'
import {
  ACCEPTED_IMAGE_MIME_TYPES,
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  TOUR_DIFFICULTY
} from '../../../constants'

const positiveNumberField = (fieldName: string) => {
  return z
    .string()
    .refine(
      (val) => /^-?\d+(\.\d+)?$/.test(val),
      `Tour ${fieldName} must be a valid number`
    )
    .transform((val) => parseFloat(val))
    .refine(
      (val) => val > 0,
      `Tour ${fieldName} must be a number greater than 0`
    )
}

const optionalPositiveNumberField = (fieldName: string) => {
  return z
    .string()
    .refine(
      (val) => val === '' || /^-?\d+(\.\d+)?$/.test(val),
      `Tour ${fieldName} must be a valid number or empty`
    )
    .transform((val) => (val === '' ? 0 : parseFloat(val)))
    .refine(
      (val) => val >= 0,
      `Tour ${fieldName} must be a number greater than 0`
    )
    .optional()
}

const baseTourBody = {
  name: z
    .string()
    .trim()
    .min(3, 'Tour name too short - should be 3 chars minimum')
    .max(40, 'Tour name too long - should be 40 chars maximum'),
  duration: positiveNumberField('duration'),
  maxGroupSize: positiveNumberField('maxGroupSize'),
  difficulty: z.enum(TOUR_DIFFICULTY),
  price: positiveNumberField('price'),
  summary: z
    .string()
    .trim()
    .min(8, 'Tour summary too short - should be 8 chars minimum'),
  /** OPTIONAL */
  discount: optionalPositiveNumberField('discount'),
  description: z.string().trim().optional(),
  imageCover: z.any().optional(),
  images: z.any().optional(),
  startDates: z.array(z.string()).optional(),
  startLocation: z.object({
    type: z.enum(['Point']).default('Point'),
    coordinates: z.array(
      z.number().or(
        z
          .string()
          .refine(
            (val) => /^-?\d+(\.\d+)?$/.test(val),
            'Coordinates must be a valid number'
          )
          .transform((val) => parseFloat(val))
          .refine((val) => !isNaN(val), 'Coordinates must be a valid number')
      )
    ),
    description: z.string()
  }),
  locations: z
    .array(
      z.object({
        type: z.enum(['Point']).default('Point'),
        coordinates: z.array(
          z.number().or(
            z
              .string()
              .refine(
                (val) => /^-?\d+(\.\d+)?$/.test(val),
                'Coordinates must be a valid number'
              )
              .transform((val) => parseFloat(val))
              .refine(
                (val) => !isNaN(val),
                'Coordinates must be a valid number'
              )
          )
        ),
        description: z.string(),
        day: z.number().or(
          z
            .string()
            .refine((val) => /^\d+$/.test(val), 'Day must be a valid number')
            .transform((val) => parseFloat(val))
        )
      })
    )
    .optional(),
  guides: z.array(z.string()).optional()
}

const createTourZodSchema = z
  .object({ ...baseTourBody })
  .extend({
    name: baseTourBody.name.refine((value) => value != undefined, {
      message: `Tour name is required`
    }),
    duration: baseTourBody.duration.refine((value) => value != undefined, {
      message: `Tour duration is required`
    }),
    maxGroupSize: baseTourBody.maxGroupSize.refine(
      (value) => value != undefined,
      {
        message: `Tour maxGroupSize is required`
      }
    ),
    difficulty: baseTourBody.difficulty.refine(
      (value) => value != undefined && TOUR_DIFFICULTY.includes(value),
      {
        message: `Tour difficulty is required, and must be chosen between ${TOUR_DIFFICULTY.join(
          ', '
        )}`
      }
    ),
    price: baseTourBody.price.refine((value) => value != undefined, {
      message: `Tour price is required`
    }),
    summary: baseTourBody.summary.refine((value) => value != undefined, {
      message: `Tour summary is required`
    })
  })
  .refine(
    (data) =>
      !data?.discount ||
      (data?.discount && data?.price && data.discount < data.price),
    {
      message: `If a discount is provided, a price must also be provided and the discount must be less than the price`,
      path: ['discount']
    }
  )

  // imageCover
  .refine((data) => data?.imageCover != null, {
    message: 'Image cover is required.',
    path: ['imageCover']
  })
  .refine((data) => data?.imageCover?.[0]?.size <= MAX_FILE_SIZE, {
    message: 'Max image size is 5MB.',
    path: ['imageCover']
  })
  .refine(
    (data) => ACCEPTED_IMAGE_MIME_TYPES.includes(data?.imageCover?.[0]?.type),
    {
      message: `Only ${ACCEPTED_IMAGE_TYPES.join(', ')} formats are supported.`,
      path: ['imageCover']
    }
  )

  // images
  .refine((data) => data?.images.length === 3, {
    message: '3 images are required.',
    path: ['images']
  })
  .refine(
    (data) =>
      Array.from((data?.images as FileList) || []).every(
        (image: File) => image.size <= MAX_FILE_SIZE
      ),
    {
      message: 'Max image size is 5MB.',
      path: ['images']
    }
  )
  .refine(
    (data) =>
      Array.from((data?.images as FileList) || []).every((image: File) =>
        ACCEPTED_IMAGE_MIME_TYPES.includes(image?.type)
      ),
    {
      message: `Only ${ACCEPTED_IMAGE_TYPES.join(', ')} formats are supported.`,
      path: ['images']
    }
  )

const updateTourZodSchema = z
  .object({ ...baseTourBody })
  .extend({
    difficulty: baseTourBody.difficulty.refine(
      (value) => value == undefined || TOUR_DIFFICULTY.includes(value),
      {
        message: `If Tour difficulty is given, it must be chosen between ${TOUR_DIFFICULTY.join(
          ', '
        )}`
      }
    )
  })
  .refine(
    (data) =>
      !data?.discount ||
      (data?.discount && data?.price && data.discount < data.price),
    {
      message: `If a discount is provided, a price must also be provided and the discount must be less than the price`,
      path: ['discount']
    }
  )
  // imageCover - optional on update
  .refine(
    (data) =>
      data?.imageCover == null ||
      (data?.imageCover && data?.imageCover?.[0]?.size <= MAX_FILE_SIZE),
    {
      message: 'Max image size is 5MB.',
      path: ['imageCover']
    }
  )
  .refine(
    (data) =>
      data?.imageCover == null ||
      (data?.imageCover &&
        ACCEPTED_IMAGE_MIME_TYPES.includes(data?.imageCover?.[0]?.type)),
    {
      message: `Only ${ACCEPTED_IMAGE_TYPES.join(', ')} formats are supported.`,
      path: ['imageCover']
    }
  )
  // images - optional on update
  .refine(
    (data) =>
      data?.images.length === 0 ||
      Array.from((data?.images as FileList) || []).every(
        (image: File) => image.size <= MAX_FILE_SIZE
      ),
    {
      message: 'Max image size is 5MB.',
      path: ['images']
    }
  )
  .refine(
    (data) =>
      data?.images.length === 0 ||
      Array.from((data?.images as FileList) || []).every((image: File) =>
        ACCEPTED_IMAGE_MIME_TYPES.includes(image?.type)
      ),
    {
      message: `Only ${ACCEPTED_IMAGE_TYPES.join(', ')} formats are supported.`,
      path: ['images']
    }
  )

type TCreateTourInput = z.TypeOf<typeof createTourZodSchema>
type TUpdateTourInput = z.TypeOf<typeof updateTourZodSchema>

export { createTourZodSchema, updateTourZodSchema }
export type { TCreateTourInput, TUpdateTourInput }
