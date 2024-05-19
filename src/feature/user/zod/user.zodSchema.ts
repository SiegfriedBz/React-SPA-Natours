import z from 'zod'
import {
  ACCEPTED_IMAGE_MIME_TYPES,
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE
} from '../../../constants'

// Signup
const signupZodSchema = z
  .object({
    name: z.string({
      required_error: 'Name is required'
    }),
    email: z
      .string({
        required_error: 'Email is required'
      })
      .email('Not a valid email'),
    password: z
      .string({
        required_error: 'Password is required'
      })
      .min(6, 'Password too short - should be 6 chars minimum'),
    passwordConfirmation: z.string({
      required_error: 'passwordConfirmation is required'
    })
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation']
  })

type TSignupInput = z.TypeOf<typeof signupZodSchema>

//
// User - Update self (except password)
const updateMeZodSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    photo: z.any().optional()
  })
  .refine((data) => !data?.name || data.name != null, {
    message: 'User name can not be null',
    path: ['name']
  })
  .refine((data) => !data?.email || data.email != null, {
    message: 'User email can not be null',
    path: ['email']
  })
  .refine(
    (data) =>
      data?.photo?.length === 0 ||
      (data?.photo && data?.photo?.[0]?.size <= MAX_FILE_SIZE),
    {
      message: 'Max image size is 5MB.',
      path: ['photo']
    }
  )
  .refine(
    (data) =>
      data?.photo?.length === 0 ||
      (data?.photo &&
        ACCEPTED_IMAGE_MIME_TYPES.includes(data?.photo?.[0]?.type)),
    {
      message: `Only ${ACCEPTED_IMAGE_TYPES.join(', ')} formats are supported.`,
      path: ['photo']
    }
  )

type TUpdateMeInput = z.TypeOf<typeof updateMeZodSchema>

// User - Update password
const updateMyPasswordZodSchema = z
  .object({
    currentPassword: z
      .string({
        required_error: 'Current password is required'
      })
      .min(6, 'Password too short - should be 6 chars minimum'),
    password: z
      .string({
        required_error: 'Password is required'
      })
      .min(6, 'Password too short - should be 6 chars minimum'),
    passwordConfirmation: z.string({
      required_error: 'passwordConfirmation is required'
    })
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation']
  })

type TUpdateMyPasswordInput = z.TypeOf<typeof updateMyPasswordZodSchema>

//
const forgotMyPasswordZodSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email('Not a valid email')
})

type TForgotMyPasswordInput = z.TypeOf<typeof forgotMyPasswordZodSchema>

//
const resetMyPasswordZodSchema = z
  .object({
    password: z
      .string({
        required_error: 'Password is required'
      })
      .min(6, 'Password too short - should be 6 chars minimum'),
    passwordConfirmation: z.string({
      required_error: 'passwordConfirmation is required'
    }),
    resetPasswordToken: z.string({
      required_error: 'resetPasswordToken is required'
    })
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation']
  })

type TResetMyPasswordInput = z.TypeOf<typeof resetMyPasswordZodSchema>

export {
  signupZodSchema,
  updateMeZodSchema,
  updateMyPasswordZodSchema,
  forgotMyPasswordZodSchema,
  resetMyPasswordZodSchema
}
export type {
  TSignupInput,
  TUpdateMeInput,
  TUpdateMyPasswordInput,
  TForgotMyPasswordInput,
  TResetMyPasswordInput
}
