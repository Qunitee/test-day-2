import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { bookingValidationSchema } from '@/shared/schemas/booking-validation-schema.ts'
import { hasTimeConflict } from '@/shared/utils/has-time-conflict.util.ts'
import { useAuthStore } from '@/shared/store/auth-store/auth-store.ts'
import {
  useCreateBooking,
  useUpdateBooking,
} from '@/features/bookings/hooks/use-booking-mutations.ts'
import type { BookingI } from '@/shared/models/booking/booking.model.ts'

type BookingFormValues = z.infer<typeof bookingValidationSchema>

interface UseBookingFormI {
  roomId: string
  booking?: BookingI
  /** All bookings of the room — used for the time-conflict check. */
  existingBookings: BookingI[]
  onSuccess?: () => void
}

export function useBookingForm({
  roomId,
  booking,
  existingBookings,
  onSuccess,
}: UseBookingFormI) {
  const user = useAuthStore(s => s.user)
  const createBooking = useCreateBooking()
  const updateBooking = useUpdateBooking()

  const isEdit = Boolean(booking)
  const mutation = isEdit ? updateBooking : createBooking

  const methods = useForm<BookingFormValues>({
    resolver: zodResolver(bookingValidationSchema),
    defaultValues: {
      date: booking?.date ?? '',
      startTime: booking?.startTime ?? '',
      endTime: booking?.endTime ?? '',
      description: booking?.description ?? '',
    },
  })

  const submit = methods.handleSubmit(async values => {
    if (hasTimeConflict(values, existingBookings, booking?.id)) {
      methods.setError('root', {
        message: 'This time slot overlaps an existing booking',
      })
      return
    }

    if (isEdit && booking) {
      await updateBooking.mutateAsync({
        id: booking.id,
        roomId,
        payload: values,
      })
    } else {
      if (!user) {
        methods.setError('root', {
          message: 'You must be signed in to book',
        })
        return
      }
      await createBooking.mutateAsync({ ...values, roomId, userId: user.uid })
    }

    onSuccess?.()
  })

  const error =
    mutation.error?.message ?? methods.formState.errors.root?.message ?? null

  return {
    submit,
    isEdit,
    isPending: mutation.isPending,
    error,
    ...methods,
  }
}
