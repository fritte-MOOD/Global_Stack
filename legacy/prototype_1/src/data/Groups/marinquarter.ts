// Storyline:
//   Marin Quarter:
//   You are living in a chilled community with families, youngsters, students, adults and elders.
//   There are 7 houses, a communal area with a kitchen, a communal workshop for wood, bike repairs and metalworks and a Van, that everyone can use.
//   The decisionmaking is done by the board, which consists of one person from each house plus three executive members. so the platform is being used to let tenants participate and deliberate about decisions, and organize events, make reservations for the van or the workshop.
//
//
//   Subgroups:
// House 1: Students, in total 7. mostly young men studying mechanics or engineering, mathematics, physics etc. They like to have parties from time to time and dont have a lot of money. They love to use the workshop, but not so much the communal kitchen. They also have small businesses for goods that they produce in the workshop.
//   House 2: Also students, mixed with languages, philosophy, law, social science. 12 tenants in total. They keep it calm an like social gatherings
// House 11: two families share this house: 4 adults, 5 children and one elder person
// House 12: three families share this house: 6 adults and 5 children
// House 13: your house. you live with employed adults, some are couples, some with kids, some are singles. In total,17 people live in the house.
//   House 21: mostly employed adults, one single mother with a baby. in total 15
// House 22: similar to house 21
// House 23: only elders. Caretakers come daily, but some tenants also help in the house.
//   You are a Member of: House 13, handcrafts and shared dinner
//
//   Childcare: some of each house, topics are: guidelines for the discipline of kids in common spaces, birthday parties, shared childcare, doing their homework together on the afternoons, going to the park together etc...
//   Handcrafts: some of each house: make reservation for the workshop, buying new material, helping each other with machines and skills. Organization: one gets elected as the boss (currently Elisa Moretti) and makes the rules.
//   Shared Dinner: once a month there is a shared dinner and everyone who wants to parttake can be in this group and here its organized, who brings what.
//   Board: consists of on representative of each house, that get elected inside the houses subgroup and 3 executive members, that get elected by the whole Main group. They take care of communal money and how to spend it. They decide next steps in building and how the maintenance is done. They also publish policies and penaltys for everyone.
//   Building: planing and executing the boards decisions for contructions
//   Garden: free to decide how to use and form the green areas. anyone with or without ideas can come into this group and share the work.


import { Member, Process } from "../interfaces"
export const description = "Marin Quarter Cohousing Community"

export const content = "Marin Quarter is a vibrant cohousing community dedicated to sustainable living, mutual support, and shared decision-making. Our community consists of individual homes and shared spaces, fostering a balance between privacy and social interaction."

export const rules = `
1. Participate in community meetings and decision-making processes.
2. Contribute to shared meals and community events as scheduled.
3. Respect quiet hours from 10 PM to 7 AM.
4. Maintain your individual living space and contribute to the upkeep of common areas.
5. Use shared resources responsibly and sustainably.
6. Communicate openly and respectfully with fellow community members.
7. Adhere to the community's sustainability practices, including recycling and energy conservation.
8. Obtain approval from the community board for any major changes to individual homes or shared spaces.
9. Welcome and orient new members to the community.
10. Respect the privacy and boundaries of other community members.
`
export const members: Member[] = [
  { id: 1, name: "You" }, // Your character: 32, Political activist, welcoming, collaborative and empathetic, but assertive, concerned and strict.

  //House 13
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
  { id: 3409, name: "Lukas Novak" }, // 22, Philosophy major, always ready for deep discussions, yoga enthusiast
  { id: 3410, name: "Sofia Garcia" }, // 24, Law student, passionate about human rights, volunteers at legal aid clinic
  { id: 3411, name: "Oliver Schmidt" }, // 21, Sociology freshman, interested in urban cultures, amateur DJ
  { id: 3412, name: "Zoe Anderson" }, // 25, Psychology graduate student, mindfulness practitioner, peer counselor
  { id: 3413, name: "Matteo Bianchi" }, // 23, Political science student, active in student government, loves debate
  { id: 3414, name: "Nadia Petrov" }, // 22, Linguistics major, polyglot, organizes language exchange meetups
  { id: 3415, name: "Thomas Jansen" }, // 24, Anthropology student, passionate about indigenous cultures, documentary filmmaker
  { id: 3416, name: "Yuki Tanaka" }, // 21, International relations student, model UN participant, tea ceremony enthusiast
  { id: 3417, name: "Lena Kowalski" }, // 23, Gender studies major, activist for LGBTQ+ rights, runs a feminist book club
  { id: 3418, name: "Hassan Al-Farsi" }, // 25, Middle Eastern studies graduate student, calligraphy artist, organizes cultural events
  { id: 3419, name: "Chloe Bennett" }, // 22, Environmental ethics student, zero-waste lifestyle advocate, community garden volunteer

  //House 11
  { id: 3420, name: "Martin Eriksen" }, // 38, IT consultant, father of three, enjoys cooking for the whole house
  { id: 3421, name: "Astrid Eriksen" }, // 36, Pediatrician, mother of three, organizes family game nights
  { id: 3422, name: "Liam Eriksen" }, // 12, Eldest Eriksen child, passionate about science experiments
  { id: 3423, name: "Sophia Eriksen" }, // 9, Middle Eriksen child, aspiring artist, loves painting
  { id: 3424, name: "Oscar Eriksen" }, // 6, Youngest Eriksen child, energetic and always curious
  { id: 3425, name: "Elena Rossi" }, // 41, University professor, single mother of two, yoga enthusiast
  { id: 3426, name: "Marco Rossi" }, // 14, Eldest Rossi child, talented musician, plays guitar in a local youth band
  { id: 3427, name: "Giulia Rossi" }, // 11, Youngest Rossi child, bookworm, dreams of becoming a writer
  { id: 3428, name: "Isabella Rossi" }, // 72, Elena's mother, retired teacher, loves gardening and storytelling

  //House 12
  { id: 3429, name: "Clara Bergmann" }, // 29, Environmental scientist, passionate about sustainable living
  { id: 3430, name: "Finn Larsson" }, // 34, Architect specializing in eco-friendly design, avid rock climber
  { id: 3431, name: "Amelia Nowak" }, // 31, Freelance graphic designer, organizes community art projects
  { id: 3432, name: "Hugo Dubois" }, // 27, Chef at a local vegetarian restaurant, loves experimenting with urban gardening
  { id: 3433, name: "Zoe Chen" }, // 33, Software engineer working remotely, yoga instructor in her free time
  { id: 3434, name: "Luca Rossi" }, // 30, Journalist focusing on social issues, amateur photographer
  { id: 3435, name: "Emilia Kowalski" }, // 28, Primary school teacher, volunteers at the local animal shelter
  { id: 3436, name: "Mateo Santos" }, // 35, Social worker specializing in youth programs, passionate about community building

  //House 13 in the ID's 3100-3199

  //House 21
  { id: 3437, name: "Olivia Andersson" }, // 32, Marketing executive, single mother with a 1-year-old baby
  { id: 3438, name: "Erik Svensson" }, // 41, Software engineer, married, enjoys weekend hiking
  { id: 3439, name: "Maria Svensson" }, // 39, High school teacher, married to Erik, passionate about literature
  { id: 3440, name: "Lukas Novotny" }, // 35, Freelance photographer, single, travels frequently for work
  { id: 3441, name: "Sophie Dubois" }, // 29, Nurse at the local hospital, volunteers at community health clinics
  { id: 3442, name: "Markus Weber" }, // 45, University professor, divorced, active in local politics
  { id: 3443, name: "Elena Rossi" }, // 33, Architect, newly married, passionate about sustainable urban planning
  { id: 3444, name: "Thomas Jansen" }, // 37, Financial analyst, single, amateur chef who loves hosting dinner parties
  { id: 3445, name: "Ava Kowalski" }, // 31, Environmental lawyer, engaged, organizes community clean-up events
  { id: 3446, name: "Nikolai Petrov" }, // 40, Physiotherapist, married with two children, coaches a youth soccer team
  { id: 3447, name: "Ingrid Larsson" }, // 36, Psychologist, single, practices mindfulness and leads meditation groups
  { id: 3448, name: "Carlos Fernandez" }, // 34, Graphic designer, married, passionate about urban sketching
  { id: 3449, name: "Lena Schmidt" }, // 38, Human resources manager, divorced with a teenage son, yoga enthusiast
  { id: 3450, name: "Matteo Bianchi" }, // 42, Restaurant owner, married, organizes community food festivals
  { id: 3451, name: "Sophia Chen" }, // 30, Data scientist, single, volunteers teaching coding to underprivileged youth

  //House 22
  { id: 3452, name: "Viktor Pettersson" }, // 36, Civil engineer, married, passionate about urban development
  { id: 3453, name: "Nora Lindholm" }, // 31, Pediatric nurse, single, volunteers at children's hospitals
  { id: 3454, name: "Adrian Kovacs" }, // 40, University lecturer in economics, divorced, avid chess player
  { id: 3455, name: "Camille Laurent" }, // 28, Environmental consultant, engaged, organizes local sustainability workshops
  { id: 3456, name: "Tobias Hoffmann" }, // 33, Startup founder, married with a toddler, tech enthusiast
  { id: 3457, name: "Elisa Moretti" }, // 37, Art gallery curator, single, passionate about promoting local artists
  { id: 3458, name: "Magnus Olsen" }, // 42, High school principal, married with two teenagers, community leader
  { id: 3459, name: "Yara Al-Rashid" }, // 29, Pharmacist, newly married, enjoys cooking Middle Eastern cuisine
  { id: 3460, name: "Florian Weber" }, // 35, Renewable energy engineer, single, avid cyclist and environmentalist
  { id: 3461, name: "Anastasia Kuznetsova" }, // 32, Ballet dancer and instructor, single, organizes community dance events
  { id: 3462, name: "Rafael Santos" }, // 39, Corporate lawyer, married, wine enthusiast and amateur sommelier
  { id: 3463, name: "Linnea Bergström" }, // 34, Veterinarian, divorced with a young daughter, animal rights activist
  { id: 3464, name: "Dimitri Antonopoulos" }, // 41, Restaurant owner, married, passionate about Mediterranean cuisine
  { id: 3465, name: "Freya Nielsen" }, // 30, Journalist, single, focuses on investigative reporting on social issues
  { id: 3466, name: "Tomas Novák" }, // 38, Architect, married with twins, specializes in sustainable building design

  //House 23
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
export const processes: Process[] = [
  {
    id: 3001,
    new: false,
    public: true,
    active: false,
    createdAt: { time: "09:00", distance: -14 },
    dueAt: { time: "20:00", distance: -7 },
    creator: 3420,
    description: "Parties in the Communal Area",
    content: "We need to discuss and decide on the rules for using the communal area for parties and gatherings.",
    modules: [
      {
        id: 30011,
        type: "Debate",
        dueAt: { time: "20:00", distance: -12 },
        description: "Should we allow parties in the communal area?",
        content: "Please share your thoughts on whether we should allow parties in the communal area. Consider noise levels, cleanup, and impact on other residents.",
        options: [
          {
            id: 300111,
            createdAt: { time: "11:15", distance: -13 },
            createdBy: 3408,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Parties should be allowed in the communal area",
            content: "Yes, allow parties",
            comments: [
              {
                id: 3001111,
                createdAt: { time: "10:30", distance: -13 },
                createdBy: 3408,
                new: false,
                supportedBy: [3409, 3410, 3411],
                comments: [],
                content: "I think we should allow parties. It's a great way for us to socialize and build community spirit.",
              },
              {
                id: 3001112,
                createdAt: { time: "11:15", distance: -13 },
                createdBy: 3420,
                new: false,
                supportedBy: [3421, 3425],
                comments: [],
                content: "While I understand the desire for social gatherings, we need to consider the impact on families with young children.",
              },
              {
                id: 3001113,
                createdAt: { time: "12:00", distance: -13 },
                createdBy: 3401,
                new: false,
                supportedBy: [3402, 3403, 3404, 3405, 3406, 3407],
                comments: [],
                content: "As residents of House 1, we strongly believe that parties should be allowed. These gatherings are crucial for our social life and help us unwind from our studies. We're willing to compromise on noise levels and cleanup to keep this privilege.",
              },
              {
                id: 3001114,
                createdAt: { time: "12:45", distance: -13 },
                createdBy: 3437,
                new: false,
                supportedBy: [3438, 3439, 3440],
                comments: [],
                content: "While we appreciate the social aspect, as working adults, we need to prioritize a peaceful living environment. Perhaps we can find a middle ground that allows for socializing without disrupting others?",
              },
              {
                id: 3001115,
                createdAt: { time: "13:30", distance: -13 },
                createdBy: 3452,
                new: false,
                supportedBy: [3453, 3454, 3455],
                comments: [],
                content: "We agree with the concerns raised by other houses. While socializing is important, we need to ensure that it doesn't come at the cost of others' comfort and well-being.",
              },
            ],
          },
          {
            id: 300112,
            createdAt: { time: "11:15", distance: -13 },
            createdBy: 3467,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Parties should not be allowed in the communal area",
            content: "No, don't allow parties",
            comments: [
              {
                id: 3001121,
                createdAt: { time: "12:00", distance: -13 },
                createdBy: 3467,
                new: false,
                supportedBy: [3468, 3469, 3470],
                comments: [],
                content: "I believe we should not allow parties. The noise can be disruptive, especially for us older residents.",
              },
              {
                id: 3001122,
                createdAt: { time: "13:30", distance: -13 },
                createdBy: 1,
                new: false,
                supportedBy: [3101, 3102],
                comments: [],
                content: "Perhaps we can find a middle ground? Maybe allow gatherings but with noise restrictions and time limits?",
              },
              {
                id: 3001123,
                createdAt: { time: "14:15", distance: -13 },
                createdBy: 3429,
                new: false,
                supportedBy: [3430, 3431, 3432],
                comments: [],
                content: "As residents of House 12 with young families, we support restricting parties. The noise and late-night activities are disruptive to our children's sleep schedules.",
              },
              {
                id: 3001124,
                createdAt: { time: "15:00", distance: -13 },
                createdBy: 3401,
                new: false,
                supportedBy: [3402, 3403, 3404],
                comments: [],
                content: "We understand the concerns, but completely banning parties seems extreme. Can we discuss alternatives that allow for some social gatherings while addressing noise and timing issues?",
              },
              {
                id: 3001125,
                createdAt: { time: "15:45", distance: -13 },
                createdBy: 3420,
                new: false,
                supportedBy: [3421, 3425, 3437, 3438, 3452, 3453],
                comments: [],
                content: "While we hear House 1's concerns, the majority of residents seem to favor some form of restriction. Let's focus on finding a compromise that allows for social gatherings with clear guidelines to minimize disruption.",
              },
            ],
          },
        ],
      },
      {
        id: 30012,
        type: "Ideation",
        dueAt: { time: "20:00", distance: -10 },
        description: "New Rules for Communal Area Use",
        content: "Let's brainstorm some potential rules for using the communal area that could address everyone's concerns.",
        options: [
          {
            id: 300121,
            createdAt: { time: "09:00", distance: -11 },
            createdBy: 3412,
            new: false,
            supportedBy: [3413, 3414, 3415, 1],
            rank: 0,
            description: "Time Restrictions",
            content: "Implement time restrictions for gatherings, e.g., quiet hours after 10 PM.",
            comments: [
              {
                id: 3001211,
                createdAt: { time: "10:30", distance: -11 },
                createdBy: 3420,
                new: false,
                supportedBy: [3421, 3425],
                comments: [],
                content: "This could work well for families. It allows for gatherings but ensures quiet time for children.",
              },
            ],
          },
          {
            id: 300122,
            createdAt: { time: "11:00", distance: -11 },
            createdBy: 3456,
            new: false,
            supportedBy: [3457, 3458, 3459],
            rank: 0,
            description: "Booking System",
            content: "Implement a booking system for the communal area with a maximum number of attendees.",
            comments: [
              {
                id: 3001221,
                createdAt: { time: "12:15", distance: -11 },
                createdBy: 3467,
                new: false,
                supportedBy: [3468, 3469],
                comments: [],
                content: "A booking system could help manage the use of the space and prevent overcrowding.",
              },
            ],
          },
          {
            id: 300123,
            createdAt: { time: "13:30", distance: -11 },
            createdBy: 1,
            new: false,
            supportedBy: [3101, 3102, 3103],
            rank: 0,
            description: "Noise Limits",
            content: "Set decibel limits for music and require the use of noise-cancelling equipment for larger gatherings.",
            comments: [
              {
                id: 3001231,
                createdAt: { time: "14:45", distance: -11 },
                createdBy: 3408,
                new: false,
                supportedBy: [3409, 3410],
                comments: [],
                content: "This could be a fair compromise. It allows for gatherings while respecting others' need for quiet.",
              },
            ],
          },
          {
            id: 300124,
            createdAt: { time: "15:00", distance: -11 },
            createdBy: 3437,
            new: false,
            supportedBy: [3438, 3439, 3440, 1, 3101, 3102],
            rank: 0,
            description: "Restrict Large Parties",
            content: "Allow small gatherings but restrict large parties with external guests that go late into the night.",
            comments: [
              {
                id: 3001241,
                createdAt: { time: "15:30", distance: -11 },
                createdBy: 3420,
                new: false,
                supportedBy: [3421, 3425, 3467],
                comments: [],
                content: "This could be the best solution. It allows for community events while preventing disruptive parties.",
              },
            ],
          },
        ],
      },
      {
        id: 30013, type: "Prioritize", dueAt: { time: "20:00", distance: -8 }, description: "Rank the Proposed Rules",
        content: "Please rank the proposed rules for communal area use in order of preference.",
        options: [
          {
            id: 300131,
            content: "Time Restrictions",
            rank: 85,
            supportedBy: [3420, 3421, 3425, 3467, 3468, 3469],
            new: false,
            description: "Implement time restrictions for gatherings",
            comments: [],
            createdAt: { time: "09:00", distance: -9 },
            createdBy: 3412,
          },
          {
            id: 300132,
            content: "Booking System",
            rank: 70,
            supportedBy: [3456, 3457, 3458, 3459, 1, 3101],
            new: false,
            description: "Implement a booking system for the communal area",
            comments: [],
            createdAt: { time: "09:00", distance: -9 },
            createdBy: 3412,
          },
          {
            id: 300133,
            content: "Noise Limits",
            rank: 92,
            supportedBy: [3408, 3409, 3410, 3411, 3102, 3103],
            new: false,
            description: "Set decibel limits and require noise-cancelling equipment",
            comments: [],
            createdAt: { time: "09:00", distance: -9 },
            createdBy: 3412,
          },
          {
            id: 300134,
            content: "Restrict Large Parties",
            rank: 95,
            supportedBy: [3437, 3438, 3439, 3440, 1, 3101, 3102, 3420, 3421, 3425, 3467],
            new: false,
            description: "Allow small gatherings but restrict large parties with external guests",
            comments: [],
            createdAt: { time: "09:00", distance: -9 },
            createdBy: 3437,
          },
        ],
      },
      {
        id: 30014,
        type: "ExternalDecision",
        dueAt: { time: "20:00", distance: -7 },
        description: "Final Decision on Communal Area Use",
        content: "Based on the discussion and voting, the board has made the following decisions regarding the use of the communal area:",
        options: [
          {
            id: 300141,
            content: "approved",
            rank: 1,
            new: false,
            description: "Allow small gatherings but restrict large parties with external guests that go late into the night.",
            comments: [
              {
                id: 3001411,
                createdAt: { time: "19:05", distance: -7 },
                createdBy: 3420,
                new: false,
                supportedBy: [],
                comments: [],
                content: "This option received the highest support in the prioritization vote and addresses the concerns of both those who want to use the communal area for gatherings and those worried about noise and disruption.",
              },
            ],
            createdAt: { time: "19:00", distance: -7 },
            createdBy: 3420,
            supportedBy: [],
          },
          {
            id: 300142,
            content: "denied",
            rank: 0,
            new: false,
            description: "Time Restrictions: Quiet hours after 10 PM",
            comments: [
              {
                id: 3001421,
                createdAt: { time: "19:10", distance: -7 },
                createdBy: 3420,
                new: false,
                supportedBy: [],
                comments: [],
                content: "While this option had some support, it was deemed too restrictive for all types of gatherings. The approved option of restricting large parties is expected to naturally reduce late-night noise without imposing strict time limits.",
              },
            ],
            createdAt: { time: "19:00", distance: -7 },
            createdBy: 3420,
            supportedBy: [],
          },
          {
            id: 300143,
            content: "denied",
            rank: 0,
            new: false,
            description: "Noise Limits: Maximum 70 decibels, noise-cancelling equipment required for music",
            comments: [
              {
                id: 3001431,
                createdAt: { time: "19:15", distance: -7 },
                createdBy: 3420,
                new: false,
                supportedBy: [],
                comments: [],
                content: "This option was considered too complex to implement and enforce. The board believes that restricting large parties will naturally keep noise levels reasonable without the need for specific decibel limits or equipment requirements.",
              },
            ],
            createdAt: { time: "19:00", distance: -7 },
            createdBy: 3420,
            supportedBy: [],
          },
          {
            id: 300144,
            content: "approved",
            rank: 0,
            new: false,
            description: "Booking System: Maximum 30 attendees, must be booked 48 hours in advance",
            comments: [
              {
                id: 3001441,
                createdAt: { time: "19:20", distance: -7 },
                createdBy: 3420,
                new: false,
                supportedBy: [],
                comments: [],
                content: "This option was approved as it complements the decision to allow small gatherings while restricting large parties. It provides a clear system for managing the use of the communal area and helps prevent overcrowding or last-minute large gatherings.",
              },
            ],
            createdAt: { time: "19:00", distance: -7 },
            createdBy: 3420,
            supportedBy: [],
          },
        ],
      },
    ],
  },
  {
    id: 3002,
    new: true,
    public: true,
    active: true,
    createdAt: { time: "10:00", distance: 0 },
    dueAt: { time: "20:00", distance: 7 },
    creator: 3114,
    description: "Community Budget Allocation",
    content: "We are happy to announce that our budget is stabilizing and in the past year we could lay aside as much as 80,000€. This number is expected to stay constant in the next years. Let's collect ideas on how to use excess money to serve the community best.",
    modules: [
      {
        id: 30021,
        type: "Ideation",
        dueAt: { time: "20:00", distance: 3 },
        description: "Community Values and Goals for Budget Allocation",
        content: "Please submit values or goals that you believe are most important for our community when considering how to allocate our budget surplus.",
        options: [
          {
            id: 300211,
            createdAt: { time: "11:30", distance: 0 },
            createdBy: 3419,
            new: false,
            supportedBy: [3420, 3421, 3422, 3423, 3424, 3425, 3426, 3427, 3428, 3429, 3430, 3431, 3432, 1],
            rank: 0,
            description: "Sustainability",
            content: "Invest in sustainable technologies and practices to reduce our environmental impact.",
            comments: [
              {
                id: 3002111,
                createdAt: { time: "12:00", distance: 0 },
                createdBy: 3430,
                new: false,
                supportedBy: [3429, 3431, 3432],
                comments: [],
                content: "This is crucial for our long-term future. We could start with solar panels on our roofs and improve our waste management system.",
              },
              {
                id: 3002112,
                createdAt: { time: "12:45", distance: 0 },
                createdBy: 3401,
                new: false,
                supportedBy: [3402, 3403],
                comments: [],
                content: "As engineering students, we'd love to be involved in implementing sustainable tech solutions for our community!",
              },
            ],
          },
          {
            id: 300212,
            createdAt: { time: "12:15", distance: 0 },
            createdBy: 3401,
            new: false,
            supportedBy: [3402, 3403, 3404, 3405, 3406, 3407, 3408, 3409, 3410, 3411],
            rank: 0,
            description: "Community Spaces",
            content: "Improve and expand our shared spaces to foster more community interaction.",
            comments: [
              {
                id: 3002121,
                createdAt: { time: "13:00", distance: 0 },
                createdBy: 3457,
                new: false,
                supportedBy: [3458, 3459],
                comments: [],
                content: "I love this idea! We could create a multi-purpose space for art exhibitions, performances, and community meetings.",
              },
              {
                id: 3002122,
                createdAt: { time: "13:30", distance: 0 },
                createdBy: 1,
                new: false,
                supportedBy: [3101, 3102],
                comments: [],
                content: "Expanding our shared spaces could really help bring the community together. Maybe we could add an outdoor gathering area with seating and a barbecue?",
              },
            ],
          },
          {
            id: 300213,
            createdAt: { time: "13:00", distance: 0 },
            createdBy: 3467,
            new: false,
            supportedBy: [3468, 3469, 3470, 3471, 3472, 3473, 3474, 3475],
            rank: 0,
            description: "Accessibility",
            content: "Enhance accessibility features throughout the community to ensure inclusivity for all residents.",
            comments: [
              {
                id: 3002131,
                createdAt: { time: "14:00", distance: 0 },
                createdBy: 3472,
                new: false,
                supportedBy: [3473, 3474],
                comments: [],
                content: "As older residents, we really appreciate this focus. Installing more ramps and improving lighting in common areas would make a big difference.",
              },
              {
                id: 3002132,
                createdAt: { time: "14:30", distance: 0 },
                createdBy: 3441,
                new: false,
                supportedBy: [3442, 3443],
                comments: [],
                content: "This is so important. We should also consider adding assistive technologies in shared spaces for those with visual or hearing impairments.",
              },
            ],
          },
          {
            id: 300214,
            createdAt: { time: "14:30", distance: 0 },
            createdBy: 3437,
            new: false,
            supportedBy: [3438, 3439, 3440, 3441, 3442, 3443, 3444, 3445, 3446, 3447, 3448, 3449, 3450, 3451],
            rank: 0,
            description: "Education and Skill-sharing",
            content: "Create programs and spaces for community education and skill-sharing initiatives.",
            comments: [
              {
                id: 3002141,
                createdAt: { time: "15:15", distance: 0 },
                createdBy: 3408,
                new: false,
                supportedBy: [3409, 3410],
                comments: [],
                content: "This could be amazing! We could organize workshops, language exchange sessions, and even invite guest speakers from various fields.",
              },
              {
                id: 3002142,
                createdAt: { time: "15:45", distance: 0 },
                createdBy: 3478,
                new: false,
                supportedBy: [3479, 3480],
                comments: [],
                content: "As retirees, we have a lot of knowledge to share. This would be a great way to stay engaged and contribute to the community.",
              },
            ],
          },
          {
            id: 300215,
            createdAt: { time: "15:45", distance: 0 },
            createdBy: 3101,
            new: false,
            supportedBy: [3102, 3103, 3104, 3105, 3106, 1],
            rank: 0,
            description: "Health and Wellness",
            content: "Invest in health and wellness facilities or programs for the community.",
            comments: [
              {
                id: 3002151,
                createdAt: { time: "16:15", distance: 0 },
                createdBy: 3441,
                new: false,
                supportedBy: [3442, 3443],
                comments: [],
                content: "As a nurse, I fully support this. We could set up a small gym, organize fitness classes, and even bring in health professionals for regular check-ups.",
              },
              {
                id: 3002152,
                createdAt: { time: "16:45", distance: 0 },
                createdBy: 3447,
                new: false,
                supportedBy: [3448, 3449],
                comments: [],
                content: "Mental health is just as important as physical health. Perhaps we could allocate some funds for counseling services or stress-reduction workshops?",
              },
            ],
          },
        ],
      },
      {
        id: 30022,
        type: "Prioritize",
        dueAt: { time: "20:00", distance: 5 },
        description: "Rank Community Values and Goals for Budget Allocation",
        content: "Please rank the proposed community values and goals in order of importance for our budget allocation.",
        options: [
          {
            id: 300221,
            content: "Community Spaces",
            rank: 95,
            supportedBy: [3401, 3402, 3403, 3404, 3405, 3406, 3407, 3408, 3409, 3410, 3411, 3457, 3458, 3459, 1, 3101, 3102],
            new: false,
            description: "Improve and expand our shared spaces to foster more community interaction",
            comments: [],
            createdAt: { time: "10:00", distance: 1 },
            createdBy: 3114,
          },
          {
            id: 300222,
            content: "Sustainability",
            rank: 92,
            supportedBy: [3419, 3420, 3421, 3422, 3423, 3424, 3425, 3426, 3427, 3428, 3429, 3430, 3431, 3432, 1, 3401, 3402, 3403],
            new: false,
            description: "Invest in sustainable technologies and practices to reduce our environmental impact",
            comments: [],
            createdAt: { time: "10:00", distance: 1 },
            createdBy: 3114,
          },
          {
            id: 300223,
            content: "Health and Wellness",
            rank: 85,
            supportedBy: [3101, 3102, 3103, 3104, 3105, 3106, 1, 3441, 3442, 3443, 3447, 3448, 3449],
            new: false,
            description: "Invest in health and wellness facilities or programs for the community",
            comments: [],
            createdAt: { time: "10:00", distance: 1 },
            createdBy: 3114,
          },
          {
            id: 300224,
            content: "Education and Skill-sharing",
            rank: 52,
            supportedBy: [3437, 3438, 3439, 3440, 3441, 3442, 3443, 3444, 3445, 3446, 3447, 3448, 3449, 3450, 3451, 3408, 3409, 3410, 3478, 3479, 3480],
            new: false,
            description: "Create programs and spaces for community education and skill-sharing initiatives",
            comments: [],
            createdAt: { time: "10:00", distance: 1 },
            createdBy: 3114,
          },
          {
            id: 300225,
            content: "Accessibility",
            rank: 68,
            supportedBy: [3467, 3468, 3469, 3470, 3471, 3472, 3473, 3474, 3475, 3441, 3442, 3443],
            new: false,
            description: "Enhance accessibility features throughout the community to ensure inclusivity for all residents",
            comments: [],
            createdAt: { time: "10:00", distance: 1 },
            createdBy: 3114,
          },
        ],
      },
      {
        id: 30023, type: "Announcement", dueAt: { time: "", distance: 0 }, description: "Thank You and Next Steps",
        content: "Thank you for submitting your aims for our community budget allocation. We will now move on to collecting concrete ideas for improvements.",
        options: [
          {
            id: 300231,
            description: "Announcement of Results and Next Steps",
            createdAt: { time: "09:00", distance: 6 },
            createdBy: 3114,
            new: false,
            supportedBy: [],
            rank: 0,
            content: "Dear residents of Marin Quarter,\n\nThank you all for your active participation in prioritizing our community values and goals for budget allocation. Your input has been invaluable in shaping our community's direction.\n\nBased on the results, our top priorities are:\n\n1. Community Spaces\n2. Sustainability\n3. Health and Wellness\n4. Accessibility\n5. Education and Skill-sharing\n\nNow that we have established our priorities, we'd like to invite you to submit concrete ideas and proposals for how we can improve our community in line with these goals. In the next phase, we'll be collecting specific suggestions for projects, initiatives, or improvements that align with our top priorities.\n\nWhen submitting your ideas, please consider:\n- How the proposal aligns with our prioritized values and goals\n- Estimated costs and potential benefits\n- Implementation timeline and feasibility\n- How it will impact different groups within our community\n\nWe look forward to your creative and practical suggestions for making Marin Quarter an even better place to live.\n\nBest regards,\nThe Community Board",
            comments: [
              {
                id: 3002311,
                createdAt: { time: "10:30", distance: 6 },
                createdBy: 3419,
                new: false,
                supportedBy: [3420, 3421, 3422],
                comments: [],
                content: "This is exciting! I'm already brainstorming some ideas for sustainable initiatives we could implement.",
              },
              {
                id: 3002312,
                createdAt: { time: "11:15", distance: 6 },
                createdBy: 3401,
                new: false,
                supportedBy: [3402, 3403, 3404],
                comments: [],
                content: "Great to see community spaces as the top priority. We have some thoughts on how to make our shared areas more vibrant and inclusive.",
              },
              {
                id: 3002313,
                createdAt: { time: "12:00", distance: 6 },
                createdBy: 3467,
                new: false,
                supportedBy: [3468, 3469, 3470],
                comments: [],
                content: "Thank you for including accessibility in the top priorities. We're looking forward to suggesting improvements that will benefit all residents, regardless of age or ability.",
              },
            ],
          },
        ],
      },
      {
        id: 30024,
        type: "Ideation",
        dueAt: { time: "20:00", distance: 10 },
        description: "Concrete Ideas for Community Improvement",
        content: "Please submit your concrete ideas and proposals for improving our community, based on our prioritized values and goals.",
        options: [
          {
            id: 300241,
            createdAt: { time: "14:00", distance: 6 },
            createdBy: 3419,
            new: false,
            supportedBy: [3420, 3421, 3422, 3423, 3424],
            rank: 0,
            description: "Solar Panel Installation",
            content: "Install solar panels on all suitable rooftops in our community to reduce our carbon footprint and energy costs.",
            comments: [
              {
                id: 3002411,
                createdAt: { time: "14:30", distance: 6 },
                createdBy: 3401,
                new: false,
                supportedBy: [3402, 3403],
                comments: [],
                content: "Great idea! We could also look into battery storage systems to maximize the benefits of solar energy.",
              },
              {
                id: 3002412,
                createdAt: { time: "15:00", distance: 6 },
                createdBy: 3430,
                new: false,
                supportedBy: [3431, 3432],
                comments: [],
                content: "This aligns perfectly with our sustainability goals. We should also consider the potential for reduced electricity bills for residents.",
              },
            ],
          },
          {
            id: 300242,
            createdAt: { time: "15:30", distance: 6 },
            createdBy: 3457,
            new: false,
            supportedBy: [3458, 3459, 1, 3101, 3102],
            rank: 0,
            description: "Multi-purpose Community Center",
            content: "Convert the unused storage area into a multi-purpose community center for events, classes, and gatherings.",
            comments: [
              {
                id: 3002421,
                createdAt: { time: "16:00", distance: 6 },
                createdBy: 3408,
                new: false,
                supportedBy: [3409, 3410],
                comments: [],
                content: "This would be amazing for hosting skill-sharing workshops and community events!",
              },
              {
                id: 3002422,
                createdAt: { time: "16:30", distance: 6 },
                createdBy: 3467,
                new: false,
                supportedBy: [3468, 3469],
                comments: [],
                content: "Please ensure the space is fully accessible for all residents, including those with mobility issues.",
              },
            ],
          },
          {
            id: 300243,
            createdAt: { time: "17:00", distance: 6 },
            createdBy: 3441,
            new: false,
            supportedBy: [3442, 3443, 3444, 3445],
            rank: 0,
            description: "Community Fitness Program",
            content: "Establish a community fitness program with regular classes and a small gym in one of our shared spaces.",
            comments: [
              {
                id: 3002431,
                createdAt: { time: "17:30", distance: 6 },
                createdBy: 3101,
                new: false,
                supportedBy: [3102, 3103],
                comments: [],
                content: "This is a great way to promote health and wellness. We could also include nutrition workshops.",
              },
              {
                id: 3002432,
                createdAt: { time: "18:00", distance: 6 },
                createdBy: 3472,
                new: false,
                supportedBy: [3473, 3474],
                comments: [],
                content: "Please consider including low-impact exercises suitable for older residents or those with limited mobility.",
              },
            ],
          },
          {
            id: 300244,
            createdAt: { time: "18:30", distance: 6 },
            createdBy: 3401,
            new: false,
            supportedBy: [3402, 3403, 3404, 3405],
            rank: 0,
            description: "Guest House Construction",
            content: "Build a small guest house for visitors, which could also serve as a source of income for the community when not in use.",
            comments: [
              {
                id: 3002441,
                createdAt: { time: "19:00", distance: 6 },
                createdBy: 3457,
                new: false,
                supportedBy: [3458, 3459],
                comments: [],
                content: "This could be a great asset for our community. We should ensure it's built with sustainable materials and energy-efficient systems.",
              },
              {
                id: 3002442,
                createdAt: { time: "19:30", distance: 6 },
                createdBy: 3467,
                new: false,
                supportedBy: [3468, 3469],
                comments: [],
                content: "Let's make sure it's fully accessible and can accommodate guests with various needs.",
              },
            ],
          },
          {
            id: 300245,
            createdAt: { time: "20:00", distance: 6 },
            createdBy: 3419,
            new: false,
            supportedBy: [3420, 3421, 3422, 1, 3101],
            rank: 0,
            description: "Sustainable Common House Renovation",
            content: "Renovate our common house using sustainable materials and energy-efficient systems to reduce our environmental impact and operating costs.",
            comments: [
              {
                id: 3002451,
                createdAt: { time: "20:30", distance: 6 },
                createdBy: 3401,
                new: false,
                supportedBy: [3402, 3403],
                comments: [],
                content: "This is a great opportunity to showcase sustainable building practices. We could even organize tours for other communities to learn from our example.",
              },
              {
                id: 3002452,
                createdAt: { time: "21:00", distance: 6 },
                createdBy: 3472,
                new: false,
                supportedBy: [3473, 3474],
                comments: [],
                content: "During the renovation, let's also focus on improving accessibility features for all residents.",
              },
            ],
          },
          {
            id: 300246,
            createdAt: { time: "21:30", distance: 6 },
            createdBy: 3457,
            new: false,
            supportedBy: [3458, 3459, 3401, 3402],
            rank: 0,
            description: "Outdoor Kitchen and BBQ Area",
            content: "Create a shared outdoor kitchen and BBQ area for community gatherings and events.",
            comments: [
              {
                id: 3002461,
                createdAt: { time: "22:00", distance: 6 },
                createdBy: 3408,
                new: false,
                supportedBy: [3409, 3410],
                comments: [],
                content: "This would be perfect for summer get-togethers! We could even organize cooking classes or competitions.",
              },
              {
                id: 3002462,
                createdAt: { time: "22:30", distance: 6 },
                createdBy: 3467,
                new: false,
                supportedBy: [3468, 3469],
                comments: [],
                content: "Let's ensure the area is accessible and has some shaded seating for those who are sensitive to sun exposure.",
              },
            ],
          },
          {
            id: 300247,
            createdAt: { time: "23:00", distance: 6 },
            createdBy: 3441,
            new: false,
            supportedBy: [3442, 3443, 3444, 3445],
            rank: 0,
            description: "Green Area Landscaping Improvement",
            content: "Enhance our green areas with native plants, walking paths, and seating areas to promote biodiversity and community well-being.",
            comments: [
              {
                id: 3002471,
                createdAt: { time: "23:30", distance: 6 },
                createdBy: 3419,
                new: false,
                supportedBy: [3420, 3421],
                comments: [],
                content: "This aligns well with our sustainability goals. We could also include educational signage about local flora and fauna.",
              },
              {
                id: 3002472,
                createdAt: { time: "00:00", distance: 5 },
                createdBy: 3472,
                new: false,
                supportedBy: [3473, 3474],
                comments: [],
                content: "Please consider adding some exercise stations along the walking paths for a complete wellness experience.",
              },
            ],
          },
          {
            id: 300248,
            createdAt: { time: "00:30", distance: 5 },
            createdBy: 3467,
            new: false,
            supportedBy: [3468, 3469, 3470, 3471],
            rank: 0,
            description: "Accessibility Improvements",
            content: "Install more ramps, automated doors, and improve lighting throughout the community to enhance accessibility for all residents.",
            comments: [
              {
                id: 3002481,
                createdAt: { time: "01:00", distance: 5 },
                createdBy: 3441,
                new: false,
                supportedBy: [3442, 3443],
                comments: [],
                content: "This is crucial for ensuring everyone can fully participate in community life. We should also consider adding tactile paving for visually impaired residents.",
              },
              {
                id: 3002482,
                createdAt: { time: "01:30", distance: 5 },
                createdBy: 3401,
                new: false,
                supportedBy: [3402, 3403],
                comments: [],
                content: "We could explore smart lighting systems that adjust based on time of day and movement, improving safety and energy efficiency.",
              },
            ],
          },
        ],
      },

      {
        id: 30025,
        type: "Estimate",
        dueAt: { time: "20:00", distance: 15 },
        description: "Estimate Costs and Duration for Community Improvement Ideas",
        content: "Please provide estimates for the cost and duration of implementing each community improvement idea. Consider materials, labor, and any ongoing maintenance costs.",
        options: [
          {
            id: 300251,
            createdAt: { time: "10:00", distance: 11 },
            createdBy: 3419,
            new: false,
            supportedBy: [3420, 3421, 3422, 3423, 3424],
            rank: 0,
            description: "Solar Panel Installation",
            content: "Install solar panels on all suitable rooftops in our community to reduce our carbon footprint and energy costs.",
            comments: [
              {
                id: 3002511,
                createdAt: { time: "11:00", distance: 11 },
                createdBy: 3401,
                new: false,
                supportedBy: [3402, 3403],
                comments: [],
                content: "Estimated cost: 150,000-200,000€. Installation time: 2-3 months. ROI in 5-7 years through reduced energy costs.",
              },
              {
                id: 3002512,
                createdAt: { time: "12:00", distance: 11 },
                createdBy: 3430,
                new: false,
                supportedBy: [3431, 3432],
                comments: [],
                content: "Annual maintenance: 1,000-2,000€. Lifespan: 25-30 years. Consider additional costs for potential roof reinforcements.",
              },
            ],
          },
          {
            id: 300252,
            createdAt: { time: "13:00", distance: 11 },
            createdBy: 3457,
            new: false,
            supportedBy: [3458, 3459, 1, 3101, 3102],
            rank: 0,
            description: "Multi-purpose Community Center",
            content: "Convert the unused storage area into a multi-purpose community center for events, classes, and gatherings.",
            comments: [
              {
                id: 3002521,
                createdAt: { time: "14:00", distance: 11 },
                createdBy: 3408,
                new: false,
                supportedBy: [3409, 3410],
                comments: [],
                content: "Renovation costs: 50,000-80,000€. Duration: 4-6 months. Annual maintenance and utilities: 5,000-8,000€.",
              },
              {
                id: 3002522,
                createdAt: { time: "15:00", distance: 11 },
                createdBy: 3467,
                new: false,
                supportedBy: [3468, 3469],
                comments: [],
                content: "Accessibility features: +10,000-15,000€. Soundproofing: +5,000-10,000€. Consider phased approach to spread costs.",
              },
            ],
          },
          {
            id: 300253,
            createdAt: { time: "16:00", distance: 11 },
            createdBy: 3441,
            new: false,
            supportedBy: [3442, 3443, 3444, 3445],
            rank: 0,
            description: "Community Fitness Program",
            content: "Establish a community fitness program with regular classes and a small gym in one of our shared spaces.",
            comments: [
              {
                id: 3002531,
                createdAt: { time: "17:00", distance: 11 },
                createdBy: 3101,
                new: false,
                supportedBy: [3102, 3103],
                comments: [],
                content: "Initial equipment: 20,000-30,000€. Annual costs (instructors, maintenance): 15,000-20,000€. Setup time: 1-2 months.",
              },
              {
                id: 3002532,
                createdAt: { time: "18:00", distance: 11 },
                createdBy: 3472,
                new: false,
                supportedBy: [3473, 3474],
                comments: [],
                content: "Consider leasing equipment to reduce upfront costs. Factor in insurance costs: ~2,000€/year.",
              },
            ],
          },
          {
            id: 300254,
            createdAt: { time: "19:00", distance: 11 },
            createdBy: 3401,
            new: false,
            supportedBy: [3402, 3403, 3404, 3405],
            rank: 0,
            description: "Guest House Construction",
            content: "Build a small guest house for visitors, which could also serve as a source of income for the community when not in use.",
            comments: [
              {
                id: 3002541,
                createdAt: { time: "20:00", distance: 11 },
                createdBy: 3457,
                new: false,
                supportedBy: [3458, 3459],
                comments: [],
                content: "Construction costs: 100,000-150,000€. Duration: 6-8 months. Annual maintenance: 3,000-5,000€.",
              },
              {
                id: 3002542,
                createdAt: { time: "21:00", distance: 11 },
                createdBy: 3467,
                new: false,
                supportedBy: [3468, 3469],
                comments: [],
                content: "Potential income: 10,000-15,000€/year. Consider additional costs for furnishing: 5,000-10,000€.",
              },
            ],
          },
          {
            id: 300255,
            createdAt: { time: "22:00", distance: 11 },
            createdBy: 3419,
            new: false,
            supportedBy: [3420, 3421, 3422, 1, 3101],
            rank: 0,
            description: "Sustainable Common House Renovation",
            content: "Renovate our common house using sustainable materials and energy-efficient systems to reduce our environmental impact and operating costs.",
            comments: [
              {
                id: 3002551,
                createdAt: { time: "23:00", distance: 11 },
                createdBy: 3401,
                new: false,
                supportedBy: [3402, 3403],
                comments: [],
                content: "Renovation costs: 200,000-250,000€. Duration: 8-10 months. Energy savings: 30-40% annually.",
              },
              {
                id: 3002552,
                createdAt: { time: "00:00", distance: 10 },
                createdBy: 3472,
                new: false,
                supportedBy: [3473, 3474],
                comments: [],
                content: "Consider phased approach. Prioritize insulation and HVAC upgrades for immediate impact.",
              },
            ],
          },
          {
            id: 300256,
            createdAt: { time: "01:00", distance: 10 },
            createdBy: 3457,
            new: false,
            supportedBy: [3458, 3459, 3401, 3402],
            rank: 0,
            description: "Outdoor Kitchen and BBQ Area",
            content: "Create a shared outdoor kitchen and BBQ area for community gatherings and events.",
            comments: [
              {
                id: 3002561,
                createdAt: { time: "02:00", distance: 10 },
                createdBy: 3408,
                new: false,
                supportedBy: [3409, 3410],
                comments: [],
                content: "Construction costs: 30,000-40,000€. Duration: 2-3 months. Annual maintenance: 1,000-2,000€.",
              },
              {
                id: 3002562,
                createdAt: { time: "03:00", distance: 10 },
                createdBy: 3467,
                new: false,
                supportedBy: [3468, 3469],
                comments: [],
                content: "Consider weather protection features: +5,000-10,000€. Factor in costs for quality, durable equipment.",
              },
            ],
          },
          {
            id: 300257,
            createdAt: { time: "04:00", distance: 10 },
            createdBy: 3441,
            new: false,
            supportedBy: [3442, 3443, 3444, 3445],
            rank: 0,
            description: "Green Area Landscaping Improvement",
            content: "Enhance our green areas with native plants, walking paths, and seating areas to promote biodiversity and community well-being.",
            comments: [
              {
                id: 3002571,
                createdAt: { time: "05:00", distance: 10 },
                createdBy: 3419,
                new: false,
                supportedBy: [3420, 3421],
                comments: [],
                content: "Landscaping costs: 40,000-60,000€. Duration: 3-4 months. Annual maintenance: 5,000-8,000€.",
              },
              {
                id: 3002572,
                createdAt: { time: "06:00", distance: 10 },
                createdBy: 3472,
                new: false,
                supportedBy: [3473, 3474],
                comments: [],
                content: "Consider phased planting to spread costs. Factor in irrigation system: +10,000-15,000€.",
              },
            ],
          },
          {
            id: 300258,
            createdAt: { time: "07:00", distance: 10 },
            createdBy: 3467,
            new: false,
            supportedBy: [3468, 3469, 3470, 3471],
            rank: 0,
            description: "Accessibility Improvements",
            content: "Install more ramps, automated doors, and improve lighting throughout the community to enhance accessibility for all residents.",
            comments: [
              {
                id: 3002581,
                createdAt: { time: "08:00", distance: 10 },
                createdBy: 3441,
                new: false,
                supportedBy: [3442, 3443],
                comments: [],
                content: "Estimated costs: 70,000-90,000€. Duration: 4-6 months. Annual maintenance: 3,000-5,000€.",
              },
              {
                id: 3002582,
                createdAt: { time: "09:00", distance: 10 },
                createdBy: 3401,
                new: false,
                supportedBy: [3402, 3403],
                comments: [],
                content: "Smart lighting systems could add 20,000-30,000€ but reduce long-term energy costs by 40-50%.",
              },
            ],
          },
        ],
      },
      {
        id: 30026,
        type: "Prioritize",
        dueAt: { time: "20:00", distance: 20 },
        description: "Prioritize Community Improvement Projects",
        content: "Please rank the proposed community improvement projects in order of importance and feasibility.",
        options: [
          {
            id: 300261,
            createdAt: { time: "10:00", distance: 16 },
            createdBy: 3401,
            new: false,
            supportedBy: [3402, 3403, 3404, 3405],
            rank: 85,
            description: "Guest House Construction",
            content: "Build a small guest house for visitors, which could also serve as a source of income for the community when not in use.",
            comments: [
              {
                id: 3002611,
                createdAt: { time: "11:00", distance: 16 },
                createdBy: 3457,
                new: false,
                supportedBy: [3458, 3459],
                comments: [],
                content: "This could be a great investment for our community, providing both accommodation for guests and additional income.",
              },
              {
                id: 3002612,
                createdAt: { time: "12:00", distance: 16 },
                createdBy: 3467,
                new: false,
                supportedBy: [3468, 3469],
                comments: [],
                content: "Let's ensure it's designed with accessibility in mind from the start.",
              },
            ],
          },
          {
            id: 300262,
            createdAt: { time: "13:00", distance: 16 },
            createdBy: 3419,
            new: false,
            supportedBy: [3420, 3421, 3422, 3423, 3424],
            rank: 78,
            description: "Solar Panel Installation",
            content: "Install solar panels on all suitable rooftops in our community to reduce our carbon footprint and energy costs.",
            comments: [
              {
                id: 3002621,
                createdAt: { time: "14:00", distance: 16 },
                createdBy: 3401,
                new: false,
                supportedBy: [3402, 3403],
                comments: [],
                content: "This aligns perfectly with our sustainability goals and could lead to significant long-term savings.",
              },
              {
                id: 3002622,
                createdAt: { time: "15:00", distance: 16 },
                createdBy: 3430,
                new: false,
                supportedBy: [3431, 3432],
                comments: [],
                content: "We should consider the potential for selling excess energy back to the grid as an additional benefit.",
              },
            ],
          },
          {
            id: 300263,
            createdAt: { time: "16:00", distance: 16 },
            createdBy: 3467,
            new: false,
            supportedBy: [3468, 3469, 3470, 3471],
            rank: 72,
            description: "Accessibility Improvements",
            content: "Install more ramps, automated doors, and improve lighting throughout the community to enhance accessibility for all residents.",
            comments: [
              {
                id: 3002631,
                createdAt: { time: "17:00", distance: 16 },
                createdBy: 3441,
                new: false,
                supportedBy: [3442, 3443],
                comments: [],
                content: "This is crucial for ensuring everyone can fully participate in community life. We should prioritize this for inclusivity.",
              },
              {
                id: 3002632,
                createdAt: { time: "18:00", distance: 16 },
                createdBy: 3401,
                new: false,
                supportedBy: [3402, 3403],
                comments: [],
                content: "Improved accessibility will benefit all residents and visitors, regardless of age or ability.",
              },
            ],
          },
          {
            id: 300264,
            createdAt: { time: "19:00", distance: 16 },
            createdBy: 3419,
            new: false,
            supportedBy: [3420, 3421, 3422, 1, 3101],
            rank: 65,
            description: "Sustainable Common House Renovation",
            content: "Renovate our common house using sustainable materials and energy-efficient systems to reduce our environmental impact and operating costs.",
            comments: [
              {
                id: 3002641,
                createdAt: { time: "20:00", distance: 16 },
                createdBy: 3401,
                new: false,
                supportedBy: [3402, 3403],
                comments: [],
                content: "This renovation could significantly reduce our energy costs and serve as a model for sustainable living.",
              },
              {
                id: 3002642,
                createdAt: { time: "21:00", distance: 16 },
                createdBy: 3472,
                new: false,
                supportedBy: [3473, 3474],
                comments: [],
                content: "Let's ensure the renovation includes improvements to make the common house more accessible and comfortable for all residents.",
              },
            ],
          },
          {
            id: 300265,
            createdAt: { time: "22:00", distance: 16 },
            createdBy: 3457,
            new: false,
            supportedBy: [3458, 3459, 1, 3101, 3102],
            rank: 58,
            description: "Multi-purpose Community Center",
            content: "Convert the unused storage area into a multi-purpose community center for events, classes, and gatherings.",
            comments: [
              {
                id: 3002651,
                createdAt: { time: "23:00", distance: 16 },
                createdBy: 3408,
                new: false,
                supportedBy: [3409, 3410],
                comments: [],
                content: "This would be a great addition to our community, providing space for various activities and strengthening our social bonds.",
              },
              {
                id: 3002652,
                createdAt: { time: "00:00", distance: 15 },
                createdBy: 3467,
                new: false,
                supportedBy: [3468, 3469],
                comments: [],
                content: "We should design this space to be flexible and accessible, accommodating a wide range of community needs.",
              },
            ],
          },
          {
            id: 300266,
            createdAt: { time: "01:00", distance: 15 },
            createdBy: 3441,
            new: false,
            supportedBy: [3442, 3443, 3444, 3445],
            rank: 52,
            description: "Green Area Landscaping Improvement",
            content: "Enhance our green areas with native plants, walking paths, and seating areas to promote biodiversity and community well-being.",
            comments: [
              {
                id: 3002661,
                createdAt: { time: "02:00", distance: 15 },
                createdBy: 3419,
                new: false,
                supportedBy: [3420, 3421],
                comments: [],
                content: "This project would greatly enhance our outdoor spaces and contribute to local biodiversity.",
              },
              {
                id: 3002662,
                createdAt: { time: "03:00", distance: 15 },
                createdBy: 3472,
                new: false,
                supportedBy: [3473, 3474],
                comments: [],
                content: "Let's include some accessible paths and seating areas to ensure everyone can enjoy these improved green spaces.",
              },
            ],
          },
          {
            id: 300267,
            createdAt: { time: "04:00", distance: 15 },
            createdBy: 3457,
            new: false,
            supportedBy: [3458, 3459, 3401, 3402],
            rank: 45,
            description: "Outdoor Kitchen and BBQ Area",
            content: "Create a shared outdoor kitchen and BBQ area for community gatherings and events.",
            comments: [
              {
                id: 3002671,
                createdAt: { time: "05:00", distance: 15 },
                createdBy: 3408,
                new: false,
                supportedBy: [3409, 3410],
                comments: [],
                content: "This would be a great addition for community events and social gatherings, especially during warmer months.",
              },
              {
                id: 3002672,
                createdAt: { time: "06:00", distance: 15 },
                createdBy: 3467,
                new: false,
                supportedBy: [3468, 3469],
                comments: [],
                content: "We should ensure this area is accessible and has some covered space for shade and weather protection.",
              },
            ],
          },
          {
            id: 300268,
            createdAt: { time: "07:00", distance: 15 },
            createdBy: 3441,
            new: false,
            supportedBy: [3442, 3443, 3444, 3445],
            rank: 38,
            description: "Community Fitness Program",
            content: "Establish a community fitness program with regular classes and a small gym in one of our shared spaces.",
            comments: [
              {
                id: 3002681,
                createdAt: { time: "08:00", distance: 15 },
                createdBy: 3101,
                new: false,
                supportedBy: [3102, 3103],
                comments: [],
                content: "This could greatly contribute to the overall health and well-being of our community members.",
              },
              {
                id: 3002682,
                createdAt: { time: "09:00", distance: 15 },
                createdBy: 3472,
                new: false,
                supportedBy: [3473, 3474],
                comments: [],
                content: "Let's ensure we offer a variety of activities suitable for different fitness levels and abilities.",
              },
            ],
          },
        ],
      },
      {
        id: 30027,
        type: "ExternalDecision",
        dueAt: { time: "20:00", distance: 25 },
        description: "Board Decisions on Community Improvement Projects",
        content: "The board has reviewed the proposed community improvement projects and made decisions based on feasibility, budget constraints, and alignment with community goals.",
        options: [
          {
            id: 300271,
            createdAt: { time: "10:00", distance: 21 },
            createdBy: 3114,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Solar Panel Installation",
            content: "Approved",
            comments: [
              {
                id: 3002711,
                createdAt: { time: "10:05", distance: 21 },
                createdBy: 3114,
                new: false,
                supportedBy: [],
                comments: [],
                content: "The board approves this project due to its long-term environmental and financial benefits. We believe this aligns well with our sustainability goals and will result in significant energy cost savings over time.",
              },
            ],
          },
          {
            id: 300272,
            createdAt: { time: "10:10", distance: 21 },
            createdBy: 3114,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Accessibility Improvements",
            content: "Approved",
            comments: [
              {
                id: 3002721,
                createdAt: { time: "10:15", distance: 21 },
                createdBy: 3114,
                new: false,
                supportedBy: [],
                comments: [],
                content: "The board strongly supports this initiative to make our community more inclusive and accessible for all residents. This project will be implemented in phases to manage costs effectively.",
              },
            ],
          },
          {
            id: 300273,
            createdAt: { time: "10:20", distance: 21 },
            createdBy: 3114,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Guest House Construction",
            content: "Denied",
            comments: [
              {
                id: 3002731,
                createdAt: { time: "10:25", distance: 21 },
                createdBy: 3114,
                new: false,
                supportedBy: [],
                comments: [],
                content: "While the board recognizes the potential benefits, we have decided not to proceed with this project at this time due to high initial costs and concerns about ongoing management responsibilities. We may revisit this idea in the future when our budget allows.",
              },
            ],
          },
          {
            id: 300274,
            createdAt: { time: "10:30", distance: 21 },
            createdBy: 3114,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Multi-purpose Community Center",
            content: "Approved",
            comments: [
              {
                id: 3002741,
                createdAt: { time: "10:35", distance: 21 },
                createdBy: 3114,
                new: false,
                supportedBy: [],
                comments: [],
                content: "The board approves this project as it aligns with our goal of fostering community engagement. We believe this space will greatly enhance our ability to host events, classes, and gatherings. The project will be implemented in stages to manage costs.",
              },
            ],
          },
          {
            id: 300275,
            createdAt: { time: "10:40", distance: 21 },
            createdBy: 3114,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Green Area Landscaping Improvement",
            content: "Approved",
            comments: [
              {
                id: 3002751,
                createdAt: { time: "10:45", distance: 21 },
                createdBy: 3114,
                new: false,
                supportedBy: [],
                comments: [],
                content: "The board supports this project to enhance our community's green spaces. We believe it will contribute to biodiversity and resident well-being. The project will be implemented gradually, starting with the most used areas.",
              },
            ],
          },
          {
            id: 300276,
            createdAt: { time: "10:50", distance: 21 },
            createdBy: 3114,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Community Fitness Program",
            content: "Denied",
            comments: [
              {
                id: 3002761,
                createdAt: { time: "10:55", distance: 21 },
                createdBy: 3114,
                new: false,
                supportedBy: [],
                comments: [],
                content: "While the board appreciates the health benefits of this proposal, we have decided not to proceed due to concerns about ongoing costs, potential liability issues, and the availability of similar services nearby. We encourage residents to organize informal fitness groups using our existing spaces.",
              },
            ],
          },
        ],
      },
    ],
  },
]