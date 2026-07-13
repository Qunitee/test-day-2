import { useState } from 'react'
import { format, parse } from 'date-fns'
import {
  CardContent,
  CardHeader,
  CardTitle,
  UiCard,
} from '@/shared/ui/ui-card/ui-card.tsx'
import { UiButton } from '@/shared/ui/ui-button/ui-button.tsx'
import { ConfirmDialog } from '@/shared/components/confirm-dialog/confirm-dialog.tsx'
import { BookingFormDialog } from '@/features/bookings/booking-form/booking-form-dialog.tsx'
import { useDeleteBooking } from '@/features/bookings/hooks/use-booking-mutations.ts'
import type { BookingCardProps } from '@/features/bookings/booking-list/booking-card-props.ts'

export function BookingCard({
  booking,
  roomId,
  existingBookings,
  isAdmin,
}: BookingCardProps) {
  const deleteBooking = useDeleteBooking()
  const [isEditOpen, setIsEditOpen] = useState(false)

  const dateLabel = format(
    parse(booking.date, 'yyyy-MM-dd', new Date()),
    'EEE, d MMM yyyy'
  )

  return (
    <UiCard className="p-4 gap-2">
      <CardHeader className="p-0 flex-row items-start justify-between gap-2">
        <CardTitle>{dateLabel}</CardTitle>
        {isAdmin && (
          <div className="flex gap-1">
            <BookingFormDialog
              roomId={roomId}
              booking={booking}
              existingBookings={existingBookings}
              open={isEditOpen}
              onOpenChange={setIsEditOpen}
              trigger={
                <UiButton variant="ghost" size="sm">
                  Edit
                </UiButton>
              }
            />
            <ConfirmDialog
              title="Cancel booking?"
              description={`The booking on ${dateLabel} (${booking.startTime}–${booking.endTime}) will be removed.`}
              confirmLabel="Cancel booking"
              isPending={deleteBooking.isPending}
              onConfirm={() =>
                deleteBooking.mutateAsync({ id: booking.id, roomId })
              }
              trigger={
                <UiButton
                  variant="destructive-soft"
                  size="sm"
                  disabled={deleteBooking.isPending}
                >
                  {deleteBooking.isPending ? 'Cancelling…' : 'Cancel'}
                </UiButton>
              }
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-1">
        <span className="text-sm">
          {booking.startTime}–{booking.endTime}
        </span>
        {booking.description && (
          <p className="text-sm text-muted-foreground">{booking.description}</p>
        )}
        {deleteBooking.error && (
          <span className="text-sm text-destructive">
            {deleteBooking.error.message}
          </span>
        )}
      </CardContent>
    </UiCard>
  )
}
