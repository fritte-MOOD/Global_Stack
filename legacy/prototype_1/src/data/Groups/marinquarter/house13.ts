import { Appointment, Chat, Member, Process, Task } from "../../interfaces"

export const description = "House 13 of Marin Quarter Cohousing Community"

export const content = "House 13 is a vibrant and diverse community within the Marin Quarter Cohousing project. Our residents come from various backgrounds and professions, creating a rich tapestry of experiences and skills. We are committed to fostering a supportive and sustainable living environment while actively participating in the broader Marin Quarter community."

export const rules = `
1. Respect quiet hours from 10 PM to 7 AM.
2. Participate in monthly house meetings and decision-making processes.
3. Contribute to the cleanliness and maintenance of common areas.
4. Properly dispose of waste and recycling in designated areas.
5. Notify neighbors of any planned parties or events that may cause noise or increased traffic.
6. Use shared resources responsibly and considerately.
7. Communicate openly and respectfully with fellow house members.
8. Participate in the house's chore rotation system.
9. Respect the privacy and personal space of other residents.
10. Adhere to the broader Marin Quarter community guidelines and sustainability practices.
`

export const members: Member[] = [
  { id: 1, name: "You" }, // Your character: 32, Political activist, welcoming, collaborative and empathetic, but assertive, concerned and strict.
  { id: 3101, name: "Sophie Dubois" }, // 28, nurse, single, loves yoga and reading
  { id: 3102, name: "Markus Schmidt" }, // 35, teacher, married to Lena (3103), has a 5-year-old son
  { id: 3103, name: "Lena Schmidt" }, // 33, graphic designer, married to Markus (3102), passionate about art
  { id: 3104, name: "Giovanni Rossi" }, // 40, accountant, divorced, enjoys playing guitar
  { id: 3105, name: "Elin Andersson" }, // 29, marketing manager, single, fitness enthusiast
  { id: 3106, name: "Nikolai Ivanov" }, // 37, architect, married, has twins (age 3)
  { id: 3107, name: "Isabel Fernández" }, // 31, veterinarian, single, volunteers at animal shelters
  { id: 3108, name: "Mateo Kovač" }, // 26, grad student in environmental science, passionate about sustainability
  { id: 3109, name: "Amelia Nowak" }, // 34, freelance writer, single mom with a 7-year-old daughter
  { id: 3110, name: "Lukas Peeters" }, // 39, IT consultant, married to Olivia (3111), loves board games
  { id: 3111, name: "Olivia Peeters" }, // 36, psychologist, married to Lukas (3110), practices meditation
  { id: 3112, name: "Andreas Papadopoulos" }, // 30, chef, single, organizes community dinners
  { id: 3113, name: "Emilia Virtanen" }, // 27, elementary school teacher, engaged, enjoys painting
  { id: 3114, name: "Henri Lefebvre" }, // 42, lawyer, divorced with two teenagers, cycling enthusiast
  { id: 3115, name: "Catalina Popescu" }, // 32, social worker, single, active in community outreach
  { id: 3116, name: "Willem van der Meer" }, // 45, small business owner, married, has a 10-year-old son, amateur photographer
]

export const chats: Chat[] = [
  {
    id: 3101,
    members: [1, 3101, 3102, 3103, 3104, 3105, 3106, 3107, 3108, 3109, 3110, 3111, 3112, 3113, 3114, 3115, 3116],
    messages: [
      {
        new: false,
        at: { time: "09:15", distance: -300 },
        sentBy: 3114,
        supportedBy: [],
        content: "Good morning everyone. I hate to start the day with a complaint, but there's a pile of garbage in the hallway again. Can we please make sure to dispose of our trash properly?",
      },
      {
        new: false,
        at: { time: "09:20", distance: -300 },
        sentBy: 3105,
        supportedBy: [3107, 3110, 3115],
        content: "You're right, Henri. It's becoming a recurring issue. Maybe we should discuss this at our next house meeting?",
      },
      {
        new: false,
        at: { time: "09:25", distance: -300 },
        sentBy: 1,
        supportedBy: [3102, 3104, 3108, 3112],
        content: "I agree. Let's add it to the agenda. In the meantime, I'll put up a reminder notice near the trash bins.",
      },
      {
        new: false,
        at: { time: "14:30", distance: -200 },
        sentBy: 3109,
        supportedBy: [],
        content: "Hi everyone, has anyone seen a package for Amelia Nowak? It should have arrived yesterday.",
      },
      {
        new: false,
        at: { time: "14:45", distance: -200 },
        sentBy: 3103,
        supportedBy: [],
        content: "Amelia, I saw a package with your name in the lobby this morning. I put it on the shelf near the mailboxes.",
      },
      {
        new: false,
        at: { time: "14:50", distance: -200 },
        sentBy: 3109,
        supportedBy: [3103],
        content: "Thank you so much, Lena! I'll pick it up right away.",
      },
      {
        new: false,
        at: { time: "10:05", distance: -30 },
        sentBy: 3116,
        supportedBy: [],
        content: "Hello neighbors, I've injured my knee and can't go grocery shopping. Would anyone be able to pick up a few essentials for me when they next go to the store?",
      },
      {
        new: false,
        at: { time: "10:15", distance: -30 },
        sentBy: 3112,
        supportedBy: [3101, 3107, 3115],
        content: "I'm sorry to hear that, Willem. I'm heading to the store this afternoon. I'd be happy to pick up what you need. Send me your list, and I'll drop everything off at your door.",
      },
      {
        new: false,
        at: { time: "10:20", distance: -30 },
        sentBy: 3116,
        supportedBy: [3112],
        content: "Thank you so much, Andreas! You're a lifesaver. I'll send you the list right away.",
      },
    ],
  },
]

export const tasks: Task[] = []
export const appointments: Appointment[] = []
export const processes: Process[] = [
  {
    id: 3201,
    new: true,
    public: true,
    active: true,
    createdAt: { time: "14:00", distance: -7 },
    dueAt: { time: "20:00", distance: 2 },
    creator: 3114, // Henri Lefebvre
    description: "Election of New House 13 Board Representative",
    content: "Our current representative, Giovanni Rossi, has decided to step down. We need to elect a new representative for the upcoming year.",
    modules: [
      {
        id: 32011,
        type: "Ideation",
        dueAt: { time: "20:00", distance: -5 },
        description: "Nominate Candidates for Board Representative",
        content: "Please nominate candidates (including self-nominations) for the position of House 13 Board Representative.",
        options: [
          {
            id: 320111,
            createdAt: { time: "15:00", distance: -7 },
            createdBy: 3105,
            content: "I'd like to nominate Catalina Popescu. Her experience in social work and community outreach would be valuable.",
            comments: [
              {
                id: 3201111,
                createdAt: { time: "15:30", distance: -7 },
                createdBy: 3115,
                content: "Thank you for the nomination, Elin. I'd be honored to serve if elected.",
                new: false,
                supportedBy: [3105, 3107, 3113],
                comments: [],
              },
            ],
            new: false,
            supportedBy: [3105, 3107, 3113],
            rank: 0,
            description: "Catalina Popescu",
          },
          {
            id: 320112,
            createdAt: { time: "16:00", distance: -7 },
            createdBy: 3110,
            content: "I'd like to nominate myself, Lukas Peeters. My IT background could help modernize our communication systems.",
            comments: [],
            new: false,
            supportedBy: [3111, 3106],
            rank: 0,
            description: "Lukas Peeters",
          },
          {
            id: 320113,
            createdAt: { time: "17:00", distance: -7 },
            createdBy: 3102,
            content: "I nominate Sophie Dubois. Her nursing background gives her a unique perspective on community health and safety.",
            comments: [
              {
                id: 3201131,
                createdAt: { time: "17:30", distance: -7 },
                createdBy: 3101,
                content: "I appreciate the nomination, Markus. I'm willing to take on this responsibility if elected.",
                new: false,
                supportedBy: [3102, 3103, 3108],
                comments: [],
              },
            ],
            new: false,
            supportedBy: [3102, 3103, 3108],
            rank: 0,
            description: "Sophie Dubois",
          },
          {
            id: 320114,
            createdAt: { time: "18:00", distance: -7 },
            createdBy: 3112,
            content: "I'd like to nominate USER. Their experience and passion for community issues would be a great asset.",
            comments: [
              {
                id: 3201141,
                createdAt: { time: "18:30", distance: -7 },
                createdBy: 1,
                content: "Thank you for the nomination, Andreas. I'm willing to serve our community in this capacity if elected.",
                new: false,
                supportedBy: [3112, 3109, 3116],
                comments: [],
              },
            ],
            new: false,
            supportedBy: [3112, 3109, 3116],
            rank: 0,
            description: "USER",
          },
        ],
      },
      {
        id: 32012,
        type: "Vote",
        dueAt: { time: "20:00", distance: -1 },
        description: "Vote for New Board Representative",
        content: "Please cast your vote for the new House 13 Board Representative. You may vote for one candidate.",
        options: [
          {
            id: 320121,
            content: "Catalina Popescu",
            rank: 4,
            supportedBy: [3105, 3107, 3113, 3115],
            new: false,
            description: "",
            comments: [],
            createdAt: { time: "", distance: 0 },
            createdBy: 0,
          },
          {
            id: 320122,
            content: "Lukas Peeters",
            rank: 3,
            supportedBy: [3110, 3111, 3106],
            new: false,
            description: "",
            comments: [],
            createdAt: { time: "", distance: 0 },
            createdBy: 0,
          },
          {
            id: 320123,
            content: "Sophie Dubois",
            rank: 4,
            supportedBy: [3101, 3102, 3103, 3108],
            new: false,
            description: "",
            comments: [],
            createdAt: { time: "", distance: 0 },
            createdBy: 0,
          },
          {
            id: 320124,
            content: "USER",
            rank: 6,
            supportedBy: [3112, 3109, 3116, 1, 3104, 3114],
            new: false,
            description: "",
            comments: [],
            createdAt: { time: "", distance: 0 },
            createdBy: 0,
          },
        ],
      },
      {
        id: 32013,
        type: "Announcement",
        dueAt: { time: "", distance: 0 },
        description: "",
        content: "",
        options: [
          {
            id: 320131,
            description: "Announcement of New Board Representative: USER",
            createdAt: { time: "10:00", distance: 0 },
            content: "Dear residents of House 13,\n\nI'm pleased to announce that our new Board Representative has been elected. Congratulations to USER!\n\nAs the outgoing representative, I want to extend my heartfelt congratulations and share some insights about the role:\n\n1. You'll be our voice in quarterly board meetings, representing our interests and concerns.\n2. You'll be responsible for communicating board decisions back to us and organizing house meetings when necessary.\n3. You'll need to stay informed about building maintenance issues and liaise with the management company.\n4. You'll play a key role in conflict resolution among residents when needed.\n\nI have full confidence in your ability to excel in this position. Your passion for community issues and your collaborative approach will serve us well.\n\nThank you to all who participated in this election process. Let's give our new representative our full support.\n\nBest regards,\nGiovanni Rossi",
            comments: [
              {
                id: 3201311,
                createdAt: { time: "10:30", distance: 0 },
                createdBy: 3105,
                content: "Congratulations, USER! Your dedication to our community is inspiring. I'm looking forward to seeing the positive changes you'll bring.",
                new: false,
                supportedBy: [3107, 3113, 3115],
                comments: [],
              },
              {
                id: 3201312,
                createdAt: { time: "11:15", distance: 0 },
                createdBy: 3110,
                content: "Well done, USER! Your experience in community activism will be a great asset. If you need any help with tech-related issues, don't hesitate to ask.",
                new: false,
                supportedBy: [3106, 3111, 3108],
                comments: [],
              },
              {
                id: 3201313,
                createdAt: { time: "12:00", distance: 0 },
                createdBy: 3101,
                content: "Congratulations! As a nurse, I'm particularly excited about your focus on community well-being. Let's work together to make our building a healthier place for all residents.",
                new: false,
                supportedBy: [3102, 3103],
                comments: [],
              },
              {
                id: 3201314,
                createdAt: { time: "13:30", distance: 0 },
                createdBy: 3112,
                content: "Bravo, USER! Your passion for bringing people together is exactly what we need. I'm already thinking about organizing a community dinner to celebrate your new role!",
                new: false,
                supportedBy: [3109, 3116, 3114],
                comments: [],
              },
            ],
            new: false,
            createdBy: 0,
            supportedBy: [],
            rank: 0,
          },
        ],
      },
    ],
  },
]
export const IAmMember = true
export const isPublic = false