import { Appointment, Chat, Member, Process, Task } from "../../interfaces"

export const members: Member[] = [
  { id: 3420, name: "Martin Eriksen" }, // 38, IT consultant, father of three, enjoys cooking for the whole house
  { id: 3421, name: "Astrid Eriksen" }, // 36, Pediatrician, mother of three, organizes family game nights
  { id: 3422, name: "Liam Eriksen" }, // 12, Eldest Eriksen child, passionate about science experiments
  { id: 3423, name: "Sophia Eriksen" }, // 9, Middle Eriksen child, aspiring artist, loves painting
  { id: 3424, name: "Oscar Eriksen" }, // 6, Youngest Eriksen child, energetic and always curious
  { id: 3425, name: "Elena Rossi" }, // 41, University professor, single mother of two, yoga enthusiast
  { id: 3426, name: "Marco Rossi" }, // 14, Eldest Rossi child, talented musician, plays guitar in a local youth band
  { id: 3427, name: "Giulia Rossi" }, // 11, Youngest Rossi child, bookworm, dreams of becoming a writer
  { id: 3428, name: "Isabella Rossi" }, // 72, Elena's mother, retired teacher, loves gardening and storytelling
]

export const chats: Chat[] = []
export const tasks: Task[] = []
export const appointments: Appointment[] = []
export const processes: Process[] = []
export const IAmMember = false
export const isPublic = false