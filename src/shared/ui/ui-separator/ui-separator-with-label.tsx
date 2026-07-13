import { UiSeparator } from '@/shared/ui/ui-separator/ui-separator.tsx'
import { cn } from '@/shared/utils/utils.ts'

export function UiSeparatorWithLabel({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  const classes = cn('absolute text-center px-1 bg-card', className)
  return (
    <div className="relative w-full flex items-center justify-center">
      <UiSeparator />
      <p className={classes}>{label}</p>
    </div>
  )
}
