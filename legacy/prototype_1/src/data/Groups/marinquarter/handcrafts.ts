import { Appointment, Chat, Member, Process, Task } from "../../interfaces"
export const description = "Marin Quarter Handcrafts Group"

export const content = "The Handcrafts Group is a vibrant community within Marin Quarter dedicated to fostering creativity, skill-sharing, and collaborative projects. Our members come from diverse backgrounds and houses, bringing a wide range of skills and interests to our shared workshop space. From woodworking to textile arts, electronics to painting, we support and inspire each other in our creative endeavors."

export const rules = `
1. Always clean up after yourself and return tools to their designated places.
2. Respect the workshop reservation system and others' scheduled time slots.
3. Wear appropriate safety gear when using power tools or hazardous materials.
4. Report any damaged or malfunctioning equipment to the group coordinators immediately.
5. Share knowledge and skills willingly, but respect others' intellectual property.
6. Be mindful of noise levels, especially during evening hours.
7. Contribute to the maintenance and upkeep of the shared workshop space.
8. Obtain proper training before using unfamiliar tools or equipment.
9. Respect others' projects and materials; ask before borrowing or using.
10. Participate in periodic workshop clean-up days and community projects.
11. Follow sustainable practices and minimize waste in your projects.
12. Be inclusive and supportive of all skill levels and creative pursuits.
`
export const members: Member[] = [
  { id: 1, name: "You" }, // Your character: 32, Political activist, welcoming, collaborative and empathetic, but assertive, concerned and strict.

  //House 1
  { id: 3401, name: "Alex Chen" }, // 22, Engineering student, loves tinkering with electronics, organizes house parties
  { id: 3402, name: "Dmitri Volkov" }, // 24, Physics PhD student, quiet but brilliant, enjoys stargazing
  { id: 3403, name: "Marco Rossi" }, // 21, Mechanical engineering student, passionate about motorcycles, runs a small repair business
  { id: 3404, name: "Jamal Ahmed" }, // 23, Mathematics student, chess enthusiast, tutors part-time
  { id: 3405, name: "Felix Müller" }, // 20, Computer science freshman, gamer, developing an indie game in his spare time
  { id: 3406, name: "Sven Eriksson" }, // 25, Engineering graduate student, eco-conscious, leads recycling initiatives in the house
  { id: 3407, name: "Liam O'Connor" }, // 22, Robotics student, always working on a new invention, slightly absent-minded

  //House 2
  { id: 3408, name: "Emma Dubois" }, // 23, French literature student, organizes poetry nights, loves cooking
  { id: 3414, name: "Nadia Petrov" }, // 22, Linguistics major, polyglot, organizes language exchange meetups


  //House 12
  { id: 3431, name: "Amelia Nowak" }, // 31, Freelance graphic designer, organizes community art projects
  { id: 3432, name: "Hugo Dubois" }, // 27, Chef at a local vegetarian restaurant, loves experimenting with urban gardening

  //House 13
  { id: 3103, name: "Lena Schmidt" }, // 33, graphic designer, married to Markus (3102), passionate about art
  { id: 3106, name: "Nikolai Ivanov" }, // 37, architect, married, has twins (age 3)
  { id: 3112, name: "Andreas Papadopoulos" }, // 30, chef, single, organizes community dinners

  //House 21
  { id: 3440, name: "Lukas Novotny" }, // 35, Freelance photographer, single, travels frequently for work
  { id: 3448, name: "Carlos Fernandez" }, // 34, Graphic designer, married, passionate about urban sketching

  //House 22
  { id: 3457, name: "Elisa Moretti" }, // 37, Art gallery curator, single, passionate about promoting local artists
  { id: 3463, name: "Linnea Bergström" }, // 34, Veterinarian, divorced with a young daughter, animal rights activist

  //House 23
  { id: 3473, name: "Elsa Johansson" }, // 79, Former artist, teaches painting to interested housemates
  { id: 3476, name: "Giovanni Marino" }, // 81, Retired tailor, still does alterations for his housemates
  { id: 3480, name: "Piotr Kowalski" }, // 79, Retired carpenter, helps with small repairs around the house
]

export const chats: Chat[] = [
  {
    id: 3501,
    members: members.map(member => member.id),
    messages: [
      {
        new: false, at: { time: "09:00", distance: -100 }, sentBy: 3457, supportedBy: [3473],
        content: "Morning everyone! Just updated the workshop rules in the Documents area. Please take a look when you get a chance. Let me know if you have any questions.",
      },
      {
        new: false,
        at: { time: "09:15", distance: -92 },
        sentBy: 3401,
        supportedBy: [],
        content: "Hey all, Alex here from House 1. Looking forward to working on some projects with you guys. Anyone need a hand with electronics?",
      },
      {
        new: false,
        at: { time: "10:30", distance: -74 },
        sentBy: 3403,
        supportedBy: [],
        content: "Has anyone seen the 3/8 wrench? It's not in its usual spot and I really need it for my project.",
      },
      {
        new: false,
        at: { time: "10:45", distance: -74 },
        sentBy: 3106,
        supportedBy: [],
        content: "Marco, I think I used it last. Should be on the pegboard, but if not, I'll come help you look for it after work.",
      },
      {
        new: false,
        at: { time: "11:20", distance: -56 },
        sentBy: 3431,
        supportedBy: [3103, 3448],
        content: "Guys, the painting area was pretty messy this morning. Could we try to clean up a bit better after we're done? It makes it tough for the next person.",
      },
      {
        new: false,
        at: { time: "13:45", distance: -45 },
        sentBy: 3476,
        supportedBy: [],
        content: "I won't be using my sewing slot tomorrow afternoon. Up for grabs if anyone wants it.",
      },
      {
        new: false,
        at: { time: "14:30", distance: -45 },
        sentBy: 3408,
        supportedBy: [],
        content: "I'll take that slot, Giovanni, if no one else has claimed it yet. Thanks!",
      },
      {
        new: false,
        at: { time: "16:00", distance: -28 },
        sentBy: 1,
        supportedBy: [],
        content: "Hey everyone, a friend of mine is selling a metal lathe. Thought it might be useful for the workshop. Should we consider it?",
      },
      {
        new: false,
        at: { time: "16:15", distance: -28 },
        sentBy: 3457,
        supportedBy: [],
        content: "Interesting idea. Let's discuss it at the next meeting. Could you get more details on the specs and price?",
      },
      {
        new: false,
        at: { time: "16:20", distance: -28 },
        sentBy: 1,
        supportedBy: [],
        content: "Sure thing, Elisa. I'll get the info and share it before the meeting.",
      },
      {
        new: false,
        at: { time: "09:00", distance: -27 },
        sentBy: 3457,
        supportedBy: [],
        content: "Quick reminder: Piotr's carpentry workshop is this Saturday at 2 PM. Great chance to learn some new skills!",
      },
      {
        new: false,
        at: { time: "09:15", distance: -27 },
        sentBy: 3480,
        supportedBy: [],
        content: "Looking forward to sharing some carpentry basics with you all. Don't forget your safety goggles!",
      },
      {
        new: false,
        at: { time: "10:00", distance: -12 },
        sentBy: 3414,
        supportedBy: [],
        content: "Hi everyone, Nadia here. Just moved into House 2. I'm pretty handy with a needle and thread if anyone needs help with that.",
      },
      {
        new: false,
        at: { time: "10:05", distance: -12 },
        sentBy: 3457,
        supportedBy: [],
        content: "Welcome, Nadia! Glad to have you join us. Feel free to check out the workshop when you have a chance.",
      },
      {
        new: false,
        at: { time: "10:10", distance: -10 },
        sentBy: 3401,
        supportedBy: [],
        content: "Welcome aboard, Nadia! Maybe you can help me figure out how to sew a straight line someday. My attempts have been... interesting.",
      },
    ],
  },
]
export const tasks: Task[] = [
  {
    id: 3501,
    done: true,
    dueAt: { time: "09:00", distance: -365 },
    assignedBy: 3457,
    description: "Workshop Cleaning Duty",
    content: "Deep clean the workshop area, including organizing tools, wiping down surfaces, and ensuring all equipment is in its designated place. Pay special attention to the painting area and shared workbenches.",
  },
  {
    id: 3502,
    done: true,
    dueAt: { time: "09:00", distance: -275 },
    assignedBy: 3457,
    description: "Workshop Cleaning Duty",
    content: "Deep clean the workshop area, including organizing tools, wiping down surfaces, and ensuring all equipment is in its designated place. Pay special attention to the painting area and shared workbenches.",
  },
  {
    id: 3503,
    done: true,
    dueAt: { time: "09:00", distance: -185 },
    assignedBy: 3457,
    description: "Workshop Cleaning Duty",
    content: "Deep clean the workshop area, including organizing tools, wiping down surfaces, and ensuring all equipment is in its designated place. Pay special attention to the painting area and shared workbenches.",
  },
  {
    id: 3504,
    done: true,
    dueAt: { time: "09:00", distance: -95 },
    assignedBy: 3457,
    description: "Workshop Cleaning Duty",
    content: "Deep clean the workshop area, including organizing tools, wiping down surfaces, and ensuring all equipment is in its designated place. Pay special attention to the painting area and shared workbenches.",
  },
]
export const appointments: Appointment[] = [
  {
    id: 3501,
    at: { time: "14:00", distance: -99 },
    createdBy: 3401,
    invited: [],
    accepted: [3401],
    declined: [],
    description: "Workshop Reservation (Alex Chen)",
    content: "Electronics project work",
  },
  {
    id: 3502,
    at: { time: "10:00", distance: -93 },
    createdBy: 3473,
    invited: [],
    accepted: [3473],
    declined: [],
    description: "Workshop Reservation (Elsa Johansson)",
    content: "Painting session",
  },
  {
    id: 3503,
    at: { time: "15:00", distance: -85 },
    createdBy: 3403,
    invited: [],
    accepted: [3403],
    declined: [],
    description: "Workshop Reservation (Marco Rossi)",
    content: "Motorcycle part repair",
  },
  {
    id: 3504,
    at: { time: "11:00", distance: -82 },
    createdBy: 3431,
    invited: [],
    accepted: [3431],
    declined: [],
    description: "Workshop Reservation (Amelia Nowak)",
    content: "Community art project preparation",
  },
  {
    id: 3505,
    at: { time: "13:00", distance: -72 },
    createdBy: 3476,
    invited: [],
    accepted: [3476],
    declined: [],
    description: "Workshop Reservation (Giovanni Marino)",
    content: "Sewing alterations",
  },
  {
    id: 3506,
    at: { time: "09:00", distance: -70 },
    createdBy: 3480,
    invited: [],
    accepted: [3480],
    declined: [],
    description: "Workshop Reservation (Piotr Kowalski)",
    content: "Carpentry project",
  },
  {
    id: 3507,
    at: { time: "16:00", distance: -62 },
    createdBy: 1,
    invited: [],
    accepted: [1],
    declined: [],
    description: "Workshop Reservation (You)",
    content: "Personal project work",
  },
  {
    id: 3508,
    at: { time: "14:00", distance: -58 },
    createdBy: 3408,
    invited: [],
    accepted: [3408],
    declined: [],
    description: "Workshop Reservation (Emma Dubois)",
    content: "Crafting poetry night decorations",
  },
  {
    id: 3509,
    at: { time: "10:00", distance: -50 },
    createdBy: 3457,
    invited: [],
    accepted: [3457],
    declined: [],
    description: "Workshop Reservation (Elisa Moretti)",
    content: "Art project for upcoming exhibition",
  },
  {
    id: 3510,
    at: { time: "11:00", distance: -40 },
    createdBy: 3414,
    invited: [],
    accepted: [3414],
    declined: [],
    description: "Workshop Reservation (Nadia Petrov)",
    content: "Crafting language exchange materials",
  },
  {
    id: 3511,
    at: { time: "15:00", distance: -35 },
    createdBy: 3106,
    invited: [],
    accepted: [3106],
    declined: [],
    description: "Workshop Reservation (Nikolai Ivanov)",
    content: "Architectural model building",
  },
  {
    id: 3512,
    at: { time: "13:00", distance: -28 },
    createdBy: 3112,
    invited: [],
    accepted: [3112],
    declined: [],
    description: "Workshop Reservation (Andreas Papadopoulos)",
    content: "Repairing kitchen equipment",
  },
  {
    id: 3513,
    at: { time: "10:00", distance: -29 },
    createdBy: 3440,
    invited: [],
    accepted: [3440],
    declined: [],
    description: "Workshop Reservation (Lukas Novotny)",
    content: "Building a photography backdrop",
  },
  {
    id: 3514,
    at: { time: "14:00", distance: -15 },
    createdBy: 3448,
    invited: [],
    accepted: [3448],
    declined: [],
    description: "Workshop Reservation (Carlos Fernandez)",
    content: "Urban sketching prep",
  },
  {
    id: 3515,
    at: { time: "11:00", distance: -9 },
    createdBy: 3463,
    invited: [],
    accepted: [3463],
    declined: [],
    description: "Workshop Reservation (Linnea Bergström)",
    content: "Crafting animal toys",
  },
  {
    id: 3516,
    at: { time: "16:00", distance: -3 },
    createdBy: 3401,
    invited: [],
    accepted: [3401],
    declined: [],
    description: "Workshop Reservation (Alex Chen)",
    content: "Soldering workshop",
  },
  {
    id: 3517,
    at: { time: "09:00", distance: -1 },
    createdBy: 3473,
    invited: [],
    accepted: [3473],
    declined: [],
    description: "Workshop Reservation (Elsa Johansson)",
    content: "Painting class preparation",
  },
  {
    id: 3518,
    at: { time: "13:00", distance: 0 },
    createdBy: 3403,
    invited: [],
    accepted: [3403],
    declined: [],
    description: "Workshop Reservation (Marco Rossi)",
    content: "Bike maintenance workshop",
  },
]
export const processes: Process[] = []
export const IAmMember = true
export const isPublic = true