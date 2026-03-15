import { Appointment, Chat, Member, Process, Task } from "../../interfaces"

export const members: Member[] = [
  { id: 3467, name: "Helga Müller" }, // 78, Retired schoolteacher, organizes book club for the house
  { id: 3468, name: "Gunnar Svensson" }, // 82, Former engineer, still tinkers with small inventions
  { id: 3469, name: "Margherita Rossi" }, // 75, Retired chef, loves to cook for her housemates
  { id: 3470, name: "Bernard Dupont" }, // 80, Retired diplomat, fluent in five languages
  { id: 3471, name: "Ingrid Larsen" }, // 73, Former librarian, maintains the house's mini-library
  { id: 3472, name: "Klaus Weber" }, // 85, Retired doctor, offers health advice to his neighbors
  { id: 3473, name: "Elsa Johansson" }, // 79, Former artist, teaches painting to interested housemates
  { id: 3474, name: "Yuri Popov" }, // 76, Retired musician, organizes weekly classical music evenings
  { id: 3475, name: "Annika Bergman" }, // 72, Former social worker, coordinates volunteer activities
  { id: 3476, name: "Giovanni Marino" }, // 81, Retired tailor, still does alterations for his housemates
  { id: 3477, name: "Beatrice Lefèvre" }, // 77, Former botanist, maintains a beautiful balcony garden
  { id: 3478, name: "Hans Schröder" }, // 83, Retired history professor, gives lectures on European history
  { id: 3479, name: "Ester Lindström" }, // 74, Former nurse, helps organize health check-ups for the house
  { id: 3480, name: "Piotr Kowalski" }, // 79, Retired carpenter, helps with small repairs around the house
  { id: 3481, name: "Marianne Nielsen" }, // 76, Former travel agent, organizes virtual travel nights
]

export const chats: Chat[] = []
export const tasks: Task[] = []
export const appointments: Appointment[] = []
export const processes: Process[] = []
export const IAmMember = false
export const isPublic = false