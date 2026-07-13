import type * as React from 'react'
import type { DefaultComponentProps } from '@/shared/models/default-components-props.ts'
import type { UiVariant } from '@/shared/models/ui-variant.model.ts'
import type { IconName } from '@/shared/ui/ui-icon/ui-icon.tsx'

export interface IconButtonProps
  extends React.ComponentProps<'button'>, DefaultComponentProps {
  variant?: UiVariant
  name: IconName
  asChild?: boolean
}
