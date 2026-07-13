
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  UiDialog,
} from '@/shared/ui/ui-dialog/ui-dialog.tsx'
import { UiButton } from '@/shared/ui/ui-button/ui-button.tsx'
import { ControlledInput } from '@/shared/components/controlled-input/controlled-input.tsx'
import { useRoomForm } from '@/features/rooms/hooks/use-room-form.ts'
import type { RoomFormDialogProps } from '@/features/rooms/room-form/room-form-dialog-props.ts'



export function RoomFormDialog({
  room,
  trigger,
  open,
  onOpenChange,
}: RoomFormDialogProps) {
  const { submit, isEdit, isPending, error, reset, control } = useRoomForm({
    room,
    onSuccess: () => onOpenChange(false),
  })

  const handleOpenChange = (next: boolean) => {
    if (next) {
      reset({
        name: room?.name ?? '',
        description: room?.description ?? '',
      })
    }
    onOpenChange(next)
  }

  return (
    <UiDialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit room' : 'New room'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
          <ControlledInput name="name" label="Name" control={control} />
          <ControlledInput
            name="description"
            label="Description"
            control={control}
          />
          {error && (
            <span className="text-sm text-destructive">{error}</span>
          )}
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
