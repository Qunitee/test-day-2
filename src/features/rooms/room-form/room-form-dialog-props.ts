import type {RoomI} from "@/shared/models/room/room.model.ts";
import type {ReactNode} from "react";

export interface RoomFormDialogProps {
  room?: RoomI
  trigger: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}
