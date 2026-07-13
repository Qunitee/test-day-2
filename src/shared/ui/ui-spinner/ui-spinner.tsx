import { UiIcon } from '@/shared/ui/ui-icon/ui-icon.tsx'
import { cn } from '@/shared/utils/utils.ts'
import type { UiSize } from '@/shared/models/ui-size.model.ts'

interface UiSpinnerProps {
  fullscreen?: boolean
  size?: UiSize
  className?: string
}

export function UiSpinner({
  fullscreen = false,
  size = 'xl',
  className,
}: UiSpinnerProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        fullscreen && 'min-h-screen',
        className
      )}
    >
      <UiIcon
        name="LoaderCircle"
        size={size}
        className="animate-spin text-muted-foreground"
      />
    </div>
  )
}
