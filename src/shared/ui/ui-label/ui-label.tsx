import * as React from 'react'
import { Label as LabelPrimitive } from 'radix-ui'
import './styles/ui-label.scss'

import { cn } from '@/shared/utils/utils.ts'
function UiLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn('label', className)}
      {...props}
    />
  )
}

export { UiLabel }
