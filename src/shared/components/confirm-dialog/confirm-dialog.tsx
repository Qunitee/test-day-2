import { useState } from 'react'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  UiDialog,
} from '@/shared/ui/ui-dialog/ui-dialog.tsx'
import { UiButton } from '@/shared/ui/ui-button/ui-button.tsx'
import type { ConfirmDialogProps } from '@/shared/components/confirm-dialog/confirm-dialog-props.ts'



export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel = 'Confirm',
  confirmVariant = 'destructive',
  isPending = false,
  onConfirm,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false)

  const handleConfirm = async () => {
    await onConfirm()
    setOpen(false)
  }

  return (
    <UiDialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <UiButton variant="outline">Cancel</UiButton>
          </DialogClose>
          <UiButton
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? 'Working…' : confirmLabel}
          </UiButton>
        </DialogFooter>
      </DialogContent>
    </UiDialog>
  )
}
