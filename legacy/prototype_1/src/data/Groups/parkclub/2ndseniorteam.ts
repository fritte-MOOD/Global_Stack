import { Appointment, Member } from "@/data/interfaces"

export const description = "2nd Senior Team of Park Club"

export const content = "The 2nd Senior Team is a competitive group of players representing Park Club in local and regional tournaments. We focus on skill development, team spirit, and enjoying the game of tennis."
export const rules = `  Attend at least 2 training sessions per week,
  Participate in team matches when selected,
  Maintain a positive attitude and support teammates,
  Adhere to the club's code of conduct,
  Inform the captain of any absences in advance`


export const members: Member[] = [
  { id: 1, name: "You" }, // Your character: Member of 2nd Senior Team and Execution Committee

  // 2nd Senior Team (14 players)
  { id: 1023, name: "Benjamin Lee" }, // 31, Team captain
  { id: 1024, name: "Olivia Andersson" }, // 29, Vice-captain
  { id: 1025, name: "Mohammed Al-Fayed" }, // 33, Experienced player
  { id: 1026, name: "Chloe Dubois" }, // 27, Improving rapidly
  { id: 1027, name: "Alejandro Fernandez" }, // 30, Known for his topspin
  { id: 1028, name: "Zara Mahmood" }, // 26, Excellent volleyer
  { id: 1029, name: "Lukas Novak" }, // 32, Mental toughness coach
  { id: 1030, name: "Ingrid Jansen" }, // 28, Fitness enthusiast
  { id: 1031, name: "Matteo Ricci" }, // 25, Recently joined from junior team
  { id: 1032, name: "Freya Larsson" }, // 31, Left-handed player
  { id: 1033, name: "Dmitri Volkov" }, // 34, Power player
  { id: 1034, name: "Aisha Mbeki" }, // 29, Known for her slice
  { id: 1035, name: "Sven Eriksson" }, // 33, Doubles specialist
  { id: 1036, name: "Mei Ling Chen" }, // 27, All-court player
]

export const appointments: Appointment[] = [
  // Training sessions
  {
    id: 2001,
    at: { time: "16:30", distance: -14 },
    createdBy: 1023,
    invited: members.map(member => member.id),
    accepted: members.map(member => member.id),
    declined: [],
    description: "Training Session",
    content: "Regular team practice focusing on drills and match play.",
  },
  {
    id: 2002,
    at: { time: "16:30", distance: -7 },
    createdBy: 1023,
    invited: members.map(member => member.id),
    accepted: members.map(member => member.id),
    declined: [],
    description: "Training Session",
    content: "Regular team practice focusing on drills and match play.",
  },
  {
    id: 2003,
    at: { time: "16:30", distance: 0 },
    createdBy: 1023,
    invited: members.map(member => member.id),
    accepted: members.map(member => member.id),
    declined: [],
    description: "Training Session",
    content: "Regular team practice focusing on drills and match play.",
  },
  {
    id: 2004,
    at: { time: "16:30", distance: 7 },
    createdBy: 1023,
    invited: members.map(member => member.id),
    accepted: [],
    declined: [],
    description: "Training Session",
    content: "Regular team practice focusing on drills and match play.",
  },
  {
    id: 2005,
    at: { time: "16:30", distance: -10 },
    createdBy: 1023,
    invited: members.map(member => member.id),
    accepted: members.map(member => member.id),
    declined: [],
    description: "Training Session",
    content: "Midweek practice session focusing on technique and strategy.",
  },
  {
    id: 2006,
    at: { time: "16:30", distance: -3 },
    createdBy: 1023,
    invited: members.map(member => member.id),
    accepted: members.map(member => member.id),
    declined: [],
    description: "Training Session",
    content: "Midweek practice session focusing on technique and strategy.",
  },
  {
    id: 2007,
    at: { time: "16:30", distance: 4 },
    createdBy: 1023,
    invited: members.map(member => member.id),
    accepted: [],
    declined: [],
    description: "Training Session",
    content: "Midweek practice session focusing on technique and strategy.",
  },
  {
    id: 2008,
    at: { time: "16:30", distance: 11 },
    createdBy: 1023,
    invited: members.map(member => member.id),
    accepted: [],
    declined: [],
    description: "Training Session",
    content: "Midweek practice session focusing on technique and strategy.",
  },
]

export const IAmMember = true
export const isPublic = false