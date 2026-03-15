import { Appointment, Chat, Member, Process, Task } from "../../interfaces"

export const members: Member[] = [
  //House 11
  { id: 3420, name: "Martin Eriksen" }, // 38, IT consultant, father of three, enjoys cooking for the whole house
  { id: 3421, name: "Astrid Eriksen" }, // 36, Pediatrician, mother of three, organizes family game nights
  { id: 3428, name: "Isabella Rossi" }, // 72, Elena's mother, retired teacher, loves gardening and storytelling

  //House 12
  { id: 3436, name: "Mateo Santos" }, // 35, Social worker specializing in youth programs, passionate about community building

  //House 13
  { id: 3101, name: "Sophie Dubois" }, // 28, nurse, single, loves yoga and reading
  { id: 3102, name: "Markus Schmidt" }, // 35, teacher, married to Lena (3103), has a 5-year-old son
  { id: 3103, name: "Lena Schmidt" }, // 33, graphic designer, married to Markus (3102), passionate about art
  { id: 3106, name: "Nikolai Ivanov" }, // 37, architect, married, has twins (age 3)
  { id: 3109, name: "Amelia Nowak" }, // 34, freelance writer, single mom with a 7-year-old daughter
  { id: 3113, name: "Emilia Virtanen" }, // 27, elementary school teacher, engaged, enjoys painting

  //House 21
  { id: 3437, name: "Olivia Andersson" }, // 32, Marketing executive, single mother with a 1-year-old baby
  { id: 3439, name: "Maria Svensson" }, // 39, High school teacher, married to Erik, passionate about literature
  { id: 3446, name: "Nikolai Petrov" }, // 40, Physiotherapist, married with two children, coaches a youth soccer team

  //House 22
  { id: 3456, name: "Tobias Hoffmann" }, // 33, Startup founder, married with a toddler, tech enthusiast
  { id: 3463, name: "Linnea Bergström" }, // 34, Veterinarian, divorced with a young daughter, animal rights activist

  //House 23
  { id: 3475, name: "Annika Bergman" }, // 72, Former social worker, coordinates volunteer activities
]

export const chats: Chat[] = []
export const tasks: Task[] = []
export const appointments: Appointment[] = []
export const processes: Process[] = []
export const IAmMember = false
export const isPublic = true