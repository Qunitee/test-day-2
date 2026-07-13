import { Slot } from 'radix-ui'

import { cn } from '@/shared/utils/utils.ts'
import type { UiButtonProps } from './ui-button-props.ts'
import './styles/ui-button.scss'

function UiButton({
  className,
  variant = 'default',
  size = 'default',
  isRoundedFull = false,
  asChild = false,
  ...props
}: UiButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'
  const classes = cn(
    'button',
    `button--${variant}`,
    `button--size-${size}`,
    className
  )
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-rounded-full={isRoundedFull}
      className={classes}
      {...props}
    />
  )
}

export { UiButton }
