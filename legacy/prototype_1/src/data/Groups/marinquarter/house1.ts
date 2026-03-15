import { Appointment, Chat, Member, Process, Task } from "../../interfaces"

export const members: Member[] = [
  { id: 3401, name: "Alex Chen" }, // 22, Engineering student, loves tinkering with electronics, organizes house parties
  { id: 3402, name: "Dmitri Volkov" }, // 24, Physics PhD student, quiet but brilliant, enjoys stargazing
  { id: 3403, name: "Marco Rossi" }, // 21, Mechanical engineering student, passionate about motorcycles, runs a small repair business
  { id: 3404, name: "Jamal Ahmed" }, // 23, Mathematics student, chess enthusiast, tutors part-time
  { id: 3405, name: "Felix Müller" }, // 20, Computer science freshman, gamer, developing an indie game in his spare time
  { id: 3406, name: "Sven Eriksson" }, // 25, Engineering graduate student, eco-conscious, leads recycling initiatives in the house
  { id: 3407, name: "Liam O'Connor" }, // 22, Robotics student, always working on a new invention, slightly absent-minded
]

export const chats: Chat[] = []
export const tasks: Task[] = []
export const appointments: Appointment[] = []
export const processes: Process[] = []
export const IAmMember = false
export const isPublic = false