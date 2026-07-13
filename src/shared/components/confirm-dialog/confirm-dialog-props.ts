import type { ReactNode } from 'react'
import type { UiVariant } from '@/shared/models/ui-variant.model.ts'

export interface ConfirmDialogProps {
  trigger: ReactNode
  title: string
  description?: string
  confirmLabel?: string
  confirmVariant?: UiVariant
  isPending?: boolean
  onConfirm: () => void | Promise<void>
}