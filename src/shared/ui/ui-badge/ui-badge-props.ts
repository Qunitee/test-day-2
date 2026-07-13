import type { UiVariant } from '@/shared/models/ui-variant.model.ts'
import type { DefaultComponentProps } from '@/shared/models/default-components-props.ts'

export interface UiBadgeProps extends DefaultComponentProps {
  variant?: UiVariant
  children?: React.ReactNode
}
