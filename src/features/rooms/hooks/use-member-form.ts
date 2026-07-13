import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { memberValidationSchema } from '@/shared/schemas/member-validation-schema.ts'
import { RoomRole } from '@/shared/models/room/room-role.model.ts'
import { useAddMember } from '@/features/rooms/hooks/use-room-member-mutations.ts'

type MemberFormValues = z.infer<typeof memberValidationSchema>

interface UseMemberFormI {
  roomId: string
  onSuccess?: () => void
}

export function useMemberForm({ roomId, onSuccess }: UseMemberFormI) {
  const addMember = useAddMember()

  const methods = useForm<MemberFormValues>({
    resolver: zodResolver(memberValidationSchema),
    defaultValues: {
      email: '',
      role: RoomRole.User,
    },
  })

  const submit = methods.handleSubmit(async values => {
    await addMember.mutateAsync({ roomId, member: values })
    methods.reset({ email: '', role: RoomRole.User })
    onSuccess?.()
  })

  const error =
    addMember.error?.message ?? methods.formState.errors.root?.message ?? null

  return {
    submit,
    isPending: addMember.isPending,
    error,
    ...methods,
  }
}
