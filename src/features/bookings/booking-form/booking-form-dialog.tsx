import { useRef } from 'react'
import { Controller } from 'react-hook-form'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  UiDialog,
} from '@/shared/ui/ui-dialog/ui-dialog.tsx'
import { UiButton } from '@/shared/ui/ui-button/ui-button.tsx'
import { UiLabel } from '@/shared/ui/ui-label/ui-label.tsx'
import { UiTimePicker } from '@/shared/ui/ui-time-picker/ui-time-picker.tsx'
import { ControlledInput } from '@/shared/components/controlled-input/controlled-input.tsx'
import { ControlledDatePicker } from '@/shared/components/controlled-date-picker/controlled-date-picker.tsx'
import { useBookingForm } from '@/features/bookings/hooks/use-booking-form.ts'
import type { BookingFormDialogProps } from '@/features/bookings/booking-form/booking-form-dialog-props.ts'

export function BookingFormDialog({
  roomId,
  booking,
  existingBookings,
  trigger,
  open,
  onOpenChange,
}: BookingFormDialogProps) {
  const { submit, isEdit, isPending, error, reset, control } = useBookingForm({
    roomId,
    booking,
    existingBookings,
    onSuccess: () => onOpenChange(false),
  })

  const endTimeRef = useRef<HTMLButtonElement>(null)

  const handleOpenChange = (next: boolean) => {
    if (next) {
      reset({
        date: booking?.date ?? '',
        startTime: booking?.startTime ?? '',
        endTime: booking?.endTime ?? '',
        description: booking?.description ?? '',
      })
    }
    onOpenChange(next)
  }

  return (
    <UiDialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit booking' : 'New booking'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
          <ControlledDatePicker name="date" label="Date" control={control} />

          <div className="flex gap-3">
            <Controller
              name="startTime"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex flex-1 flex-col gap-1.5">
                  <UiLabel htmlFor="startTime">Start</UiLabel>
                  <UiTimePicker
                    id="startTime"
                    value={field.value ?? ''}
                    nextFocusRef={endTimeRef}
                    aria-invalid={!!fieldState.error}
                    onChange={value => {
                      field.onChange(value)
                    }}
                  />
                  {fieldState.error && (
                    <span className="text-sm text-destructive">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />

            <Controller
              name="endTime"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex flex-1 flex-col gap-1.5">
                  <UiLabel htmlFor="endTime">End</UiLabel>
                  <UiTimePicker
                    id="endTime"
                    ref={endTimeRef}
                    value={field.value ?? ''}
                    aria-invalid={!!fieldState.error}
                    onChange={field.onChange}
                  />
                  {fieldState.error && (
                    <span className="text-sm text-destructive">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          <ControlledInput
            name="description"
            label="Description"
            control={control}
          />

          {error && <span className="text-sm text-destructive">{error}</span>}

          <DialogFooter>
            <UiButton type="submit" variant="primary" disabled={isPending}>
              {isPending ? 'Saving…' : isEdit ? 'Save' : 'Create'}
            </UiButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </UiDialog>
  )
}
