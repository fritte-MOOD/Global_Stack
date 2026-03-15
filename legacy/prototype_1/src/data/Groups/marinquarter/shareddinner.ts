import { Appointment, Chat, Member, Process, Task } from "../../interfaces"

export const description = "Marin Quarter Shared Dinner Group"

export const content = "The Shared Dinner Group is a vibrant community initiative within Marin Quarter that brings residents together through the joy of food and shared meals. Our monthly dinners celebrate diverse cuisines, foster community bonds, and provide a platform for cultural exchange. From seasoned chefs to enthusiastic home cooks, everyone is welcome to contribute their culinary skills and stories."

export const rules = `
1. Participate in at least one shared dinner every three months to maintain active membership.
2. When bringing a dish, provide a list of ingredients to accommodate dietary restrictions and allergies.
3. Sign up for dinner preparation or clean-up duties at least once every six months.
4. Respect the chosen theme for each dinner and try to bring a dish that aligns with it.
5. Arrive on time for the dinner. If you're running late, please inform the organizer.
6. Bring your own reusable plates, utensils, and cups to reduce waste.
7. Be mindful of portion sizes to ensure everyone gets to try each dish.
8. Clean up after yourself and help with general clean-up after the dinner.
9. Respect others' dietary choices and restrictions.
10. Contribute ideas for future dinner themes and be open to trying new cuisines.
11. If you sign up to attend, please make every effort to do so. If you must cancel, give at least 24 hours notice.
12. Be inclusive and welcoming to all community members, regardless of their cooking experience or background.
`
export const members: Member[] = [
  { id: 1, name: "You" }, // Your character: 32, Political activist, welcoming, collaborative and empathetic, but assertive, concerned and strict.

  //House 1
  { id: 3401, name: "Alex Chen" }, // 22, Engineering student, loves tinkering with electronics, organizes house parties
  { id: 3403, name: "Marco Rossi" }, // 21, Mechanical engineering student, passionate about motorcycles, runs a small repair business

  //House 2
  { id: 3408, name: "Emma Dubois" }, // 23, French literature student, organizes poetry nights, loves cooking
  { id: 3411, name: "Oliver Schmidt" }, // 21, Sociology freshman, interested in urban cultures, amateur DJ
  { id: 3419, name: "Chloe Bennett" }, // 22, Environmental ethics student, zero-waste lifestyle advocate, community garden volunteer

  //House 11
  { id: 3420, name: "Martin Eriksen" }, // 38, IT consultant, father of three, enjoys cooking for the whole house
  { id: 3421, name: "Astrid Eriksen" }, // 36, Pediatrician, mother of three, organizes family game nights
  { id: 3428, name: "Isabella Rossi" }, // 72, Elena's mother, retired teacher, loves gardening and storytelling

  //House 12
  { id: 3429, name: "Clara Bergmann" }, // 29, Environmental scientist, passionate about sustainable living
  { id: 3432, name: "Hugo Dubois" }, // 27, Chef at a local vegetarian restaurant, loves experimenting with urban gardening
  { id: 3436, name: "Mateo Santos" }, // 35, Social worker specializing in youth programs, passionate about community building

  //House 13
  { id: 3101, name: "Sophie Dubois" }, // 28, nurse, single, loves yoga and reading
  { id: 3112, name: "Andreas Papadopoulos" }, // 30, chef, single, organizes community dinners
  { id: 3115, name: "Catalina Popescu" }, // 32, social worker, single, active in community outreach

  //House 21
  { id: 3437, name: "Olivia Andersson" }, // 32, Marketing executive, single mother with a 1-year-old baby
  { id: 3444, name: "Thomas Jansen" }, // 37, Financial analyst, single, amateur chef who loves hosting dinner parties
  { id: 3450, name: "Matteo Bianchi" }, // 42, Restaurant owner, married, organizes community food festivals

  //House 22
  { id: 3459, name: "Yara Al-Rashid" }, // 29, Pharmacist, newly married, enjoys cooking Middle Eastern cuisine
  { id: 3464, name: "Dimitri Antonopoulos" }, // 41, Restaurant owner, married, passionate about Mediterranean cuisine

  //House 23
  { id: 3469, name: "Margherita Rossi" }, // 75, Retired chef, loves to cook for her housemates
  { id: 3475, name: "Annika Bergman" }, // 72, Former social worker, coordinates volunteer activities
  { id: 3477, name: "Beatrice Lefèvre" }, // 77, Former botanist, maintains a beautiful balcony garden
]

export const chats: Chat[] = []
export const tasks: Task[] = []

// Create appointments separately
export const appointments: Appointment[] = [
  {
    id: 3501,
    at: { time: "19:00", distance: -180 }, // Approximately 6 months ago
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [3112, 3450, 3469, 3101, 1, 3419, 3428, 3475, 3477],
    declined: [3401, 3403],
    description: "Shared Dinner - Summer Fiesta",
    content: "Join us for our monthly shared dinner! This month's theme is Summer Fiesta. Bring your favorite summer dishes and let's celebrate the season together!",
  },
  {
    id: 3502,
    at: { time: "19:00", distance: -150 }, // Approximately 5 months ago
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [3112, 3450, 3469, 3101, 1, 3419, 3428, 3475, 3477, 3401, 3403, 3408, 3411],
    declined: [3420, 3421],
    description: "Shared Dinner - Autumn Harvest",
    content: "It's time for our monthly shared dinner! Let's celebrate the autumn harvest with dishes featuring seasonal produce. Don't forget to bring your favorite fall recipes!",
  },
  {
    id: 3503,
    at: { time: "19:00", distance: -120 }, // Approximately 4 months ago
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [3112, 3450, 3469, 3101, 1, 3419, 3428, 3475, 3477, 3401, 3403, 3408, 3411, 3420, 3421, 3429, 3432],
    declined: [],
    description: "Shared Dinner - Comfort Food Night",
    content: "As the weather gets cooler, let's warm up with our favorite comfort foods! Bring a dish that reminds you of home for our monthly shared dinner.",
  },
  {
    id: 3504,
    at: { time: "19:00", distance: -90 }, // Approximately 3 months ago
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [3112, 3450, 3469, 3101, 1, 3419, 3428, 3475, 3477, 3401, 3403, 3408, 3411, 3420, 3421, 3429, 3432, 3436, 3437, 3444],
    declined: [3459, 3464],
    description: "Shared Dinner - International Cuisine",
    content: "Let's take a culinary trip around the world! For this month's shared dinner, bring a dish from a country you love or want to explore.",
  },
  {
    id: 3505,
    at: { time: "19:00", distance: -60 }, // Approximately 2 months ago
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [3112, 3450, 3469, 3101, 1, 3419, 3428, 3475, 3477, 3401, 3403, 3408, 3411, 3420, 3421, 3429, 3432, 3436, 3437, 3444, 3459, 3464],
    declined: [],
    description: "Shared Dinner - Vegetarian Delight",
    content: "This month, we're going green! Let's explore the world of vegetarian cuisine. Bring your favorite meatless dishes to share.",
  },
  {
    id: 3506,
    at: { time: "19:00", distance: -30 }, // Approximately 1 month ago
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [3112, 3450, 3469, 3101, 1, 3419, 3428, 3475, 3477, 3401, 3403, 3408, 3411, 3420, 3421, 3429, 3432, 3436, 3437, 3444, 3459, 3464],
    declined: [],
    description: "Shared Dinner - Breakfast for Dinner",
    content: "Who says breakfast is just for mornings? This month, let's enjoy our favorite breakfast foods for dinner! Bring your best breakfast or brunch dishes to share.",
  },
  {
    id: 3507,
    at: { time: "19:00", distance: 0 }, // Current month
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [],
    declined: [],
    description: "Shared Dinner - Local and Seasonal",
    content: "For this month's dinner, let's celebrate local and seasonal produce! Bring a dish that showcases the best of what's available in our area right now.",
  },
  {
    id: 3508,
    at: { time: "19:00", distance: 30 }, // Approximately 1 month in the future
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [],
    declined: [],
    description: "Shared Dinner - Fusion Cuisine",
    content: "Get creative with fusion cuisine! For our next shared dinner, bring a dish that combines elements from two or more culinary traditions.",
  },
  {
    id: 3509,
    at: { time: "19:00", distance: 60 }, // Approximately 2 months in the future
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [],
    declined: [],
    description: "Shared Dinner - Childhood Favorites",
    content: "Let's take a trip down memory lane! For this shared dinner, bring a dish inspired by your childhood favorites. Don't forget to share the story behind your dish!",
  },
  {
    id: 3510,
    at: { time: "19:00", distance: 90 }, // Approximately 3 months in the future
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [],
    declined: [],
    description: "Shared Dinner - Summer Kickoff",
    content: "Summer is just around the corner! Let's celebrate with a dinner featuring light, refreshing dishes perfect for warm weather.",
  },
  {
    id: 3511,
    at: { time: "19:00", distance: 120 }, // Approximately 4 months in the future
    createdBy: 3112,
    invited: members.map(member => member.id),
    accepted: [],
    declined: [],
    description: "Shared Dinner - Picnic Style",
    content: "Weather permitting, let's take our shared dinner outdoors! Bring your favorite picnic foods and let's enjoy a meal in the fresh air.",
  },
]

export const processes: Process[] = [
  {
    id: 3501,
    new: true,
    public: true,
    active: true,
    createdAt: { time: "14:30", distance: -2 },
    dueAt: { time: "20:00", distance: 5 },
    creator: 3112,
    description: "Collecting Ideas for Next Dinner Themes",
    content: "Let's brainstorm some exciting themes for our upcoming shared dinners. Feel free to suggest any cuisine, cultural theme, or unique concept you'd like to explore. Don't forget to comment on others' ideas if you like them or have something to add!",
    modules: [
      {
        id: 35011, type: "Ideation", dueAt: { time: "20:00", distance: 5 }, description: "Dinner Theme Ideas",
        content: "Share your ideas for dinner themes and comment on others' suggestions.",
        options: [
          {
            id: 350111,
            createdAt: { time: "15:00", distance: -2 },
            createdBy: 3112,
            new: false,
            supportedBy: [3450, 3469, 3101, 1, 3419],
            rank: 0,
            description: "Italian Night",
            content: "Italian Night",
            comments: [
              {
                id: 3501111,
                createdAt: { time: "15:30", distance: -2 },
                createdBy: 3450,
                new: false,
                supportedBy: [3112, 3469, 1],
                comments: [],
                content: "Great idea! I can share some authentic recipes from my nonna.",
              },
              {
                id: 3501112,
                createdAt: { time: "16:15", distance: -2 },
                createdBy: 1,
                new: false,
                supportedBy: [3419, 3432],
                comments: [],
                content: "Sounds delicious! Could we also include some vegetarian options?",
              },
            ],
          },
          {
            id: 350112,
            createdAt: { time: "16:45", distance: -2 },
            createdBy: 3428,
            new: false,
            supportedBy: [3475, 3469, 3477, 3420, 3421, 3401, 3403, 3444],
            rank: 0,
            description: "Childhood Memories",
            content: "Childhood Memories",
            comments: [
              {
                id: 3501121,
                createdAt: { time: "17:10", distance: -2 },
                createdBy: 3475,
                new: false,
                supportedBy: [3428, 3469, 3477],
                comments: [],
                content: "Love this idea! We could all bring dishes from our childhood.",
              },
              {
                id: 3501122,
                createdAt: { time: "17:45", distance: -2 },
                createdBy: 3420,
                new: false,
                supportedBy: [3421, 3428, 1],
                comments: [],
                content: "My grandma's pancakes, ooohhhh yes!",
              },
              {
                id: 3501123,
                createdAt: { time: "18:15", distance: -2 },
                createdBy: 3401,
                new: false,
                supportedBy: [3403, 3444, 1],
                comments: [],
                content: "My dad's barbecue!!!",
              },
            ],
          },
          {
            id: 350113,
            createdAt: { time: "18:00", distance: -2 },
            createdBy: 3459,
            new: false,
            supportedBy: [3464, 1, 3112, 3432, 3401, 3403],
            rank: 0,
            description: "Barbecue Night",
            content: "Barbecue Night",
            comments: [
              {
                id: 3501131,
                createdAt: { time: "18:30", distance: -2 },
                createdBy: 3464,
                new: false,
                supportedBy: [3459, 1, 3112],
                comments: [],
                content: "Great idea! We could do a mix of traditional and international barbecue styles.",
              },
            ],
          },
          {
            id: 350114,
            createdAt: { time: "19:00", distance: -2 },
            createdBy: 3419,
            new: false,
            supportedBy: [3432, 1, 3429, 3477],
            rank: 0,
            description: "Local and Seasonal",
            content: "Local and Seasonal",
            comments: [
              {
                id: 3501141,
                createdAt: { time: "19:15", distance: -2 },
                createdBy: 3432,
                new: false,
                supportedBy: [3419, 1, 3429],
                comments: [],
                content: "Love this! We could showcase the best produce from local farmers.",
              },
            ],
          },
        ],
      },
      {
        id: 35012,
        type: "Prioritize",
        dueAt: { time: "20:00", distance: 5 },
        description: "Vote for Your Favorite Dinner Theme",
        content: "Please vote for your preferred dinner theme. You can vote for multiple options, but try to prioritize your top choices.",
        options: [
          {
            id: 350121,
            content: "Italian Night",
            rank: 67,
            supportedBy: [3450, 3469, 3101, 1, 3419],
            new: false,
            description: "A night of Italian cuisine and culture",
            comments: [],
            createdAt: { time: "19:30", distance: -2 },
            createdBy: 3112,
          },
          {
            id: 350122,
            content: "Childhood Memories",
            rank: 85,
            supportedBy: [3475, 3469, 3477, 3420, 3421, 3401, 3403, 3444],
            new: false,
            description: "Dishes inspired by our childhood favorites",
            comments: [],
            createdAt: { time: "19:30", distance: -2 },
            createdBy: 3112,
          },
          {
            id: 350123,
            content: "Barbecue Night",
            rank: 45,
            supportedBy: [3464, 1, 3112, 3432, 3401, 3403],
            new: false,
            description: "A variety of barbecue styles and dishes",
            comments: [],
            createdAt: { time: "19:30", distance: -2 },
            createdBy: 3112,
          },
          {
            id: 350124,
            content: "Local and Seasonal",
            rank: 91,
            supportedBy: [3432, 1, 3429, 3477],
            new: false,
            description: "Showcasing the best local and seasonal produce",
            comments: [],
            createdAt: { time: "19:30", distance: -2 },
            createdBy: 3112,
          },
        ],
      },
    ],
  },
]

export const IAmMember = true
export const isPublic = true