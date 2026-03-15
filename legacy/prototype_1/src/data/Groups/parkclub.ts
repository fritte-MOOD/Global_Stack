/*
Parkclub is a Tennis Club that wants to improve its operations by automating some processes.
It consists of 121 Members, out of which 73 are active. There is a junior (8-18 y.o.) and two Senior (19-39 y.o.) teams. Masters (39-79 y. o.) meet once a week for a Training and dinner afterwards.
Members are from all kinds of professions and backgrounds.

These are the subgroups:
- Junior Team (14 + 2 Coaches)
- 1st Senior Team (6)
- 2nd Senior Team (14)
- Masters (25)
- Execution Committee
- Construction Committee
- Training Organization
YOU are a member of 2nd Senior Team and Execution Committee.

 */
import { Appointment, Member, Process } from "../interfaces"

export const description = "Park Club Tennis Association"

export const content = `Park Club is a vibrant tennis club located in Rochefort, dedicated to fostering a love for tennis and building a strong community. With 121 members, including 73 active players, we cater to all age groups and skill levels.

Our club features:
- Junior Team (14 players + 2 coaches) for ages 8-18
- Two Senior Teams (1st and 2nd) for ages 19-39
- Masters group for ages 39-79
- Various committees to manage club operations

We offer regular training sessions, competitive matches, social events, and opportunities for members to get involved in club management. Our mission is to provide top-notch facilities, expert coaching, and a welcoming atmosphere for all tennis enthusiasts in Rochefort.`
export const rules = `At Parkclub, we strive to create a welcoming and inclusive environment for all our members. Our community thrives on mutual respect, sportsmanship, and a shared passion for tennis.

Key points:
• Communicate clearly and respectfully on our platform
• The Executive Committee makes the decisions but seeks input from all members
• Transparency is crucial - all decisions are published and explained
• Committee members are elected annually
• Club's long-term strategy is determined collectively
• Active engagement from all members is essential

Remember, Parkclub is more than just a tennis club – it's a community. By following these guidelines and actively participating in our decision-making processes, you help make Parkclub a better place for everyone.

Specific rules about the day-to-day life in the club can be found under documents /guidelines. These guidelines cover topics such as court reservation procedures, guest policies, equipment usage, and etiquette during play and in common areas.

Any disputes or grievances should be reported to the Execution Committee for resolution.`

export const members: Member[] = [
  { id: 1, name: "You" }, // Your character: Member of 2nd Senior Team and Execution Committee

  // Junior Team (14 players + 2 coaches)
  { id: 1001, name: "Liam Thompson" }, // 16, Junior team captain
  { id: 1002, name: "Sophia Rodriguez" }, // 15, Rising star player
  { id: 1003, name: "Ethan Nakamura" }, // 14, Promising doubles player
  { id: 1004, name: "Zoe Patel" }, // 17, Aspiring professional player
  { id: 1005, name: "Noah Fitzgerald" }, // 13, Youngest team member
  { id: 1006, name: "Ava Kowalczyk" }, // 16, Known for her powerful serve
  { id: 1007, name: "Mason Cheng" }, // 15, Excellent at net play
  { id: 1008, name: "Isabella Morales" }, // 17, All-rounder
  { id: 1009, name: "Lucas Van der Berg" }, // 14, Improving rapidly
  { id: 1010, name: "Emma Dubois" }, // 16, Consistent baseline player
  { id: 1011, name: "Oliver Sørensen" }, // 15, Known for his agility
  { id: 1012, name: "Mia Lombardi" }, // 17, Team's mental strength coach
  { id: 1013, name: "Alexander Popov" }, // 16, Powerful forehand
  { id: 1014, name: "Charlotte Yamamoto" }, // 15, Excellent footwork
  { id: 1015, name: "David Nkosi" }, // 35, Junior Team Head Coach
  { id: 1016, name: "Sarah O'Connor" }, // 28, Junior Team Assistant Coach

  // 1st Senior Team (6 players)
  { id: 1017, name: "James Wilson" }, // 28, Team captain, all-court player
  { id: 1018, name: "Elena Petrova" }, // 25, Aggressive baseliner
  { id: 1019, name: "Rafael Gonzalez" }, // 27, Serve-and-volley specialist
  { id: 1020, name: "Naomi Campbell" }, // 24, Known for her backhand
  { id: 1021, name: "Felix Müller" }, // 26, Doubles specialist
  { id: 1022, name: "Yuki Tanaka" }, // 23, Rising star, recently promoted from 2nd team

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

  // Masters (25 players)
  { id: 1037, name: "George Blackwell" }, // 65, Masters group organizer
  { id: 1038, name: "Helga Schmidt" }, // 72, Former national champion
  { id: 1039, name: "Francesco Rossi" }, // 58, Still competes in seniors tournaments
  { id: 1040, name: "Beatrice Dupont" }, // 63, Yoga enthusiast
  { id: 1041, name: "Hiroshi Watanabe" }, // 70, Known for his precise shots
  { id: 1042, name: "Astrid Lindgren" }, // 68, Organizes post-training dinners
  { id: 1043, name: "Rajesh Patel" }, // 55, Fitness guru
  { id: 1044, name: "Ingeborg Van Dijk" }, // 61, Doubles specialist
  { id: 1045, name: "Miguel Sanchez" }, // 59, Former Davis Cup player
  { id: 1046, name: "Elise Lefebvre" }, // 67, Mental game coach
  { id: 1047, name: "Klaus Weber" }, // 73, Club historian
  { id: 1048, name: "Svetlana Kuznetsova" }, // 56, Still has a killer serve
  { id: 1049, name: "Dieter Müller" }, // 69, Organizes charity tournaments
  { id: 1050, name: "Fatima Al-Sayed" }, // 62, Passionate about introducing tennis to underprivileged youth
  { id: 1051, name: "Jürgen Becker" }, // 71, Former club president
  { id: 1052, name: "Annika Svensson" }, // 57, Organizes social events
  { id: 1053, name: "Giovanni Rossi" }, // 66, Known for his drop shots
  { id: 1054, name: "Margot Rousseau" }, // 60, Still competes in mixed doubles
  { id: 1055, name: "Yuki Sato" }, // 58, Teaches Eastern grip to newcomers
  { id: 1056, name: "Lars Andersen" }, // 64, Maintains the club's trophy cabinet
  { id: 1057, name: "Olga Petrov" }, // 69, Organizes weekly round-robins
  { id: 1058, name: "Henri Leclerc" }, // 72, Gives free lessons to juniors
  { id: 1059, name: "Ingrid Bergman" }, // 63, Coordinates with other clubs for friendlies
  { id: 1060, name: "Takashi Yamamoto" }, // 67, Passionate about proper tennis etiquette
  { id: 1061, name: "Eva Novotna" }, // 59, Organizes tennis-themed trivia nights

  // Execution Committee
  { id: 1062, name: "Victoria Hawthorne" }, // 45, Committee Chair, former professional player
  { id: 1063, name: "Richard Steinberg" }, // 52, Treasurer, accountant by profession
  { id: 1064, name: "Amelia Chakrabarti" }, // 39, Secretary, lawyer specializing in sports law
  { id: 1065, name: "Hans Gruber" }, // 58, Facilities Manager, former construction company owner
  { id: 1066, name: "Sophia Lombardi" }, // 41, Marketing Director, works in advertising

  // Construction Committee
  { id: 1067, name: "Erik Johansson" }, // 49, Committee Chair, architect
  { id: 1068, name: "Fatima Al-Rashid" }, // 36, Civil Engineer
  { id: 1069, name: "Günther Schmitt" }, // 62, Retired Construction Foreman
  { id: 1070, name: "Isabelle Lefebvre" }, // 44, Interior Designer
  { id: 1071, name: "Raj Patel" }, // 39, Sustainability Consultant

  // Training Organization
  { id: 1072, name: "Carlos Fernandez" }, // 47, Head Coach, former ATP player
  { id: 1073, name: "Anastasia Kuznetsova" }, // 33, Junior Development Coach
  { id: 1074, name: "Marcus Svensson" }, // 41, Fitness and Conditioning Coach
  { id: 1075, name: "Yuki Tanaka" }, // 29, Assistant Coach, specializing in technique
  { id: 1076, name: "Lena Müller" }, // 36, Mental Performance Coach

  // Inactive Members (45 members to reach a total of 121)
  { id: 2001, name: "Gabrielle Dupont" }, // 42, Busy with work commitments
  { id: 2002, name: "Markus Schneider" }, // 55, Recovering from knee surgery
  { id: 2003, name: "Chiara Bianchi" }, // 29, Recently moved but kept membership
  { id: 2004, name: "Aleksander Nowak" }, // 61, Taking a break due to family obligations
  { id: 2005, name: "Ines Ferreira" }, // 37, Pregnant, plans to return next year
  { id: 2006, name: "Jens Andersen" }, // 48, Temporarily relocated for work
  { id: 2007, name: "Nadia Ivanova" }, // 33, Focusing on her startup business
  { id: 2008, name: "Theo van der Meer" }, // 70, Limited mobility but still supports the club
  { id: 2009, name: "Yasmin Al-Hashimi" }, // 26, Studying abroad for a year
  { id: 2010, name: "Pietro Romano" }, // 52, Taking time off for family reasons
  { id: 2011, name: "Ingrid Larsson" }, // 44, Recovering from a shoulder injury
  { id: 2012, name: "Dmitry Sokolov" }, // 39, Busy with a major work project
  { id: 2013, name: "Amélie Rousseau" }, // 31, Recently had a baby
  { id: 2014, name: "Sven Lindholm" }, // 58, Taking a sabbatical year
  { id: 2015, name: "Yara Nassar" }, // 35, Focusing on her PhD studies
  { id: 2016, name: "Liam O'Brien" }, // 47, Recovering from back surgery
  { id: 2017, name: "Katja Novak" }, // 28, Moved temporarily but plans to return
  { id: 2018, name: "Ravi Patel" }, // 50, Taking care of elderly parents
  { id: 2019, name: "Simone Bergmann" }, // 43, On extended business travel
  { id: 2020, name: "Andrei Popescu" }, // 36, Focusing on training for a marathon
  { id: 2021, name: "Emilia Santos" }, // 62, Recovering from hip replacement
  { id: 2022, name: "Niels Jørgensen" }, // 41, Taking a break due to work stress
  { id: 2023, name: "Aisha Mbeki" }, // 29, Volunteering abroad for six months
  { id: 2024, name: "Matteo Conti" }, // 55, Focusing on other hobbies temporarily
  { id: 2025, name: "Léa Dubois" }, // 34, Recently changed jobs, adjusting to new schedule
  { id: 2026, name: "Hiroshi Tanaka" }, // 68, Taking time off for health reasons
  { id: 2027, name: "Elsa Lindberg" }, // 46, Focusing on family business temporarily
  { id: 2028, name: "Omar Al-Farsi" }, // 32, Deployed for military service
  { id: 2029, name: "Catalina Morales" }, // 39, Taking a career break to travel
  { id: 2030, name: "Bjorn Gustafsson" }, // 57, Recovering from a car accident
  { id: 2031, name: "Natalia Kovalenko" }, // 30, On maternity leave
  { id: 2032, name: "Hugo van der Linden" }, // 44, Taking a sabbatical to write a book
  { id: 2033, name: "Zara Malik" }, // 27, Preparing for bar exam, plans to return
  { id: 2034, name: "Giovanni Rossi" }, // 59, Taking care of grandchildren temporarily
  { id: 2035, name: "Annika Sørensen" }, // 38, Focusing on professional development courses
  { id: 2036, name: "Yuki Watanabe" }, // 51, Temporarily moved for partner's job
  { id: 2037, name: "Lukas Novotny" }, // 33, Taking time off for mental health reasons
  { id: 2038, name: "Isabel Fernandez" }, // 45, Recovering from a sports injury
  { id: 2039, name: "Ahmed Hassan" }, // 40, Taking a break to care for a sick family member
  { id: 2040, name: "Sophia Papadopoulos" }, // 29, Doing a yoga teacher training course
  { id: 2041, name: "Mikkel Andersen" }, // 53, Taking a career break to pursue art
  { id: 2042, name: "Ling Wei Chen" }, // 36, On extended parental leave
  { id: 2043, name: "Olivia Becker" }, // 42, Taking a break due to work relocation
  { id: 2044, name: "Antoine Lefebvre" }, // 61, Recovering from a stroke but hopes to return
  { id: 2045, name: "Fatima Al-Mansour" }, // 34, Taking time off for religious pilgrimage
]
export const appointments: Appointment[] = [
  {
    id: 3001,
    at: { time: "14:00", distance: 7 },
    createdBy: 1017,
    invited: [1017, 1018, 1019, 1020, 1021, 1022],
    accepted: [1017, 1018, 1019, 1020, 1021],
    declined: [1022],
    description: "1st Senior Team vs. Riverside Tennis Club",
    content: "Important league match against our local rivals. All team members please arrive at least 30 minutes before the match for warm-up.",
  },
  {
    id: 3002,
    at: { time: "20:00", distance: 18 },
    createdBy: 1062,
    invited: members.map(member => member.id),
    accepted: [],
    declined: [],
    description: "Watch Party: Wimbledon Men's Final",
    content: "Join us at the clubhouse to watch the Wimbledon Men's Final on the big screen. Snacks and refreshments will be provided. BYOB.",
  },
  {
    id: 3003,
    at: { time: "19:00", distance: 30 },
    createdBy: 1062,
    invited: members.map(member => member.id),
    accepted: [],
    declined: [],
    description: "Annual General Meeting",
    content: "Our annual general meeting to discuss the club's performance, finances, and plans for the upcoming year. All members are encouraged to attend.",
  },
  {
    id: 3004,
    at: { time: "09:00", distance: 25 },
    createdBy: 1015,
    invited: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016],
    accepted: [],
    declined: [],
    description: "Junior Team Training Camp",
    content: "Full-day training camp for the Junior Team. Focus on technique, strategy, and team building. Lunch will be provided.",
  },
  {
    id: 3005,
    at: { time: "18:00", distance: 6 },
    createdBy: 1037,
    invited: [1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061],
    accepted: [],
    declined: [],
    description: "Masters' Monthly Dinner",
    content: "Our regular monthly dinner for the Masters group. This month's theme: Italian cuisine. Please bring a dish to share.",
  },
  {
    id: 3006,
    at: { time: "10:00", distance: 28 },
    createdBy: 1066,
    invited: members.map(member => member.id),
    accepted: [],
    declined: [],
    description: "Club Open Day",
    content: "Annual open day to attract new members. Activities include free lessons, exhibition matches, and a BBQ. All members are encouraged to attend and bring friends who might be interested in joining.",
  },
]

export const processes: Process[] = [
  {
    id: 4001,
    new: true,
    public: true,
    active: true,
    createdAt: { time: "09:00", distance: 0 },
    dueAt: { time: "20:00", distance: 14 },
    creator: 1062,
    description: "Rochefort's Annual Meeting of Sports Clubs",
    content: "Rochefort City Council has approached Parkclub with a prestigious opportunity to host this year's Annual Meeting of Sports Clubs and Associates. This event brings together representatives from various sports clubs, local businesses, and city officials to discuss the state of sports in our region, share best practices, and foster collaboration. While this would be a significant undertaking for our club, it also presents a unique chance to showcase our facilities, build relationships, and potentially attract new members and sponsors. We need to carefully consider the costs, benefits, and logistical challenges before making a decision. The event would take place on September 15th and is expected to host approximately 150 attendees.",
    modules: [
      {
        id: 40011,
        type: "Estimate",
        dueAt: { time: "20:00", distance: 7 },
        description: "Estimated Costs for Hosting the Annual Meeting",
        content: "Please review the following list of potential costs associated with hosting the Annual Meeting. For each item, we've provided an initial estimate. We welcome your input on these estimates based on your experience or research.",
        options: [
          {
            id: 400111,
            createdAt: { time: "10:00", distance: 0 },
            createdBy: 1063,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Catering (lunch and refreshments for 150 people)",
            content: "Estimated cost: €3,750",
            comments: [
              {
                id: 4001111,
                createdAt: { time: "11:30", distance: 0 },
                createdBy: 1065,
                new: false,
                supportedBy: [1066, 1067],
                comments: [],
                content: "I've reached out to our usual caterer. They can do it for €3,500 if we book within this week.",
              },
            ],
          },
          {
            id: 400112,
            createdAt: { time: "10:05", distance: 0 },
            createdBy: 1063,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Audio-visual equipment rental",
            content: "Estimated cost: €1,200",
            comments: [
              {
                id: 4001121,
                createdAt: { time: "12:00", distance: 0 },
                createdBy: 1066,
                new: false,
                supportedBy: [1065],
                comments: [],
                content: "I know a local company that might give us a discount. I'll check and get back to you.",
              },
            ],
          },
          {
            id: 400113,
            createdAt: { time: "10:10", distance: 0 },
            createdBy: 1063,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Additional staff (5 people for setup, service, and cleanup)",
            content: "Estimated cost: €750",
            comments: [
              {
                id: 4001131,
                createdAt: { time: "13:15", distance: 0 },
                createdBy: 1,
                new: false,
                supportedBy: [1023, 1024],
                comments: [],
                content: "We could ask for volunteers from our membership to reduce this cost. Many would be happy to help for such a prestigious event.",
              },
            ],
          },
          {
            id: 400114,
            createdAt: { time: "10:15", distance: 0 },
            createdBy: 1063,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Printing costs (programs, name tags, signage)",
            content: "Estimated cost: €500",
            comments: [
              {
                id: 4001141,
                createdAt: { time: "14:30", distance: 0 },
                createdBy: 1066,
                new: false,
                supportedBy: [1062],
                comments: [],
                content: "I can get this done for €400 through my contacts in the advertising industry.",
              },
            ],
          },
          {
            id: 400115,
            createdAt: { time: "10:20", distance: 0 },
            createdBy: 1063,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Venue preparation and decoration",
            content: "Estimated cost: €800",
            comments: [
              {
                id: 4001151,
                createdAt: { time: "15:45", distance: 0 },
                createdBy: 1070,
                new: false,
                supportedBy: [1065, 1067],
                comments: [],
                content: "As an interior designer, I'd be happy to oversee this and potentially reduce costs. We could involve some of our more creative members too.",
              },
            ],
          },
        ],
      },
      {
        id: 40012,
        type: "Debate",
        dueAt: { time: "20:00", distance: 10 },
        description: "Should we host Rochefort's Annual Meeting of Sports Clubs and Associates? Total estimated cost: €6,650",
        content: "Based on our cost estimation, the total expense for hosting this event would be approximately €6,650. This is a significant investment, but it could also bring substantial benefits to our club. Please share your thoughts on whether we should proceed with hosting this event.",
        options: [
          {
            id: 400121,
            createdAt: { time: "09:00", distance: 1 },
            createdBy: 1062,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Yes, we should host the event",
            content: "I believe we should seize this opportunity to host the Annual Meeting.",
            comments: [
              {
                id: 4001211,
                createdAt: { time: "10:30", distance: 1 },
                createdBy: 1062,
                new: false,
                supportedBy: [1066, 1072, 1],
                comments: [
                  {
                    id: 40012111,
                    createdAt: { time: "11:15", distance: 1 },
                    createdBy: 1066,
                    new: false,
                    supportedBy: [1062, 1072],
                    comments: [],
                    content: "Absolutely agree. The networking opportunities alone could be invaluable for our club's future.",
                  },
                ],
                content: "This event could put Parkclub on the map as a premier venue in Rochefort. The exposure could lead to new memberships and potential sponsorships, offsetting the initial cost.",
              },
              {
                id: 4001212,
                createdAt: { time: "12:00", distance: 1 },
                createdBy: 1072,
                new: false,
                supportedBy: [1073, 1074, 1075],
                comments: [
                  {
                    id: 40012121,
                    createdAt: { time: "12:45", distance: 1 },
                    createdBy: 1017,
                    new: false,
                    supportedBy: [1018, 1019, 1020],
                    comments: [],
                    content: "As captain of the 1st Senior Team, I think this could really boost our club's profile and potentially attract stronger players.",
                  },
                ],
                content: "From a coaching perspective, this event could open doors for our junior players. We might be able to establish connections with higher-level clubs or even sports academies.",
              },
            ],
          },
          {
            id: 400122,
            createdAt: { time: "09:05", distance: 1 },
            createdBy: 1063,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "No, we should not host the event",
            content: "I have reservations about hosting this event due to the financial implications.",
            comments: [
              {
                id: 4001221,
                createdAt: { time: "13:30", distance: 1 },
                createdBy: 1063,
                new: false,
                supportedBy: [1065, 1067],
                comments: [
                  {
                    id: 40012211,
                    createdAt: { time: "14:15", distance: 1 },
                    createdBy: 1062,
                    new: false,
                    supportedBy: [1066],
                    comments: [],
                    content: "While I understand your concerns, Richard, I believe the potential long-term benefits outweigh the short-term costs. We could also look into sponsorships to offset some of the expenses.",
                  },
                ],
                content: "As the treasurer, I'm concerned about the impact on our budget. We have other pressing needs, like upgrading our court lighting, that this money could be used for.",
              },
              {
                id: 4001222,
                createdAt: { time: "15:00", distance: 1 },
                createdBy: 1037,
                new: false,
                supportedBy: [1038, 1039, 1040],
                comments: [
                  {
                    id: 40012221,
                    createdAt: { time: "15:45", distance: 1 },
                    createdBy: 1,
                    new: false,
                    supportedBy: [1023, 1024],
                    comments: [],
                    content: "I understand your concerns, George. Perhaps we could form a special committee to ensure the event doesn't disrupt regular club activities?",
                  },
                ],
                content: "Speaking for the Masters group, we're worried about the disruption this event might cause to our regular activities. September is usually a busy month for us.",
              },
            ],
          },
        ],
      },
      {
        id: 40013,
        type: "ExternalDecision",
        dueAt: { time: "20:00", distance: 14 },
        description: "Final Decision on Hosting Rochefort's Annual Meeting of Sports Clubs and Associates",
        content: "After careful consideration of the costs, potential benefits, and member opinions, the Execution Committee has made a decision regarding the proposal to host Rochefort's Annual Meeting of Sports Clubs and Associates.",
        options: [
          {
            id: 400131,
            content: "approved",
            rank: 1,
            new: false,
            description: "Parkclub will host the Annual Meeting",
            comments: [
              {
                id: 4001311,
                createdAt: { time: "19:00", distance: 14 },
                createdBy: 1062,
                new: false,
                supportedBy: [],
                comments: [],
                content: "The Execution Committee has decided to proceed with hosting the event. We believe this is a valuable opportunity for Parkclub to raise its profile in the community and potentially attract new members and sponsors. We will form a special committee to oversee the event planning and minimize disruption to regular club activities. We'll also explore sponsorship opportunities to offset some of the costs. Thank you all for your input in this important decision.",
              },
            ],
            createdAt: { time: "19:00", distance: 14 },
            createdBy: 1062,
            supportedBy: [],
          },

        ],
      },
    ],
  },
]

export const IAmMember = true
export const isPublic = true