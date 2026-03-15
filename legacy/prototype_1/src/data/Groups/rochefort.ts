import { Member, Process } from "../interfaces"
export const description = "Rochefort Municipal Community Platform"

export const content = `Rochefort is a vibrant municipality located in the heart of our region, known for its rich history, cultural diversity, and commitment to sustainable development. With a population of approximately 18,000 residents, our community is a blend of urban amenities and small-town charm.

Our municipal platform serves as a digital town square, connecting residents, local government, and community organizations. It's designed to foster civic engagement, transparent governance, and collaborative problem-solving.

Key features of our community:
• Historic town center with architecture dating back to the 17th century
• Thriving local businesses and weekly farmers' market
• Beautiful parks and green spaces, including the Rochefort Botanical Gardens
• Active cultural scene with museums, theaters, and annual festivals
• Commitment to sustainable urban development and green initiatives

Through this platform, we aim to keep all residents informed about local events, municipal decisions, and opportunities for community involvement. Together, we can make Rochefort an even better place to live, work, and visit.`

export const rules = `Welcome to the Rochefort Municipal Community Platform. We're committed to fostering open, respectful, and productive dialogue among all community members.

Form Rules:
• Be respectful and courteous in all communications
• Stay on topic and contribute constructively to discussions
• No hate speech, discrimination, or personal attacks
• Protect personal and sensitive information
• Comply with local, national, and EU laws and regulations

Remember, this platform is for the benefit of all Rochefort residents. By following these guidelines and actively participating in our community discussions, you help make Rochefort a better place for everyone.

For detailed information on municipal services, local bylaws, and community initiatives, please refer to the official Rochefort website or contact the relevant municipal department.

Any concerns about platform use or content should be reported to the moderation team for prompt resolution.`
export const members: Member[] = [
  { id: 1, name: "You" }, // Your character: 32, Political activist, welcoming, collaborative and empathetic, but assertive, concerned and strict.

  //Parents of Rochefort
  { id: 2001, name: "Sophie Dubois" }, // 45, Mayor of Rochefort, passionate about community development
  { id: 2002, name: "Pierre Lefèvre" }, // 52, Local business owner, runs a popular café in town
  { id: 2003, name: "Marie Clément" }, // 38, Elementary school teacher, organizes after-school programs
  { id: 2004, name: "Jean-Luc Moreau" }, // 60, Retired police officer, volunteers for neighborhood watch
  { id: 2005, name: "Amélie Rousseau" }, // 29, Environmental activist, leads local recycling initiatives
  { id: 2006, name: "François Dupont" }, // 41, Architect, specializes in sustainable building design
  { id: 2007, name: "Elena Rossi" }, // 36, Nurse at the local hospital, advocates for better healthcare
  { id: 2008, name: "Thomas Schmidt" }, // 33, Software developer, works remotely for a tech startup
  { id: 2009, name: "Olivia Chen" }, // 27, Freelance graphic designer, organizes art workshops
  { id: 2010, name: "Markus Weber" }, // 55, High school principal, passionate about education reform
  { id: 2011, name: "Lena Kowalski" }, // 31, Journalist for the local newspaper, covers community issues
  { id: 2012, name: "Carlos Fernandez" }, // 40, Chef, promotes local cuisine and sustainable food practices
  { id: 2013, name: "Ingrid Svensson" }, // 34, Social worker, runs programs for at-risk youth
  { id: 2014, name: "Ahmed Hassan" }, // 48, Civil engineer, involved in town infrastructure projects
  { id: 2015, name: "Yuki Tanaka" }, // 29, Librarian, organizes community reading programs
  { id: 2016, name: "Dmitri Volkov" }, // 37, Fitness instructor, leads outdoor exercise groups
  { id: 2017, name: "Isabella Rossi" }, // 42, Psychologist, offers counseling services to residents
  { id: 2018, name: "Lars Andersen" }, // 30, Organic farmer, supplies local restaurants and markets
  { id: 2019, name: "Amelia Nowak" }, // 39, Museum curator, preserves local history and culture
  { id: 2020, name: "Javier Lopez" }, // 44, Dentist, provides free dental care to low-income families
  { id: 2021, name: "Fatima Al-Rashid" }, // 28, Yoga instructor, teaches classes in the community center
  { id: 2022, name: "Erik Johansson" }, // 35, Electrician, volunteers for home repairs for elderly residents
  { id: 2023, name: "Nadia Petrov" }, // 32, Veterinarian, runs a mobile clinic for farm animals
  { id: 2024, name: "Giovanni Bianchi" }, // 50, Bank manager, advises on community financial matters
  { id: 2025, name: "Zoe Anderson" }, // 26, Recent graduate, starting an eco-friendly clothing business
  { id: 2026, name: "Hans Müller" }, // 58, Retired teacher, tutors students in mathematics and science

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

  //council members (politicians)
  { id: 2090, name: "Adrien Mercier" }, // 52, Mayor, leads city council meetings and oversees city operations
  { id: 2091, name: "Valentina Rossi" }, // 48, Deputy Mayor, assists the mayor and focuses on economic development
  { id: 2092, name: "Nikolaus Bauer" }, // 39, Finance Committee Chair, manages city budget and financial planning
  { id: 2093, name: "Esmée van der Berg" }, // 56, Urban Planning Committee Chair, oversees city development and zoning
  { id: 2094, name: "Tariq Al-Mansour" }, // 41, Environmental Affairs Committee Chair, promotes sustainability initiatives
  { id: 2095, name: "Chiara Lombardi" }, // 37, Education and Youth Affairs Committee Chair, works on improving local schools
  { id: 2096, name: "Mikael Lindström" }, // 45, Health and Social Services Committee Chair, focuses on community welfare
  { id: 2097, name: "Céline Durand" }, // 50, Public Safety Committee Chair, coordinates with police and fire departments
  { id: 2098, name: "Alexis Petridis" }, // 43, Culture and Tourism Committee Chair, promotes local events and attractions
  { id: 2099, name: "Linnea Nordström" }, // 35, Technology and Innovation Committee Chair, modernizes city services
  { id: 2100, name: "Marcel Kowalczyk" }, // 47, Transportation Committee Chair, improves public transit and infrastructure
  { id: 2101, name: "Carmen Navarro" }, // 42, Sports and Recreation Committee Chair, manages parks and recreational facilities
  { id: 2102, name: "Sven Eriksson" }, // 33, Community Engagement Committee Chair, facilitates citizen participation
  { id: 2103, name: "Natalya Ivanova" }, // 51, Ethics and Transparency Committee Chair, ensures government accountability
  { id: 2104, name: "Hugo Leclerc" }, // 38, Small Business and Entrepreneurship Committee Chair, supports local businesses
  { id: 2105, name: "Annika Bergman" }, // 44, Housing and Development Committee Chair, addresses affordable housing issues
  { id: 2106, name: "Luca Conti" }, // 36, Arts and Culture Committee Chair, supports local artists and cultural events
  { id: 2107, name: "Yuki Watanabe" }, // 40, International Relations Committee Chair, manages sister city programs
  { id: 2108, name: "Siobhan O'Brien" }, // 49, Emergency Preparedness Committee Chair, develops disaster response plans
  { id: 2109, name: "Matthias Schmidt" }, // 34, Digital Inclusion Committee Chair, works to bridge the digital divide

  //else
  { id: 2058, name: "Adrian Kovacs" }, // 36, University lecturer in economics, advises on local economy
  { id: 2059, name: "Camille Laurent" }, // 41, Environmental consultant, leads sustainability workshops
  { id: 2060, name: "Tobias Hoffmann" }, // 30, Startup founder, mentors young entrepreneurs
  { id: 2061, name: "Elisa Moretti" }, // 39, Art gallery curator, promotes local artists
  { id: 2062, name: "Magnus Olsen" }, // 47, High school science teacher, organizes science fairs
  { id: 2063, name: "Sofia Garcia" }, // 28, Human rights lawyer, advocates for marginalized groups
  { id: 2064, name: "Florian Weber" }, // 35, Renewable energy engineer, consults on town's energy policy
  { id: 2065, name: "Elin Andersson" }, // 43, Marketing manager, promotes local tourism
  { id: 2066, name: "Giovanni Rossi" }, // 50, Accountant, offers financial literacy workshops
  { id: 2067, name: "Amelia Nowak" }, // 31, Freelance writer, documents local stories and traditions
  { id: 2068, name: "Lukas Peeters" }, // 37, IT consultant, improves town's digital infrastructure
  { id: 2069, name: "Olivia Peeters" }, // 34, Psychologist, specializes in youth counseling
  { id: 2070, name: "Andreas Papadopoulos" }, // 46, Chef, organizes community cooking classes
  { id: 2071, name: "Clara Bergmann" }, // 29, Environmental scientist, monitors local ecosystem
  { id: 2072, name: "Henri Lefebvre" }, // 55, Lawyer, provides legal aid to community members
  { id: 2073, name: "Emilia Kowalski" }, // 33, Primary school teacher, leads after-school programs
  { id: 2074, name: "Mateo Santos" }, // 40, Social worker, runs programs for the elderly
  { id: 2075, name: "Astrid Eriksen" }, // 36, Pediatrician, volunteers at community health clinics
  { id: 2076, name: "Felix Müller" }, // 27, Computer science graduate, developing apps for local businesses
  { id: 2077, name: "Jamal Ahmed" }, // 42, Mathematics professor, tutors underprivileged students
  { id: 2078, name: "Emma Dubois" }, // 30, French literature teacher, organizes community theater
  { id: 2079, name: "Liam O'Connor" }, // 38, Robotics engineer, leads STEM workshops for kids
  { id: 2080, name: "Sophia Chen" }, // 44, Data scientist, analyzes town demographics for planning
  { id: 2081, name: "Viktor Pettersson" }, // 39, Civil engineer, involved in town's infrastructure projects
  { id: 2082, name: "Nora Lindholm" }, // 32, Pediatric nurse, organizes health camps for children
  { id: 2083, name: "Adrian Kovacs" }, // 48, Economics professor, advises on local economic policies
  { id: 2084, name: "Camille Laurent" }, // 35, Environmental consultant, leads green initiatives
  { id: 2085, name: "Tobias Hoffmann" }, // 41, Tech entrepreneur, mentors local startups
  { id: 2086, name: "Elisa Moretti" }, // 29, Art curator, organizes exhibitions of local artists
  { id: 2087, name: "Magnus Olsen" }, // 53, High school principal, implements innovative education programs
  { id: 2088, name: "Yara Al-Rashid" }, // 37, Pharmacist, runs health awareness campaigns
  { id: 2089, name: "Florian Weber" }, // 45, Solar energy specialist, consults on renewable energy projects
]
export const processes: Process[] = [
  {
    id: 2001,
    new: true,
    public: true,
    active: true,
    createdAt: { time: "09:00", distance: 0 },
    dueAt: { time: "23:59", distance: 30 },
    creator: 2090,
    description: "2025 Participatory Budgeting Challenge",
    content: "Dear citizens of Rochefort, we are excited to announce our 2025 Participatory Budgeting Challenge! This year, we have allocated 200,000€ for community projects proposed and chosen by you. This is your chance to directly influence how our city's budget is spent to improve our community. We encourage all residents to participate in this democratic process.",
    modules: [
      {
        id: 20011,
        type: "Ideation",
        dueAt: { time: "23:59", distance: 10 },
        description: "Project Ideas Submission",
        content: "In this first phase, we invite all Rochefort residents to submit their ideas for community improvement projects. Think about what our city needs most - it could be anything from park renovations to new community programs. Be creative, but also consider the feasibility of your proposal. Each idea should aim to benefit a significant portion of our community.",
        options: [
          {
            id: 200111,
            createdAt: { time: "10:15", distance: 0 },
            createdBy: 2005,
            new: false,
            supportedBy: [2064, 2071, 2094],
            rank: 0,
            description: "Community Solar Panel Installation",
            content: "Install solar panels on public buildings to reduce energy costs and promote sustainability.",
            comments: [
              {
                id: 2001111,
                createdAt: { time: "11:30", distance: 0 },
                createdBy: 2064,
                new: false,
                supportedBy: [2005, 2071],
                comments: [],
                content: "This could significantly reduce our city's carbon footprint and save on energy costs in the long run.",
              },
            ],
          },
          {
            id: 200112,
            createdAt: { time: "13:45", distance: 0 },
            createdBy: 2010,
            new: false,
            supportedBy: [2003, 2095, 2073],
            rank: 0,
            description: "Youth Center Renovation and Expansion",
            content: "Renovate and expand the existing youth center to provide more space and resources for after-school programs.",
            comments: [
              {
                id: 2001121,
                createdAt: { time: "14:20", distance: 0 },
                createdBy: 2073,
                new: false,
                supportedBy: [2010, 2003],
                comments: [],
                content: "This would give our young people a safe and productive place to spend their time after school.",
              },
            ],
          },
          {
            id: 200113,
            createdAt: { time: "16:00", distance: 0 },
            createdBy: 2037,
            new: false,
            supportedBy: [2105, 2063, 2072],
            rank: 0,
            description: "Affordable Housing Initiative",
            content: "Develop a small-scale affordable housing project to address the growing housing needs in our community.",
            comments: [
              {
                id: 2001131,
                createdAt: { time: "16:45", distance: 0 },
                createdBy: 2063,
                new: false,
                supportedBy: [2037, 2105],
                comments: [],
                content: "This is crucial for ensuring that Rochefort remains accessible to all income levels.",
              },
            ],
          },
          {
            id: 200114,
            createdAt: { time: "17:30", distance: 0 },
            createdBy: 2062,
            new: false,
            supportedBy: [2077, 2079, 2085],
            rank: 0,
            description: "STEM Education Enhancement Program",
            content: "Implement a comprehensive STEM education program in local schools, including equipment upgrades and teacher training.",
            comments: [
              {
                id: 2001141,
                createdAt: { time: "18:15", distance: 0 },
                createdBy: 2079,
                new: false,
                supportedBy: [2062, 2077],
                comments: [],
                content: "This would greatly enhance our children's future prospects and potentially attract tech companies to our area.",
              },
            ],
          },
          {
            id: 200115,
            createdAt: { time: "19:00", distance: 0 },
            createdBy: 2070,
            new: false,
            supportedBy: [2052, 2066, 2089],
            rank: 0,
            description: "Community Garden and Farmers Market",
            content: "Establish a community garden and weekly farmers market to promote local food production and healthy eating.",
            comments: [
              {
                id: 2001151,
                createdAt: { time: "19:45", distance: 0 },
                createdBy: 2052,
                new: false,
                supportedBy: [2070, 2066],
                comments: [],
                content: "This would not only provide fresh, local produce but also create a wonderful community gathering space.",
              },
            ],
          },
        ],
      },
      {
        id: 20012,
        type: "Estimate",
        dueAt: { time: "23:59", distance: 15 },
        description: "Project Cost Analysis",
        content: "We need to analyze the potential costs of each proposed project. Please provide your best estimate for each project, considering materials, labor, and any ongoing maintenance costs. Your expertise and local knowledge are crucial for accurate projections.",
        options: [
          {
            id: 200121,
            content: "Analyze costs for solar panel installation on public buildings",
            rank: 0,
            new: false,
            description: "Community Solar Panel Installation",
            comments: [
              {
                id: 2001211,
                createdAt: { time: "10:00", distance: 11 },
                createdBy: 2064,
                new: false,
                supportedBy: [2005, 2094],
                comments: [],
                content: "After consulting with local suppliers, I estimate this project would cost approximately 85,000€. This includes high-efficiency panels, installation, electrical upgrades for three public buildings, and a 5-year maintenance plan.",
              },
            ],
            createdAt: { time: "09:00", distance: 11 },
            createdBy: 2090,
            supportedBy: [],
          },
          {
            id: 200122,
            description: "Youth Center Renovation and Expansion",
            rank: 0,
            new: false,
            content: "Evaluate costs for renovating and expanding the youth center",
            comments: [
              {
                id: 2001221,
                createdAt: { time: "10:15", distance: 11 },
                createdBy: 2010,
                new: false,
                supportedBy: [2003, 2095],
                comments: [],
                content: "Based on recent similar projects, I estimate this would cost around 130,000€. This covers renovation of existing spaces, a 30% expansion, new equipment, improved accessibility features, and some funds for initial programming.",
              },
            ],
            createdAt: { time: "09:15", distance: 11 },
            createdBy: 2090,
            supportedBy: [],
          },
          {
            id: 200123,
            description: "Affordable Housing Initiative",
            rank: 0,
            new: false,
            content: "Assess costs for a small-scale affordable housing project",
            comments: [
              {
                id: 2001231,
                createdAt: { time: "10:30", distance: 11 },
                createdBy: 2037,
                new: false,
                supportedBy: [2105, 2063],
                comments: [],
                content: "After consulting with local developers and considering current construction costs, I estimate this project would require about 195,000€. This would cover the development of a small plot with 3-4 affordable housing units, including land acquisition, basic infrastructure, and construction costs.",
              },
            ],
            createdAt: { time: "09:30", distance: 11 },
            createdBy: 2090,
            supportedBy: [],
          },
          {
            id: 200124,
            description: "STEM Education Enhancement Program",
            rank: 0,
            new: false,
            content: "Calculate costs for implementing a STEM education program",
            comments: [
              {
                id: 2001241,
                createdAt: { time: "10:45", distance: 11 },
                createdBy: 2062,
                new: false,
                supportedBy: [2077, 2079],
                comments: [],
                content: "After detailed analysis, I estimate this program would cost around 95,000€. This includes equipment upgrades for multiple schools, comprehensive teacher training programs, curriculum development, and a small fund for ongoing STEM events and competitions.",
              },
            ],
            createdAt: { time: "09:45", distance: 11 },
            createdBy: 2090,
            supportedBy: [],
          },
          {
            id: 200125,
            description: "Community Garden and Farmers Market",
            rank: 0,
            new: false,
            content: "Estimate costs for establishing a community garden and farmers market",
            comments: [
              {
                id: 2001251,
                createdAt: { time: "11:00", distance: 11 },
                createdBy: 2070,
                new: false,
                supportedBy: [2052, 2066],
                comments: [],
                content: "After researching similar projects and local costs, I estimate this project would cost approximately 55,000€. This includes land preparation, basic infrastructure for the garden (water system, tool shed), initial planting materials, and setup costs for the farmers market including portable stalls and signage.",
              },
            ],
            createdAt: { time: "10:00", distance: 11 },
            createdBy: 2090,
            supportedBy: [],
          },
        ],
      },
      {
        id: 20013,
        type: "Prioritize",
        dueAt: { time: "23:59", distance: 25 },
        description: "Project Prioritization",
        content: "Now that we have the community-sourced budget estimates, it's time to prioritize the projects. Please rank the following projects based on what you believe is most important for our community. Remember, we have a total budget of 200,000€, so we may not be able to fund all projects this year.",
        options: [
          {
            id: 0,
            content: "",
            rank: 17059,
            supportedBy: [],
            new: false,
            description: "Install solar panels on public buildings to reduce energy costs and promote sustainability.",
            comments: [],
            createdAt: { time: "09:00", distance: 16 },
            createdBy: 2090,
          },
          {
            id: 200131,
            content: "Community Solar Panel Installation (Estimated: 80,000€)",
            rank: 87,
            supportedBy: [],
            new: false,
            description: "Install solar panels on public buildings to reduce energy costs and promote sustainability.",
            comments: [],
            createdAt: { time: "09:00", distance: 16 },
            createdBy: 2090,
          },
          {
            id: 200132,
            content: "Youth Center Renovation and Expansion (Estimated: 120,000€)",
            rank: 93,
            supportedBy: [],
            new: false,
            description: "Renovate and expand the existing youth center to provide more space and resources for after-school programs.",
            comments: [],
            createdAt: { time: "09:15", distance: 16 },
            createdBy: 2090,
          },
          {
            id: 200133,
            content: "Affordable Housing Initiative (Estimated: 180,000€)",
            rank: 86,
            supportedBy: [],
            new: false,
            description: "Develop a small-scale affordable housing project to address the growing housing needs in our community.",
            comments: [],
            createdAt: { time: "09:30", distance: 16 },
            createdBy: 2090,
          },
          {
            id: 200134,
            content: "STEM Education Enhancement Program (Estimated: 90,000€)",
            rank: 47,
            supportedBy: [],
            new: false,
            description: "Implement a comprehensive STEM education program in local schools, including equipment upgrades and teacher training.",
            comments: [],
            createdAt: { time: "09:45", distance: 16 },
            createdBy: 2090,
          },
          {
            id: 200135,
            content: "Community Garden and Farmers Market (Estimated: 50,000€)",
            rank: 32,
            supportedBy: [],
            new: false,
            description: "Establish a community garden and weekly farmers market to promote local food production and healthy eating.",
            comments: [],
            createdAt: { time: "10:00", distance: 16 },
            createdBy: 2090,
          },
        ],
      },
      {
        id: 20014,
        type: "Announcement",
        dueAt: { time: "12:00", distance: 30 },
        description: "Final Project Selection Announcement",
        content: "Dear citizens of Rochefort, thank you for your active participation in our 2025 Participatory Budgeting Challenge. After careful consideration of your priorities and our available budget, we are pleased to announce the selected projects for implementation:",
        options: [
          {
            id: 200141,
            content: "Dear citizens of Rochefort, thank you for your active participation in our 2025 Participatory Budgeting Challenge. After careful consideration of your priorities and our available budget, we are pleased to announce the selected projects for implementation: 1. Community Solar Panel Installation (80,000€). Youth Center Renovation and Expansion (120,000€) Total Budget Allocated: 200,000€ We believe these projects will have a significant positive impact on our community. The solar panel installation will help us move towards a more sustainable future, while the youth center renovation will provide valuable resources for our younger citizens. Additionally, we're pleased to announce that the Community Garden and Farmers Market project (50,000€) will be partially funded through a generous donation from a local business. This project will begin implementation alongside the two main selected projects. For the projects that werent selected this year: The STEM Education Enhancement Program: We will be seeking alternative funding sources and partnerships with local tech companies. The Affordable Housing Initiative: We are committed to addressing this crucial issue and will be forming a task force to explore other funding options and potential partnerships with regional housing authorities. We thank everyone for their input and look forward to seeing these projects come to life. Updates on the implementation process will be shared regularly. Your continued engagement is crucial for the success of these initiatives and the betterment of our community.",
            rank: 0,
            new: false,
            description: "Final Project Selection Announcement",
            comments: [{
              id: 2001411,
              createdAt: { time: "10:00", distance: 30 },
              createdBy: 2090,
              new: false,
              supportedBy: [],
              comments: [],
              content: "1. Community Solar Panel Installation (80,000€)\n2. Youth Center Renovation and Expansion (120,000€)\n\nTotal Budget Allocated: 200,000€\n\nWe believe these projects will have a significant positive impact on our community. The solar panel installation will help us move towards a more sustainable future, while the youth center renovation will provide valuable resources for our younger citizens.\n\nAdditionally, we're pleased to announce that the Community Garden and Farmers Market project (50,000€) will be partially funded through a generous donation from a local business. This project will begin implementation alongside the two main selected projects.\n\nFor the projects that weren't selected this year:\n- The STEM Education Enhancement Program: We will be seeking alternative funding sources and partnerships with local tech companies.\n- The Affordable Housing Initiative: We are committed to addressing this crucial issue and will be forming a task force to explore options for future implementation.\n\nThank you all for your participation and commitment to improving our community. We look forward to seeing these projects come to life!",
            },
              {
                id: 2001412,
                createdAt: { time: "11:30", distance: 30 },
                createdBy: 2005,
                new: false,
                supportedBy: [2064, 2071],
                comments: [],
                content: "I'm thrilled to see the solar panel project selected! This is a big step towards a more sustainable Rochefort. Can't wait to see the positive impact on our energy costs and carbon footprint.",
              },
              {
                id: 2001413,
                createdAt: { time: "12:15", distance: 30 },
                createdBy: 2010,
                new: false,
                supportedBy: [2003, 2073],
                comments: [],
                content: "The youth center renovation is going to make such a difference for our young people! It's great to see the city investing in the next generation.",
              },
              {
                id: 2001414,
                createdAt: { time: "13:00", distance: 30 },
                createdBy: 2037,
                new: false,
                supportedBy: [2063],
                comments: [],
                content: "While I'm disappointed that the affordable housing initiative wasn't selected, I appreciate the commitment to forming a task force. I hope we can find a way to address this crucial issue soon.",
              },
              {
                id: 2001415,
                createdAt: { time: "13:45", distance: 30 },
                createdBy: 2070,
                new: false,
                supportedBy: [2052, 2066],
                comments: [],
                content: "I'm pleasantly surprised that the community garden and farmers market project will still go ahead thanks to the local business donation. This will be a great addition to our community!",
              },
              {
                id: 2001416,
                createdAt: { time: "14:30", distance: 30 },
                createdBy: 2062,
                new: false,
                supportedBy: [2077],
                comments: [],
                content: "While it's unfortunate that the STEM program wasn't selected, I'm glad to hear that alternative funding sources are being explored. Our students' education is crucial for the future of Rochefort.",
              },
            ],
            createdAt: { time: "09:00", distance: 30 },
            createdBy: 2090,
            supportedBy: [],
          },
        ],
      },
    ],
  },

]