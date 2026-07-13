import type { Control, FieldValues, Path } from 'react-hook-form'
import type { AriaAttributes, ComponentType } from 'react'

export interface FieldComponentProps {
  'value': string
  'onChange'?: (value: string) => void
  'aria-invalid'?: AriaAttributes['aria-invalid']
  'id'?: string
}

export type ControlledFieldProps<
  T extends FieldValues,
  P extends FieldComponentProps,
> = {
  name: Path<T>
  control: Control<T>
  label?: string
  component: ComponentType<P>
} & Omit<P, keyof FieldComponentProps>
