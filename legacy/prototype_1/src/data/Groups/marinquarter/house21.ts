import { Appointment, Chat, Member, Process, Task } from "../../interfaces"

export const members: Member[] = [
  { id: 3437, name: "Olivia Andersson" }, // 32, Marketing executive, single mother with a 1-year-old baby
  { id: 3438, name: "Erik Svensson" }, // 41, Software engineer, married, enjoys weekend hiking
  { id: 3439, name: "Maria Svensson" }, // 39, High school teacher, married to Erik, passionate about literature
  { id: 3440, name: "Lukas Novotny" }, // 35, Freelance photographer, single, travels frequently for work
  { id: 3441, name: "Sophie Dubois" }, // 29, Nurse at the local hospital, volunteers at community health clinics
  { id: 3442, name: "Markus Weber" }, // 45, University professor, divorced, active in local politics
  { id: 3443, name: "Elena Rossi" }, // 33, Architect, newly married, passionate about sustainable urban planning
  { id: 3444, name: "Thomas Jansen" }, // 37, Financial analyst, single, amateur chef who loves hosting dinner parties
  { id: 3445, name: "Ava Kowalski" }, // 31, Environmental lawyer, engaged, organizes community clean-up events
  { id: 3446, name: "Nikolai Petrov" }, // 40, Physiotherapist, married with two children, coaches a youth soccer team
  { id: 3447, name: "Ingrid Larsson" }, // 36, Psychologist, single, practices mindfulness and leads meditation groups
  { id: 3448, name: "Carlos Fernandez" }, // 34, Graphic designer, married, passionate about urban sketching
  { id: 3449, name: "Lena Schmidt" }, // 38, Human resources manager, divorced with a teenage son, yoga enthusiast
  { id: 3450, name: "Matteo Bianchi" }, // 42, Restaurant owner, married, organizes community food festivals
  { id: 3451, name: "Sophia Chen" }, // 30, Data scientist, single, volunteers teaching coding to underprivileged youth
]

export const chats: Chat[] = []
export const tasks: Task[] = []
export const appointments: Appointment[] = []
export const processes: Process[] = []
export const IAmMember = false
export const isPublic = false