import { z } from 'zod'

export const bookingValidationSchema = z
  .object({
    date: z.string().min(1, 'Date is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    description: z.string().max(300, 'Description is too long (max 300)'),
  })
  .refine(data => data.endTime > data.startTime, {
    message: 'End time must be after start time',
    path: ['endTime'],
  })
