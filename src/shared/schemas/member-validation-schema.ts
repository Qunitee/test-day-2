import { z } from 'zod'
import { RoomRole } from '@/shared/models/room/room-role.model.ts'

export const memberValidationSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  role: z.enum([RoomRole.Admin, RoomRole.User]),
})
