import { Chat, Member } from "../../interfaces"

export const description = "Sports in Rochefort Community Platform"

export const content = `Welcome to the Sports in Rochefort community platform! This digital space is dedicated to promoting and organizing sports activities in our vibrant town. We aim to foster a healthy, active lifestyle for all residents, from casual enthusiasts to competitive athletes.

Key features of our sports community:
• Diverse range of sports clubs and activities
• Regular community events and tournaments
• Promotion of youth sports and development programs
• Collaboration with local schools and businesses
• Focus on inclusivity and accessibility in sports

Through this platform, we coordinate events, share news about local sports achievements, and discuss ways to improve sports facilities and programs in Rochefort. Together, we can make our town a hub of sporting excellence and community wellness.`

export const rules = `Welcome to the Sports in Rochefort Community Platform. We're committed to fostering a positive and supportive environment for all sports enthusiasts in our town.

Platform Rules:
• Respect all members, regardless of their skill level or chosen sport
• Keep discussions constructive and sports-related
• No hate speech, discrimination, or personal attacks
• Share accurate information about events and activities
• Respect privacy and obtain permission before sharing photos or personal information
• Promote fair play and good sportsmanship in all interactions

Remember, this platform is for the benefit of all sports lovers in Rochefort. By following these guidelines and actively participating in our community, you help promote a healthy and active lifestyle for everyone.

For information on specific sports clubs, facilities, or events, please refer to the relevant sections of this platform or contact the appropriate sports coordinator.

Any concerns about platform use or content should be reported to the moderation team for prompt resolution.`

export const members: Member[] = [
  { id: 1, name: "You" }, // Your character: 32, Political activist, welcoming, collaborative and empathetic, but assertive, concerned and strict.

  //Sports in Rochefort
  { id: 2027, name: "Sophia Papadopoulos" }, // 43, Florist, beautifies public spaces with flower arrangements
  { id: 2028, name: "Lukas Novak" }, // 31, Web designer, created the town's official website
  { id: 2029, name: "Emilia Virtanen" }, // 37, Physiotherapist, offers discounted services to seniors
  { id: 2030, name: "Mateo Kovač" }, // 46, Carpenter, builds furniture for community spaces
  { id: 2031, name: "Astrid Lindholm" }, // 34, Marketing specialist, promotes local businesses
  { id: 2032, name: "Rafael Santos" }, // 29, Musician, organizes community concerts and events
  { id: 2033, name: "Mei Ling" }, // 41, Nutritionist, runs healthy cooking workshops
  { id: 2034, name: "Viktor Petrov" }, // 53, Optometrist, provides free eye exams for children
  { id: 2035, name: "Elsa Johansson" }, // 38, Lawyer, offers pro bono services to community members
  { id: 2036, name: "Marco Rossi" }, // 27, Barista, hosts coffee tasting events
  { id: 2037, name: "Annika Bergman" }, // 49, Real estate agent, helps with affordable housing initiatives
  { id: 2038, name: "Sven Eriksson" }, // 36, Photographer, documents town events and history
  { id: 2039, name: "Catalina Popescu" }, // 33, Dance instructor, teaches classes for all ages
  { id: 2040, name: "Nikolai Ivanov" }, // 45, Plumber, volunteers for community center maintenance
  { id: 2041, name: "Linnea Bergström" }, // 30, Environmental engineer, consults on sustainability projects
  { id: 2042, name: "Hassan Al-Farsi" }, // 39, Radio host, broadcasts local news and community stories
  { id: 2043, name: "Emma Dubois" }, // 28, Pastry chef, donates baked goods to community events
  { id: 2044, name: "Liam O'Connor" }, // 51, Firefighter, leads fire safety workshops
  { id: 2045, name: "Ava Kowalski" }, // 35, Landscape architect, designs public parks and gardens
  { id: 2046, name: "Matteo Bianchi" }, // 42, Sports coach, trains local youth teams
  { id: 2047, name: "Freya Nielsen" }, // 31, Librarian, organizes book clubs and literary events
  { id: 2048, name: "Tomas Novák" }, // 47, Car mechanic, offers discounted services for low-income families
  { id: 2049, name: "Yara Al-Rashid" }, // 29, Graphic novelist, teaches art classes to children
  { id: 2050, name: "Willem van der Meer" }, // 56, Town historian, leads guided tours of Rochefort
  { id: 2051, name: "Anastasia Kuznetsova" }, // 32, Ballet dancer and instructor, organizes community dance events
  { id: 2052, name: "Hugo Dubois" }, // 40, Chef at a local vegetarian restaurant, promotes sustainable eating
  { id: 2053, name: "Zoe Chen" }, // 33, Software engineer, volunteers teaching coding to kids
  { id: 2054, name: "Oliver Schmidt" }, // 38, Sociologist, conducts research on community dynamics
  { id: 2055, name: "Isabel Fernández" }, // 45, Veterinarian, volunteers at the local animal shelter
  { id: 2056, name: "Finn Larsson" }, // 29, Renewable energy technician, installs solar panels
  { id: 2057, name: "Nora Lindholm" }, // 52, Family therapist, offers counseling to community members
]


export const chats: Chat[] = [
  {
    id: 2001,
    members: members.map(member => member.id),
    messages: [
      {
        new: false,
        at: { time: "09:00", distance: -30 },
        sentBy: 1,
        supportedBy: [],
        content: "Hello everyone! I'd like to start a discussion on how we can bring more attention to our local sports clubs. Any ideas?",
      },
      {
        new: false,
        at: { time: "09:15", distance: -30 },
        sentBy: 2046,
        supportedBy: [2039, 2051],
        content: "As a sports coach, I think we need more visibility. Maybe we could organize some kind of open day for all clubs?",
      },
      {
        new: false,
        at: { time: "09:30", distance: -30 },
        sentBy: 2032,
        supportedBy: [2036, 2049],
        content: "That's a great idea! We could combine it with live music and art to make it a real community event.",
      },
      {
        new: false,
        at: { time: "09:45", distance: -30 },
        sentBy: 2031,
        supportedBy: [2038],
        content: "I can help with marketing. We could create a campaign to promote the event across town.",
      },
      {
        new: false,
        at: { time: "10:00", distance: -30 },
        sentBy: 2042,
        supportedBy: [2027, 2043],
        content: "I'd be happy to broadcast information about the event on my radio show. We could also interview club representatives leading up to the day.",
      },
      {
        new: false,
        at: { time: "10:15", distance: -30 },
        sentBy: 2054,
        supportedBy: [2035],
        content: "This could be a great opportunity to study community engagement. I suggest we make it an annual event, rotating between different clubs each year.",
      },
      {
        new: false,
        at: { time: "10:30", distance: -30 },
        sentBy: 1,
        supportedBy: [2046, 2031, 2042],
        content: "These are all fantastic ideas! I love the suggestion of making it an annual event. Let's call it 'Rochefort Club Day'. What do you think?",
      },
      {
        new: false,
        at: { time: "10:45", distance: -30 },
        sentBy: 2045,
        supportedBy: [2033, 2052],
        content: "Great name! I can help design an outdoor space for the event if needed. We could also incorporate healthy food stands to promote well-being.",
      },
      {
        new: false,
        at: { time: "11:00", distance: -30 },
        sentBy: 2056,
        supportedBy: [2041, 2053],
        content: "We could showcase how sports clubs are becoming more sustainable. I'd be happy to set up a demo of solar-powered equipment.",
      },
      {
        new: false,
        at: { time: "11:15", distance: -30 },
        sentBy: 2035,
        supportedBy: [2037, 2048],
        content: "I can help draft any necessary permits or agreements for the event. We should also consider insurance and safety measures.",
      },
      {
        new: false,
        at: { time: "11:30", distance: -30 },
        sentBy: 1,
        supportedBy: [2054, 2045, 2056, 2035],
        content: "This is shaping up to be an amazing event! Let's summarize: An annual 'Rochefort Club Day', hosted by a different club each year, featuring sports demonstrations, live music, art, healthy food, and sustainability showcases. We'll need to coordinate marketing, logistics, and legal aspects. Does everyone agree with this plan?",
      },
      {
        new: false,
        at: { time: "11:45", distance: -30 },
        sentBy: 2046,
        supportedBy: members.map(member => member.id).filter(id => id !== 2046 && id !== 1),
        content: "This sounds perfect! As a sports coach, I'm excited to see this come to life. It will be a great way to engage the community and showcase what our local clubs have to offer.",
      },
      {
        new: false,
        at: { time: "12:00", distance: -30 },
        sentBy: 1,
        supportedBy: [],
        content: "Wonderful! Let's start planning our first Rochefort Club Day. I'll create a task list and we can begin assigning responsibilities. Thank you all for your enthusiasm and great ideas!",
      },
    ],
  },
]

// ... (rest of the code remains unchanged)

export const IAmMember = true
export const isPublic = false