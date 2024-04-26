import z from 'zod'

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

export { signupZodSchema }
export type { TSignupInput }
