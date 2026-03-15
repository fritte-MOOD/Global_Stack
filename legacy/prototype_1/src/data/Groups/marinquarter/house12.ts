import { Appointment, Chat, Member, Process, Task } from "../../interfaces"

export const members: Member[] = [
  { id: 3429, name: "Clara Bergmann" }, // 29, Environmental scientist, passionate about sustainable living
  { id: 3430, name: "Finn Larsson" }, // 34, Architect specializing in eco-friendly design, avid rock climber
  { id: 3431, name: "Amelia Nowak" }, // 31, Freelance graphic designer, organizes community art projects
  { id: 3432, name: "Hugo Dubois" }, // 27, Chef at a local vegetarian restaurant, loves experimenting with urban gardening
  { id: 3433, name: "Zoe Chen" }, // 33, Software engineer working remotely, yoga instructor in her free time
  { id: 3434, name: "Luca Rossi" }, // 30, Journalist focusing on social issues, amateur photographer
  { id: 3435, name: "Emilia Kowalski" }, // 28, Primary school teacher, volunteers at the local animal shelter
  { id: 3436, name: "Mateo Santos" }, // 35, Social worker specializing in youth programs, passionate about community building
]

export const chats: Chat[] = []
export const tasks: Task[] = []
export const appointments: Appointment[] = []
export const processes: Process[] = []
export const IAmMember = false
export const isPublic = false