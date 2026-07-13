import { z } from 'zod'

export const registerValidationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})
