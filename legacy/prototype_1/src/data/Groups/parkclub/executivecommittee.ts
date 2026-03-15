import { Appointment, Chat, Member, Process, Task } from "@/data/interfaces"

// Add these lines at the beginning of the file, after the import statement

export const content = `The Executive Committee is responsible for the day-to-day management and strategic decision-making of Parkclub. We meet regularly to discuss and implement policies that ensure the club's smooth operation and long-term success.`

export const description = `Elected members responsible for club management and policy-making.`

export const rules = `
Key points for Executive Committee members:
• Attend all scheduled meetings
• Maintain confidentiality of sensitive information
• Act in the best interest of the club and its members
• Participate actively in decision-making processes
• Communicate clearly and respectfully with other committee members and club members
• Adhere to the club's bylaws and ethical standards
• Declare any conflicts of interest
• Stay informed about club affairs and financial status

Remember, as Executive Committee members, we set the tone for the entire club. Our actions and decisions should always reflect the values and goals of Parkclub.`

// The rest of the file remains unchanged
export const members: Member[] = [
  { id: 1, name: "You" }, // Your character: Member of 2nd Senior Team and Execution Committee

  // Execution Committee
  { id: 1062, name: "Victoria Hawthorne" }, // 45, Committee Chair, former professional player
  { id: 1063, name: "Richard Steinberg" }, // 52, Treasurer, accountant by profession
  { id: 1064, name: "Amelia Chakrabarti" }, // 39, Secretary, lawyer specializing in sports law
  { id: 1065, name: "Felix Gruber" }, // 58, Facilities Manager, former construction company owner
  { id: 1066, name: "Sophia Lombardi" }, // 41, Marketing Director, works in advertising

]

export const appointments: Appointment[] = [
  {
    id: 3507,
    at: { time: "19:00", distance: -60 },
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [3112, 3450, 3469, 3101, 1, 3419, 3428, 3475, 3477, 3401, 3403, 3408, 3411, 3420, 3421, 3429, 3432, 3436, 3437, 3444, 3459, 3464],
    declined: [],
    description: "Board Meeting",
    content: "",
  },
  {
    id: 3508,
    at: { time: "19:00", distance: -45 },
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [3112, 3450, 3469, 3101, 1, 3419, 3428, 3475, 3477, 3401, 3403, 3408, 3411, 3420, 3421, 3429, 3432, 3436],
    declined: [3437, 3444, 3459, 3464],
    description: "Board Meeting",
    content: "",
  },
  {
    id: 3509,
    at: { time: "19:00", distance: -30 },
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [3112, 3450, 3469, 3101, 1, 3419, 3428, 3475, 3477, 3401, 3403, 3408, 3411, 3420, 3421, 3429, 3432, 3436, 3437, 3444, 3459, 3464],
    declined: [],
    description: "Board Meeting",
    content: "",
  },
  {
    id: 3510,
    at: { time: "19:00", distance: -15 },
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [3112, 3450, 3469, 3101, 1, 3419, 3428, 3475, 3477, 3401, 3403, 3408, 3411, 3420, 3421, 3429, 3432],
    declined: [3436, 3437, 3444, 3459, 3464],
    description: "Board Meeting",
    content: "",
  },
  {
    id: 3511,
    at: { time: "19:00", distance: 8 },
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [3112, 3450, 3469, 3101, 1],
    declined: [],
    description: "Board Meeting",
    content: "",
  },
  {
    id: 3512,
    at: { time: "19:00", distance: 38 },
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [],
    declined: [],
    description: "Board Meeting",
    content: "",
  },
  {
    id: 3513,
    at: { time: "19:00", distance: 68 },
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [],
    declined: [],
    description: "Board Meeting",
    content: "",
  },
  {
    id: 3514,
    at: { time: "19:00", distance: 98 },
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [],
    declined: [],
    description: "Board Meeting",
    content: "",
  },
  {
    id: 3515,
    at: { time: "19:00", distance: 128 },
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [],
    declined: [],
    description: "Board Meeting",
    content: "",
  },
]
export const tasks: Task[] = [
  {
    id: 1001,
    done: true,
    dueAt: { time: "19:00", distance: -60 },
    assignedBy: 1062,
    description: "Prepare Board Meeting",
    content: "Gather agenda items, prepare financial reports, and review previous meeting minutes for the upcoming board meeting.",
  },
  {
    id: 1002,
    done: true,
    dueAt: { time: "19:00", distance: -45 },
    assignedBy: 1062,
    description: "Prepare Board Meeting",
    content: "Gather agenda items, prepare financial reports, and review previous meeting minutes for the upcoming board meeting.",
  },
  {
    id: 1003,
    done: true,
    dueAt: { time: "19:00", distance: -30 },
    assignedBy: 1062,
    description: "Prepare Board Meeting",
    content: "Gather agenda items, prepare financial reports, and review previous meeting minutes for the upcoming board meeting.",
  },
  {
    id: 1004,
    done: true,
    dueAt: { time: "19:00", distance: -15 },
    assignedBy: 1062,
    description: "Prepare Board Meeting",
    content: "Gather agenda items, prepare financial reports, and review previous meeting minutes for the upcoming board meeting.",
  },
  {
    id: 1005,
    done: false,
    dueAt: { time: "19:00", distance: 8 },
    assignedBy: 1062,
    description: "Prepare Board Meeting",
    content: "Gather agenda items, prepare financial reports, and review previous meeting minutes for the upcoming board meeting.",
  },

]
export const chats: Chat[] = [
  {
    id: 1001,
    members: members.map(member => member.id),
    messages: [
      {
        new: false,
        at: { time: "09:00", distance: -7 },
        sentBy: 1062,
        supportedBy: [],
        content: "Good morning, everyone. I've just uploaded the agenda for our next board meeting. Please review it and let me know if you have any additions or changes.",
      },
      {
        new: false,
        at: { time: "09:15", distance: -7 },
        sentBy: 1063,
        supportedBy: [],
        content: "Thanks, Victoria. I've added a point about the quarterly financial report. We need to discuss our current budget situation.",
      },
      {
        new: false,
        at: { time: "09:30", distance: -7 },
        sentBy: 1064,
        supportedBy: [1062],
        content: "Good idea, Richard. I've also included an item about updating our club's bylaws. Some sections need revision to align with current practices.",
      },
      {
        new: false,
        at: { time: "10:00", distance: -7 },
        sentBy: 1065,
        supportedBy: [],
        content: "I'd like to discuss the maintenance schedule for our facilities. We have some repairs coming up that we need to plan for.",
      },
      {
        new: false,
        at: { time: "10:15", distance: -7 },
        sentBy: 1066,
        supportedBy: [],
        content: "Can we add a point about our upcoming summer event? We need to start planning and allocating resources.",
      },
      {
        new: false,
        at: { time: "10:30", distance: -7 },
        sentBy: 1062,
        supportedBy: [1, 1063, 1064, 1065],
        content: "Great suggestions, everyone. I've updated the agenda with all these points. Let's make sure we're prepared to discuss each item thoroughly.",
      },
      {
        new: false,
        at: { time: "11:00", distance: -6 },
        sentBy: 1,
        supportedBy: [],
        content: "I've been talking to some members, and there's interest in starting a youth program. Could we discuss this at the meeting as well?",
      },
      {
        new: false,
        at: { time: "11:15", distance: -6 },
        sentBy: 1062,
        supportedBy: [1066],
        content: "Excellent idea! I've added it to the agenda. It aligns well with our goal of community engagement.",
      },
      {
        new: false,
        at: { time: "14:00", distance: -5 },
        sentBy: 1063,
        supportedBy: [],
        content: "Just a reminder, everyone - please send me your expense reports for this month by end of day tomorrow. It'll help me prepare the financial summary for the meeting.",
      },
      {
        new: false,
        at: { time: "14:30", distance: -5 },
        sentBy: 1064,
        supportedBy: [],
        content: "Victoria, do you want me to prepare a brief on the bylaw changes I'm proposing?",
      },
      {
        new: false,
        at: { time: "14:45", distance: -5 },
        sentBy: 1062,
        supportedBy: [],
        content: "Yes, Amelia, that would be very helpful. If you could circulate it a day before the meeting, that'd give everyone time to review.",
      },
      {
        new: false,
        at: { time: "09:00", distance: -3 },
        sentBy: 1065,
        supportedBy: [],
        content: "I've compiled a list of necessary repairs and their estimated costs. I'll present this at the meeting, but let me know if you want to see it beforehand.",
      },
      {
        new: false,
        at: { time: "09:30", distance: -3 },
        sentBy: 1066,
        supportedBy: [1, 1062],
        content: "I've drafted a preliminary plan for the summer event. I'll share it during the meeting, but I'm open to any early suggestions or ideas.",
      },
      {
        new: false,
        at: { time: "10:00", distance: -2 },
        sentBy: 1062,
        supportedBy: [],
        content: "Everyone, please remember our board meeting is tomorrow at 7 PM. Don't forget to bring your materials and be prepared to discuss all agenda items.",
      },
      {
        new: false,
        at: { time: "10:15", distance: -2 },
        sentBy: 1,
        supportedBy: [1063, 1064, 1065, 1066],
        content: "Looking forward to a productive meeting. See you all tomorrow!",
      },
    ],
  },
]
export const processes: Process[] = [
  {
    id: 1001,
    new: true,
    public: false,
    active: true,
    createdAt: { time: "09:00", distance: 0 },
    dueAt: { time: "20:00", distance: 7 },
    creator: 1062,
    description: "Membership Fee Structure Review",
    content: "With rising costs across the board, we need to review and potentially adjust our membership fee structure. We will discuss and decide on changes next week. Let's collect ideas for potential changes and evaluate their impact. Current monthly subscription costs are 12€ for juniors up to 18 years, 15€ up to 25 years and 25€ for everyone else.",
    modules: [
      {
        id: 10011,
        type: "Ideation",
        dueAt: { time: "20:00", distance: 3 },
        description: "Ideas for Fee Structure Changes",
        content: "Please suggest ideas for changes to our fee structure and identify any flaws in our current system that need to be addressed.",
        options: [
          {
            id: 100111,
            createdAt: { time: "10:00", distance: 0 },
            createdBy: 1063,
            new: false,
            supportedBy: [1062],
            rank: 0,
            description: "Increase all fees by 10%",
            content: "To keep up with inflation, we could increase all membership fees by 10%. This would mean 13.20€ for juniors, 16.50€ for 18-25 years, and 27.50€ for adults.",
            comments: [],
          },
          {
            id: 100112,
            createdAt: { time: "11:30", distance: 0 },
            createdBy: 1066,
            new: false,
            supportedBy: [1064],
            rank: 0,
            description: "Introduce family discount",
            content: "We could offer a 15% discount for families with more than one member. This could encourage more long-time family memberships.",
            comments: [],
          },
          {
            id: 100113,
            createdAt: { time: "14:00", distance: 0 },
            createdBy: 1,
            new: false,
            supportedBy: [1065],
            rank: 0,
            description: "Low income reductions",
            content: "Give members with low incomes a 20% discount on their membership fees.",
            comments: [],
          },
          {
            id: 100114,
            createdAt: { time: "16:00", distance: 0 },
            createdBy: 1064,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Adjust age brackets",
            content: "Change the age brackets to: up to 16 years, 17-23 years (including students and apprentices older than 23), and 24+ years. This aligns better with school and university ages.",
            comments: [],
          },
        ],
      },
      {
        id: 10012,
        type: "Estimate",
        dueAt: { time: "20:00", distance: 5 },
        description: "Projected Costs of Each Measure",
        content: "For each proposed change, let's estimate the financial impact on both the club and our members.",
        options: [
          {
            id: 100121,
            createdAt: { time: "09:00", distance: 4 },
            createdBy: 1063,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Increase all fees by 10%",
            content: "Increase all fees by 10%",
            comments: [
              {
                id: 1001211,
                createdAt: { time: "09:30", distance: 4 },
                createdBy: 1063,
                new: false,
                supportedBy: [],
                content: "Monthly revenue increase: 267.70€. Breakdown: 16 juniors (1.20€ * 16 = 19.20€), 14 young adults (1.50€ * 14 = 21€), 91 adults (2.50€ * 91 = 227.50€). Total monthly increase: 267.70€. Annually: 3,212.40€.",
                comments: [],
              },
            ],
          },
          {
            id: 100122,
            createdAt: { time: "10:30", distance: 4 },
            createdBy: 1063,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Introduce family discount",
            content: "Introduce family discount",
            comments: [
              {
                id: 1001221,
                createdAt: { time: "11:00", distance: 4 },
                createdBy: 1063,
                new: false,
                supportedBy: [],
                content: "Estimated monthly revenue decrease: 100.20€. Assuming 25% of members (30) are part of family groups, their fees would be reduced by 15%. Breakdown: 4 juniors (1.80€ * 4 = 7.20€), 3 young adults (2.25€ * 3 = 6.75€), 23 adults (3.75€ * 23 = 86.25€). Total monthly decrease: 100.20€. Annually: 1,202.40€.",
                comments: [],
              },
            ],
          },
          {
            id: 100123,
            createdAt: { time: "11:45", distance: 4 },
            createdBy: 1063,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Low income reductions",
            content: "Low income reductions",
            comments: [
              {
                id: 1001231,
                createdAt: { time: "12:15", distance: 4 },
                createdBy: 1063,
                new: false,
                supportedBy: [],
                content: "Estimated monthly revenue decrease: 80.80€. Assuming 15% of members (18) qualify for low income discount. Breakdown: 2 juniors (2.40€ * 2 = 4.80€), 2 young adults (3€ * 2 = 6€), 14 adults (5€ * 14 = 70€). Total monthly decrease: 80.80€. Annually: 969.60€.",
                comments: [],
              },
            ],
          },
          {
            id: 100124,
            createdAt: { time: "13:00", distance: 4 },
            createdBy: 1063,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "Adjust age brackets",
            content: "Adjust age brackets",
            comments: [
              {
                id: 1001241,
                createdAt: { time: "13:30", distance: 4 },
                createdBy: 1063,
                new: false,
                supportedBy: [],
                content: "Estimated monthly revenue change: +95€. Assuming 5 members move from junior to young adult (3€ increase each), and 8 members move from young adult to adult (10€ increase each). Breakdown: 5 * 3€ = 15€, 8 * 10€ = 80€. Total monthly increase: 95€. Annually: 1,140€.",
                comments: [],
              },
            ],
          },
        ],
      },
      {
        id: 10013,
        type: "Estimate",
        dueAt: { time: "20:00", distance: 6 },
        description: "Projected Costs for Combined Measures",
        content: "Let's evaluate the costs and benefits of implementing sensible combinations of the proposed measures.",
        options: [
          {
            id: 100131,
            createdAt: { time: "09:00", distance: 5 },
            createdBy: 1063,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "10% raise",
            content: "10% raise",
            comments: [
              {
                id: 1001311,
                createdAt: { time: "09:30", distance: 5 },
                createdBy: 1063,
                new: false,
                supportedBy: [],
                content: "Monthly revenue increase: 267.70€. Breakdown: 16 juniors (1.20€ * 16 = 19.20€), 14 young adults (1.50€ * 14 = 21€), 91 adults (2.50€ * 91 = 227.50€). Total monthly increase: 267.70€. Annually: 3,212.40€.",
                comments: [],
              },
            ],
          },
          {
            id: 100132,
            createdAt: { time: "10:00", distance: 5 },
            createdBy: 1063,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "20% raise + low income + family discount",
            content: "20% raise + low income + family discount",
            comments: [
              {
                id: 1001321,
                createdAt: { time: "10:30", distance: 5 },
                createdBy: 1063,
                new: false,
                supportedBy: [],
                content: "Monthly revenue increase: 335.40€. 20% raise: 535.40€ (16 * 2.40€ + 14 * 3€ + 91 * 5€). Low income reduction: -161.60€ (18 members, 20% off new prices). Family discount: -38.40€ (30 members, 15% off new prices). Net monthly increase: 335.40€. Annually: 4,024.80€.",
                comments: [],
              },
            ],
          },
          {
            id: 100133,
            createdAt: { time: "11:00", distance: 5 },
            createdBy: 1063,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "10% raise + age brackets",
            content: "10% raise + age brackets",
            comments: [
              {
                id: 1001331,
                createdAt: { time: "11:30", distance: 5 },
                createdBy: 1063,
                new: false,
                supportedBy: [],
                content: "Monthly revenue increase: 362.70€. 10% raise: 267.70€. Age bracket adjustment: 95€ (5 members from junior to young adult: 5 * 3€, 8 members from young adult to adult: 8 * 10€). Total monthly increase: 362.70€. Annually: 4,352.40€.",
                comments: [],
              },
            ],
          },
          {
            id: 100134,
            createdAt: { time: "12:00", distance: 5 },
            createdBy: 1063,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "20% raise + age brackets + low income + family discount",
            content: "20% raise + age brackets + low income + family discount",
            comments: [
              {
                id: 1001341,
                createdAt: { time: "12:30", distance: 5 },
                createdBy: 1063,
                new: false,
                supportedBy: [],
                content: "Monthly revenue increase: 430.40€. 20% raise: 535.40€. Age bracket adjustment: 95€. Low income reduction: -161.60€ (18 members, 20% off new prices). Family discount: -38.40€ (30 members, 15% off new prices). Net monthly increase: 430.40€. Annually: 5,164.80€.",
                comments: [],
              },
            ],
          },
          {
            id: 100135,
            createdAt: { time: "13:00", distance: 5 },
            createdBy: 1063,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "10% raise + age brackets + another 10% for ages 24+",
            content: "10% raise + age brackets + another 10% for ages 24+",
            comments: [
              {
                id: 1001351,
                createdAt: { time: "13:30", distance: 5 },
                createdBy: 1063,
                new: false,
                supportedBy: [],
                content: "Monthly revenue increase: 590.20€. 10% raise: 267.70€. Age bracket adjustment: 95€. Additional 10% for ages 24+: 227.50€ (91 * 2.50€). Total monthly increase: 590.20€. Annually: 7,082.40€.",
                comments: [],
              },
            ],
          },
          {
            id: 100136,
            createdAt: { time: "14:00", distance: 5 },
            createdBy: 1063,
            new: false,
            supportedBy: [],
            rank: 0,
            description: "10% raise + age brackets + another 10% for ages 24 + low income + family discount",
            content: "10% raise + age brackets + another 10% for ages 24 + low income + family discount",
            comments: [
              {
                id: 1001361,
                createdAt: { time: "14:30", distance: 5 },
                createdBy: 1063,
                new: false,
                supportedBy: [],
                content: "Monthly revenue increase: 390.60€. 10% raise: 267.70€. Age bracket adjustment: 95€. Additional 10% for ages 24+: 227.50€. Low income reduction: -161.60€ (18 members, 20% off new prices). Family discount: -38.00€ (30 members, 15% off new prices). Net monthly increase: 390.60€. Annually: 4,687.20€.",
                comments: [],
              },
            ],
          },
        ],
      },
      {
        id: 10014,
        type: "Announcement",
        dueAt: { time: "", distance: 0 },
        description: "Decision on Fee Structure Changes",
        content: "We have decided on the following changes to our membership fee structure in yesterday's meeting:",
        options: [
          {
            id: 100141,
            description: "Decision of Yesterdays Meeting",
            createdAt: { time: "09:00", distance: 6 },
            createdBy: 3114,
            new: false,
            supportedBy: [],
            rank: 0,
            content: "We decided to chose the following version: 10% raise + age brackets + another 10% for ages 24+ low income + family discount. This should keep reasonable fairness and at the same time provide the necessary increase in revenue. The new fee structure will be: 0-16 years: 13,20€, 17-23 years, including students and apprentices: 16,50€, 24+ years: 30€. The suggested discounts for families and low incomes are also applied from now on.",
            comments: [{
              id: 1001411,
              createdAt: { time: "10:30", distance: 6 },
              createdBy: 1064,
              new: false,
              supportedBy: [3420, 3421, 3422],
              comments: [],
              content: "Love the fairness aspect!",
            }],
          },
        ],
      },
    ],
  },
]
export const IAmMember = true
export const isPublic = false