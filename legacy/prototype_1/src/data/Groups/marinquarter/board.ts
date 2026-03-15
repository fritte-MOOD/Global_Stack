import { Appointment, Chat, Member, Process, Task } from "../../interfaces"

export const members: Member[] = [
  // House 1 Representative
  { id: 3406, name: "Sven Eriksson" }, // 25, Engineering graduate student, eco-conscious, leads recycling initiatives in the house

  // House 2 Representative
  { id: 3413, name: "Matteo Bianchi" }, // 23, Political science student, active in student government, loves debate

  // House 11 Representative
  { id: 3420, name: "Martin Eriksen" }, // 38, IT consultant, father of three, enjoys cooking for the whole house

  // House 12 Representative
  { id: 3429, name: "Clara Bergmann" }, // 29, Environmental scientist, passionate about sustainable living

  // House 13 Representative
  { id: 3114, name: "Henri Lefebvre" }, // 42, lawyer, divorced with two teenagers, cycling enthusiast

  // House 21 Representative
  { id: 3442, name: "Fatima Al-Rashid" }, // 45, University professor, divorced, active in local politics

  // House 22 Representative
  { id: 3458, name: "Magnus Olsen" }, // 42, High school principal, married with two teenagers, community leader

  // House 23 Representative
  { id: 3475, name: "Annika Bergman" }, // 72, Former social worker, coordinates volunteer activities

  // Three executive members (middle-aged adults with a sense of responsibility)
  { id: 3500, name: "Elena Kovač" }, // 48, Urban planner, married with grown children, experienced in community development
  { id: 3501, name: "Thomas Andersen" }, // 52, Corporate sustainability officer, divorced, passionate about green initiatives
  { id: 3502, name: "Amara Okafor" }, // 46, Non-profit executive, single, expert in conflict resolution and community organizing
]

export const chats: Chat[] = []
export const tasks: Task[] = []
export const appointments: Appointment[] = []
export const processes: Process[] = []
export const IAmMember = false
export const isPublic = false