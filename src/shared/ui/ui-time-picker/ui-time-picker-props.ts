import type { AriaAttributes, Ref, RefObject } from 'react'

export interface UiTimePickerProps {
  value: string
  onChange?: (value: string) => void
  id?: string
  placeholder?: string
  stepMinutes?: number
  ref?: Ref<HTMLButtonElement>
  nextFocusRef?: RefObject<HTMLButtonElement | null>
  'aria-invalid'?: AriaAttributes['aria-invalid']
}
