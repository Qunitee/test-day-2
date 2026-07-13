import type { AriaAttributes } from 'react'

export interface UiDatePickerProps {
  value: string
  onChange?: (value: string) => void
  id?: string
  placeholder?: string
  disabled?: boolean
  'aria-invalid'?: AriaAttributes['aria-invalid']
}
