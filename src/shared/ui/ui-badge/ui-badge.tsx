import type { UiBadgeProps } from '@/shared/ui/ui-badge/ui-badge-props.ts'
import { cn } from '@/shared/utils/utils.ts'
import './styles/ui-badge.scss'

export function UiBadge({
  className,
  variant = 'default',
  size = 'default',
  children,
}: UiBadgeProps) {
  return (
    <span
      className={cn('badge', className)}
      data-variant={variant}
      data-size={size}
    >
      {children}
    </span>
  )
}
