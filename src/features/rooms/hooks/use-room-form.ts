import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import { roomValidationSchema } from '@/shared/schemas/room-validation-schema.ts'
import { useAuthStore } from '@/shared/store/auth-store/auth-store.ts'
import { RoomRole } from '@/shared/models/room/room-role.model.ts'
import {
  useCreateRoom,
  useUpdateRoom,
} from '@/features/rooms/hooks/use-room-mutations.ts'
import type { RoomI } from '@/shared/models/room/room.model.ts'

type RoomFormValues = z.infer<typeof roomValidationSchema>

interface UseRoomFormI {
  room?: RoomI
  onSuccess?: () => void
}

export function useRoomForm({ room, onSuccess }: UseRoomFormI = {}) {
  const user = useAuthStore(s => s.user)
  const createRoom = useCreateRoom()
  const updateRoom = useUpdateRoom()

  const isEdit = Boolean(room)
  const mutation = isEdit ? updateRoom : createRoom

  const methods = useForm<RoomFormValues>({
    resolver: zodResolver(roomValidationSchema),
    defaultValues: {
      name: room?.name ?? '',
      description: room?.description ?? '',
    },
  })

  const submit = methods.handleSubmit(async values => {
    if (isEdit && room) {
      await updateRoom.mutateAsync({ id: room.id, payload: values })
    } else {
      if (!user) {
        methods.setError('root', {
          message: 'You must be signed in to create a room',
        })
        return
      }
      await createRoom.mutateAsync({
        ...values,
        createdBy: user.uid,
        members: [{ email: user.email, role: RoomRole.Admin }],
      })
    }
    onSuccess?.()
  })

  const error =
    mutation.error?.message ?? methods.formState.errors.root?.message ?? null

  return {
    submit,
    isEdit,
    isPending: mutation.isPending,
    error,
    ...methods,
  }
}
