import { icons, type LucideProps } from 'lucide-react'
import type { UiSize } from '@/shared/models/ui-size.model.ts'

export type IconName = keyof typeof icons

const IconSizes: Record<UiSize, number> = {
  'xs': 12,
  'sm': 14,
  'default': 16,
  'lg': 18,
  'xl': 24,
  'xxl': 32,
  '3xl': 40,
  '4xl': 52,
  '5xl': 64,
  '6xl': 80,
}

interface UiIconProps extends Omit<LucideProps, 'size'> {
  name: IconName
  size?: UiSize
}

export function UiIcon({ name, size = 'default', ...props }: UiIconProps) {
  const Icon = icons[name]
  if (!Icon) return null
  return <Icon size={IconSizes[size]} {...props} />
}
