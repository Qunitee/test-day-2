import type * as React from 'react'
import type { DefaultComponentProps } from '@/shared/models/default-components-props.ts'
import type { UiSize } from '@/shared/models/ui-size.model.ts'

export interface UiInputProps
  extends
    Omit<React.ComponentProps<'input'>, 'size' | 'onChange'>,
    DefaultComponentProps {
  size?: UiSize
  value: string
  onChange?: (value: string) => void
}
