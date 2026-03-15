import { Appointment, Chat, Member, Process, Task } from "../../interfaces"

export const members: Member[] = [
  //House 1
  { id: 3406, name: "Sven Eriksson" }, // 25, Engineering graduate student, eco-conscious, leads recycling initiatives in the house

  //House 2
  { id: 3419, name: "Chloe Bennett" }, // 22, Environmental ethics student, zero-waste lifestyle advocate, community garden volunteer

  //House 11
  { id: 3428, name: "Isabella Rossi" }, // 72, Elena's mother, retired teacher, loves gardening and storytelling

  //House 12
  { id: 3429, name: "Clara Bergmann" }, // 29, Environmental scientist, passionate about sustainable living
  { id: 3432, name: "Hugo Dubois" }, // 27, Chef at a local vegetarian restaurant, loves experimenting with urban gardening

  //House 13
  { id: 3105, name: "Elin Andersson" }, // 29, marketing manager, single, fitness enthusiast
  { id: 3107, name: "Isabel Fernández" }, // 31, veterinarian, single, volunteers at animal shelters

  //House 21
  { id: 3445, name: "Ava Kowalski" }, // 31, Environmental lawyer, engaged, organizes community clean-up events
  { id: 3451, name: "Sophia Chen" }, // 30, Data scientist, single, volunteers teaching coding to underprivileged youth

  //House 22
  { id: 3455, name: "Camille Laurent" }, // 28, Environmental consultant, engaged, organizes local sustainability workshops
  { id: 3460, name: "Florian Weber" }, // 35, Renewable energy engineer, single, avid cyclist and environmentalist
  { id: 3466, name: "Tomas Novák" }, // 38, Architect, married with twins, specializes in sustainable building design

  //House 23
  { id: 3477, name: "Beatrice Lefèvre" }, // 77, Former botanist, maintains a beautiful balcony garden
  { id: 3481, name: "Marianne Nielsen" }, // 76, Former travel agent, organizes virtual travel nights
]

export const chats: Chat[] = []
export const tasks: Task[] = []
export const appointments: Appointment[] = []
export const processes: Process[] = []
export const IAmMember = false
export const isPublic = true