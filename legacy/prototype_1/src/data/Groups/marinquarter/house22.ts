import { Appointment, Chat, Member, Process, Task } from "../../interfaces"

export const members: Member[] = [
  { id: 3452, name: "Viktor Pettersson" }, // 36, Civil engineer, married, passionate about urban development
  { id: 3453, name: "Nora Lindholm" }, // 31, Pediatric nurse, single, volunteers at children's hospitals
  { id: 3454, name: "Adrian Kovacs" }, // 40, University lecturer in economics, divorced, avid chess player
  { id: 3455, name: "Camille Laurent" }, // 28, Environmental consultant, engaged, organizes local sustainability workshops
  { id: 3456, name: "Tobias Hoffmann" }, // 33, Startup founder, married with a toddler, tech enthusiast
  { id: 3457, name: "Elisa Moretti" }, // 37, Art gallery curator, single, passionate about promoting local artists
  { id: 3458, name: "Magnus Olsen" }, // 42, High school principal, married with two teenagers, community leader
  { id: 3459, name: "Yara Al-Rashid" }, // 29, Pharmacist, newly married, enjoys cooking Middle Eastern cuisine
  { id: 3460, name: "Florian Weber" }, // 35, Renewable energy engineer, single, avid cyclist and environmentalist
  { id: 3461, name: "Anastasia Kuznetsova" }, // 32, Ballet dancer and instructor, single, organizes community dance events
  { id: 3462, name: "Rafael Santos" }, // 39, Corporate lawyer, married, wine enthusiast and amateur sommelier
  { id: 3463, name: "Linnea Bergström" }, // 34, Veterinarian, divorced with a young daughter, animal rights activist
  { id: 3464, name: "Dimitri Antonopoulos" }, // 41, Restaurant owner, married, passionate about Mediterranean cuisine
  { id: 3465, name: "Freya Nielsen" }, // 30, Journalist, single, focuses on investigative reporting on social issues
  { id: 3466, name: "Tomas Novák" }, // 38, Architect, married with twins, specializes in sustainable building design
]

export const chats: Chat[] = []
export const tasks: Task[] = []
export const appointments: Appointment[] = []
export const processes: Process[] = []
export const IAmMember = false
export const isPublic = false