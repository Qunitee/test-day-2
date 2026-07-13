import { Slot } from 'radix-ui'

import { cn } from '@/shared/utils/utils.ts'
import { UiIcon } from '@/shared/ui/ui-icon/ui-icon.tsx'
import type { IconButtonProps } from '@/shared/ui/ui-icon-button/ui-icon-button-props.ts'

export function UiIconButton({
  size = 'default',
  variant = 'default',
  className,
  asChild = false,
  name,
  type,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      type={!asChild ? (type ?? 'button') : undefined}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn('icon-button', className)}
      {...props}
    >
      <UiIcon aria-hidden name={name} size={size} />
    </Comp>
  )
}
