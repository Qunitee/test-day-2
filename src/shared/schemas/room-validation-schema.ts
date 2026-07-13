import { z } from 'zod'

export const roomValidationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  description: z.string().max(300, 'Description is too long (max 300)'),
})
