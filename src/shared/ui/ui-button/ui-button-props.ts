import type { UiVariant } from '@/shared/models/ui-variant.model.ts'
import type { DefaultComponentProps } from '@/shared/models/default-components-props.ts'

export interface UiButtonProps
  extends React.ComponentProps<'button'>, DefaultComponentProps {
  variant?: UiVariant
  asChild?: boolean
  disabled?: boolean
  isRoundedFull?: boolean
}
