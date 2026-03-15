import { Appointment, Chat, Member, Process, Task } from "../../interfaces"

export const members: Member[] = [
  // House 1
  { id: 3406, name: "Sven Eriksson" }, // 25, Engineering graduate student, eco-conscious, leads recycling initiatives in the house

  // House 11
  { id: 3420, name: "Martin Eriksen" }, // 38, IT consultant, father of three, enjoys cooking for the whole house

  // House 12
  { id: 3430, name: "Finn Larsson" }, // 34, Architect specializing in eco-friendly design, avid rock climber

  // House 13
  { id: 3106, name: "Nikolai Ivanov" }, // 37, architect, married, has twins (age 3)

  // House 21
  { id: 3443, name: "Elena Rossi" }, // 33, Architect, newly married, passionate about sustainable urban planning

  // House 22
  { id: 3452, name: "Viktor Pettersson" }, // 36, Civil engineer, married, passionate about urban development
  { id: 3456, name: "Tobias Hoffmann" }, // 33, Startup founder, married with a toddler, tech enthusiast

  // House 23
  { id: 3468, name: "Gunnar Svensson" }, // 82, Former engineer, still tinkers with small inventions

  // Board Members
  { id: 3500, name: "Elena Kovač" }, // 48, Urban planner, married with grown children, experienced in community development
  { id: 3501, name: "Thomas Andersen" }, // 52, Corporate sustainability officer, divorced, passionate about green initiatives

  // External Experts
  { id: 3600, name: "Liam O'Connor" }, // 45, Construction project manager, experienced in residential renovations
  { id: 3601, name: "Sophie Chen" }, // 39, Interior designer, specializes in sustainable and eco-friendly materials
  { id: 3602, name: "Ahmed Hassan" }, // 41, Structural engineer, expertise in building safety and regulations
]

export const chats: Chat[] = []
export const tasks: Task[] = []
export const appointments: Appointment[] = []
export const processes: Process[] = []
export const IAmMember = false
export const isPublic = true