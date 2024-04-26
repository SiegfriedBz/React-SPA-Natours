import z from 'zod'

export const USER_ROLES = ['admin', 'lead-guide', 'guide', 'user'] as const

//  Login
const loginZodSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Not a valid email'),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(6, 'Password too short - should be 6 chars minimum')
})

type TLoginInput = z.TypeOf<typeof loginZodSchema>

export { loginZodSchema }
export type { TLoginInput }
