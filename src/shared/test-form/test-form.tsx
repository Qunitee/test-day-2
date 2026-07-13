import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UiButton } from '@/shared/ui/ui-button/ui-button.tsx'
import { ControlledInput } from '@/shared/components/controlled-input/controlled-input.tsx'

const schema = z.object({
  email: z.string().min(1, 'Email обязателен').email('Некорректный email'),
  password: z
    .string()
    .min(1, 'Пароль обязателен')
    .min(8, 'Минимум 8 символов')
    .regex(/[0-9]/, 'Должна быть хотя бы одна цифра'),
  name: z.string().min(2, 'Минимум 2 символа'),
})

type FormValues = z.infer<typeof schema>

export function DemoForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    mode: 'onChange',
  })

  const onSubmit = (data: FormValues) => {
    console.log('Submitted:', data)
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-sm"
    >
      <ControlledInput
        name="name"
        control={control}
        label="Имя"
        placeholder="Введите имя"
      />

      <ControlledInput
        name="email"
        control={control}
        label="Email"
        type="email"
        placeholder="email@example.com"
      />

      <ControlledInput
        name="password"
        control={control}
        label="Пароль"
        type="password"
        placeholder="Минимум 8 символов"
      />

      <UiButton type="submit" variant="primary">
        Отправить
      </UiButton>
    </form>
  )
}
