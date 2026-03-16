/**
 * seed.ts — Populates the database with demo data.
 *
 * Run:  npx tsx prisma/seed.ts
 */

import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const tursoUrl = process.env.TURSO_DATABASE_URL;
const adapter = tursoUrl
  ? new PrismaLibSql({ url: tursoUrl, authToken: process.env.TURSO_AUTH_TOKEN })
  : new PrismaBetterSqlite3({ url: "file:./dev.db" });

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.reaction.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.eventInvitation.deleteMany();
  await prisma.chatParticipant.deleteMany();
  await prisma.session.deleteMany();
  await prisma.process.deleteMany();
  await prisma.document.deleteMany();
  await prisma.task.deleteMany();
  await prisma.event.deleteMany();
  await prisma.message.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.group.deleteMany();
  await prisma.user.deleteMany();

  // ═══════════════════════════════════════════
  // Users — Demo users have isDemo: true, no password
  // Descriptions are first-person bios
  // ═══════════════════════════════════════════

  const alex = await prisma.user.create({
    data: {
      username: "alex", name: "Alex Rivera", nickname: "alex",
      email: "alex@demo.local", isDemo: true,
      description: "I'm a software engineer interested in decentralized infrastructure and community tools. I help manage our housing co-op's tech setup and coach youth basketball on weekends.",
    },
  });

  const sam = await prisma.user.create({
    data: {
      username: "sam", name: "Sam Chen", nickname: "sam",
      email: "sam@demo.local", isDemo: true,
      description: "Urban planner by day, community gardener by evening. I believe in building stronger neighborhoods through shared spaces and open dialogue.",
    },
  });

  const robin = await prisma.user.create({
    data: {
      username: "robin", name: "Robin Moreau", nickname: "robin",
      email: "robin@demo.local", isDemo: true,
      description: "I'm a teacher and council member in Rochefort. Passionate about civic engagement and making local government more accessible to everyone, especially young people.",
    },
  });

  const nina = await prisma.user.create({
    data: {
      username: "nina", name: "Nina Petrova", nickname: "nina",
      email: "nina@demo.local", isDemo: true,
      description: "Graphic designer and yoga instructor. I organize wellness events for our sports club and help with visual design across all our community projects.",
    },
  });

  const max = await prisma.user.create({
    data: {
      username: "max", name: "Max Berger", nickname: "max",
      email: "max@demo.local", isDemo: true,
      description: "Retired firefighter, now volunteering full-time. I maintain our community garden and sit on the building management committee. Always happy to help neighbors.",
    },
  });

  const leila = await prisma.user.create({
    data: {
      username: "leila", name: "Leila Dubois", nickname: "leila",
      email: "leila@demo.local", isDemo: true,
      description: "High school student and youth parliament member. I want to make sure young voices are heard in our town's decisions. Also captain of the junior basketball team.",
    },
  });

  const jonas = await prisma.user.create({
    data: {
      username: "jonas", name: "Jonas Kim", nickname: "jonas",
      email: "jonas@demo.local", isDemo: true,
      description: "Accountant and treasurer for multiple community organizations. I handle the finances so everyone else can focus on what they do best.",
    },
  });

  const emma = await prisma.user.create({
    data: {
      username: "emma", name: "Emma Larsson", nickname: "emma",
      email: "emma@demo.local", isDemo: true,
      description: "Environmental scientist working on urban sustainability. I lead our composting initiative and help organize neighborhood clean-up events.",
    },
  });

  // ═══════════════════════════════════════════
  // Top-Level Groups (= Servers / Communities)
  // ═══════════════════════════════════════════

  const marinQuarter = await prisma.group.create({
    data: {
      slug: "marin-quarter", name: "Marin Quarter", color: "#337835", icon: "Building2",
      subtitle: "Housing cooperative in Berlin — 48 units, shared spaces, community-driven management.",
    },
  });

  const sportclub = await prisma.group.create({
    data: {
      slug: "sportclub", name: "Sportclub", color: "#704c93", icon: "Dumbbell",
      subtitle: "Multi-sport club in Hamburg — basketball, running, yoga, and youth programs.",
    },
  });

  const rochefort = await prisma.group.create({
    data: {
      slug: "rochefort", name: "Rochefort", color: "#d63f3f", icon: "Landmark",
      subtitle: "Small town in France — civic participation platform for 3,200 residents.",
    },
  });

  // ═══════════════════════════════════════════
  // Subgroups
  // ═══════════════════════════════════════════

  // Marin Quarter subgroups
  const mqBoardMgmt = await prisma.group.create({
    data: { slug: "mq-board", name: "Board & Management", subtitle: "Building management, budget, maintenance decisions", color: "#337835", icon: "Shield", parentId: marinQuarter.id, visibility: "private" },
  });
  const mqGarden = await prisma.group.create({
    data: { slug: "mq-garden", name: "Community Garden", subtitle: "Shared garden plots, composting, seasonal planning", color: "#337835", icon: "Flower2", parentId: marinQuarter.id, visibility: "public" },
  });
  const mqEvents = await prisma.group.create({
    data: { slug: "mq-events", name: "Events & Social", subtitle: "Neighborhood gatherings, movie nights, welcome committee", color: "#337835", icon: "PartyPopper", parentId: marinQuarter.id, visibility: "public" },
  });

  // Sportclub subgroups
  const scBasketball = await prisma.group.create({
    data: { slug: "sc-basketball", name: "Basketball", subtitle: "Adult league, training sessions, tournaments", color: "#704c93", icon: "Trophy", parentId: sportclub.id, visibility: "public" },
  });
  const scYouth = await prisma.group.create({
    data: { slug: "sc-youth", name: "Youth Program", subtitle: "U18 training, tournaments, mentorship", color: "#704c93", icon: "Users", parentId: sportclub.id, visibility: "public" },
  });
  const scBoard = await prisma.group.create({
    data: { slug: "sc-board", name: "Board", subtitle: "Club leadership, finances, strategy", color: "#704c93", icon: "Shield", parentId: sportclub.id, visibility: "private" },
  });

  // Rochefort subgroups
  const rcCouncil = await prisma.group.create({
    data: { slug: "rc-council", name: "Town Council", subtitle: "Municipal council meetings, public policy", color: "#d63f3f", icon: "Gavel", parentId: rochefort.id, visibility: "public" },
  });
  const rcFireDept = await prisma.group.create({
    data: { slug: "rc-fire", name: "Volunteer Fire Dept.", subtitle: "Emergency response, training, equipment", color: "#d63f3f", icon: "Flame", parentId: rochefort.id, visibility: "private" },
  });
  const rcYouthParl = await prisma.group.create({
    data: { slug: "rc-youth-parliament", name: "Youth Parliament", subtitle: "Student-led civic forum for ages 14-25", color: "#d63f3f", icon: "GraduationCap", parentId: rochefort.id, visibility: "public" },
  });

  // ═══════════════════════════════════════════
  // Templates
  // ═══════════════════════════════════════════

  const tplSport = await prisma.group.create({
    data: { slug: "template-sports-club", name: "Sports Club", subtitle: "Template", color: "#704c93", icon: "Trophy", isTemplate: true, templateDescription: "Complete sports club with training plans, tournaments, youth program, and board." },
  });
  await prisma.group.createMany({ data: [
    { slug: "tpl-sc-youth", name: "Youth Program", subtitle: "U18", color: "#704c93", icon: "Users", parentId: tplSport.id, visibility: "public", isTemplate: true },
    { slug: "tpl-sc-board", name: "Board", subtitle: "Club leadership", color: "#704c93", icon: "Shield", parentId: tplSport.id, visibility: "private", isTemplate: true },
  ]});

  const tplHousing = await prisma.group.create({
    data: { slug: "template-housing-coop", name: "Housing Cooperative", subtitle: "Template", color: "#337835", icon: "Building2", isTemplate: true, templateDescription: "Building management with house rules, budgeting, garden committee." },
  });
  await prisma.group.createMany({ data: [
    { slug: "tpl-hc-board", name: "Board", subtitle: "Management", color: "#337835", icon: "Shield", parentId: tplHousing.id, visibility: "private", isTemplate: true },
    { slug: "tpl-hc-garden", name: "Garden", subtitle: "Community garden", color: "#337835", icon: "Flower2", parentId: tplHousing.id, visibility: "public", isTemplate: true },
  ]});

  const tplTown = await prisma.group.create({
    data: { slug: "template-municipality", name: "Municipality", subtitle: "Template", color: "#d63f3f", icon: "Landmark", isTemplate: true, templateDescription: "Local government with council, civic participation, volunteer services." },
  });
  await prisma.group.createMany({ data: [
    { slug: "tpl-mun-council", name: "Council", subtitle: "Administration", color: "#d63f3f", icon: "Gavel", parentId: tplTown.id, visibility: "public", isTemplate: true },
    { slug: "tpl-mun-fire", name: "Fire Department", subtitle: "Emergency", color: "#d63f3f", icon: "Flame", parentId: tplTown.id, visibility: "private", isTemplate: true },
  ]});

  // ═══════════════════════════════════════════
  // Memberships
  // ═══════════════════════════════════════════

  // Marin Quarter — Alex (admin), Sam, Nina, Max, Emma, Jonas
  for (const u of [{ u: alex, r: "admin" }, { u: sam, r: "member" }, { u: nina, r: "member" }, { u: max, r: "member" }, { u: emma, r: "member" }, { u: jonas, r: "member" }]) {
    await prisma.membership.create({ data: { userId: u.u.id, groupId: marinQuarter.id, role: u.r } });
  }
  for (const u of [alex, sam, max]) await prisma.membership.create({ data: { userId: u.id, groupId: mqBoardMgmt.id, role: u.id === alex.id ? "admin" : "member" } });
  for (const u of [sam, emma, nina, max]) await prisma.membership.create({ data: { userId: u.id, groupId: mqGarden.id, role: u.id === sam.id ? "admin" : "member" } });
  for (const u of [nina, sam, alex, emma]) await prisma.membership.create({ data: { userId: u.id, groupId: mqEvents.id, role: u.id === nina.id ? "admin" : "member" } });

  // Sportclub — Alex (admin), Sam, Nina, Leila, Jonas, Robin
  for (const u of [{ u: alex, r: "admin" }, { u: sam, r: "member" }, { u: nina, r: "member" }, { u: leila, r: "member" }, { u: jonas, r: "member" }, { u: robin, r: "member" }]) {
    await prisma.membership.create({ data: { userId: u.u.id, groupId: sportclub.id, role: u.r } });
  }
  for (const u of [alex, sam, leila, nina]) await prisma.membership.create({ data: { userId: u.id, groupId: scBasketball.id, role: u.id === alex.id ? "admin" : "member" } });
  for (const u of [leila, alex, robin]) await prisma.membership.create({ data: { userId: u.id, groupId: scYouth.id, role: u.id === alex.id ? "admin" : "member" } });
  for (const u of [alex, jonas]) await prisma.membership.create({ data: { userId: u.id, groupId: scBoard.id, role: u.id === alex.id ? "admin" : "member" } });

  // Rochefort — Robin (admin), Leila, Max, Alex, Jonas
  for (const u of [{ u: robin, r: "admin" }, { u: leila, r: "member" }, { u: max, r: "member" }, { u: alex, r: "member" }, { u: jonas, r: "member" }]) {
    await prisma.membership.create({ data: { userId: u.u.id, groupId: rochefort.id, role: u.r } });
  }
  for (const u of [robin, alex, jonas]) await prisma.membership.create({ data: { userId: u.id, groupId: rcCouncil.id, role: u.id === robin.id ? "admin" : "member" } });
  for (const u of [max, robin]) await prisma.membership.create({ data: { userId: u.id, groupId: rcFireDept.id, role: u.id === max.id ? "admin" : "member" } });
  for (const u of [leila, robin]) await prisma.membership.create({ data: { userId: u.id, groupId: rcYouthParl.id, role: u.id === leila.id ? "admin" : "member" } });

  // ═══════════════════════════════════════════
  // Events
  // ═══════════════════════════════════════════

  const today = new Date();
  const d = (offset: number, h = 10, m = 0) => { const d = new Date(today); d.setDate(d.getDate() + offset); d.setHours(h, m, 0, 0); return d; };

  await prisma.event.createMany({ data: [
    // Today
    { title: "Morning Run", description: "Meet at the north park entrance. All levels welcome.", location: "Park entrance, Marin Quarter", startsAt: d(0, 7, 0), groupId: marinQuarter.id, creatorId: sam.id },
    { title: "Basketball Practice", description: "Regular Tuesday practice. Bring water and indoor shoes.", location: "Sportclub main gym", startsAt: d(0, 18, 30), groupId: scBasketball.id, creatorId: alex.id },
    { title: "Youth Parliament Session", description: "Discussing the school renovation proposal.", location: "Town Hall, Room B", startsAt: d(0, 16, 0), groupId: rcYouthParl.id, creatorId: leila.id },
    // Tomorrow
    { title: "Garden Work Day", description: "Spring planting and compost turning. Tools provided.", location: "Community garden, west side", startsAt: d(1, 10, 0), groupId: mqGarden.id, creatorId: emma.id },
    { title: "Neighborhood Welcome Drinks", description: "Meet the new residents who moved in this month.", location: "Common room, ground floor", startsAt: d(1, 19, 0), groupId: mqEvents.id, creatorId: nina.id },
    // This week
    { title: "Board Meeting", description: "Q2 budget review, maintenance schedule, new resident applications.", location: "Meeting room 3A", startsAt: d(3, 19, 0), groupId: mqBoardMgmt.id, creatorId: alex.id },
    { title: "Youth Tournament Prep", description: "Final practice before the regional tournament.", location: "Sportclub gym", startsAt: d(4, 16, 0), groupId: scYouth.id, creatorId: alex.id },
    { title: "Fire Department Training", description: "Building fire simulation, all members required.", location: "Old town square", startsAt: d(4, 9, 0), groupId: rcFireDept.id, creatorId: max.id },
    // Next week
    { title: "Town Council Meeting", description: "Public session: street renovation, park budget, citizen proposals.", location: "Hotel de Ville, Grande Salle", startsAt: d(7, 19, 0), groupId: rcCouncil.id, creatorId: robin.id },
    { title: "Yoga in the Park", description: "Relaxation session for all club members. Mats provided.", location: "Meadow behind clubhouse", startsAt: d(8, 8, 0), groupId: sportclub.id, creatorId: nina.id },
    { title: "Annual General Meeting", description: "Year in review, board elections, member proposals.", location: "Sportclub conference room", startsAt: d(10, 18, 0), groupId: scBoard.id, creatorId: alex.id },
    // In 2 weeks
    { title: "Regional Basketball Tournament", description: "U18 indoor tournament against neighboring clubs. Spectators welcome!", location: "Regional Sports Hall", startsAt: d(14, 9, 0), groupId: scYouth.id, creatorId: alex.id },
    { title: "Community BBQ", description: "Summer kickoff! Bring a dish to share. Grill and drinks provided.", location: "Courtyard, Marin Quarter", startsAt: d(14, 17, 0), groupId: mqEvents.id, creatorId: nina.id },
    { title: "Composting Workshop", description: "Learn how to set up and maintain a compost bin.", location: "Community garden shed", startsAt: d(15, 14, 0), groupId: mqGarden.id, creatorId: emma.id },
  ]});

  // ═══════════════════════════════════════════
  // Tasks
  // ═══════════════════════════════════════════

  await prisma.task.createMany({ data: [
    { title: "Prepare Q2 budget report", description: "Consolidate expenses from all subgroups", groupId: mqBoardMgmt.id, creatorId: alex.id, assigneeId: jonas.id, dueAt: d(5) },
    { title: "Fix hallway light on 2nd floor", groupId: marinQuarter.id, creatorId: sam.id, assigneeId: max.id, dueAt: d(2) },
    { title: "Order new compost bins", description: "3x 400L bins from the garden center", groupId: mqGarden.id, creatorId: emma.id, assigneeId: emma.id, dueAt: d(7) },
    { title: "Design flyer for community BBQ", groupId: mqEvents.id, creatorId: nina.id, assigneeId: nina.id, dueAt: d(10) },
    { title: "Book gym for tournament prep", groupId: scBasketball.id, creatorId: alex.id, assigneeId: alex.id, dueAt: d(3) },
    { title: "Order new jerseys for U18 team", description: "Size chart collected, need 15 jerseys", groupId: scYouth.id, creatorId: alex.id, assigneeId: leila.id, dueAt: d(8) },
    { title: "Submit annual financial report", groupId: scBoard.id, creatorId: alex.id, assigneeId: jonas.id, dueAt: d(12) },
    { title: "Update training schedule for summer", groupId: sportclub.id, creatorId: alex.id, assigneeId: alex.id, dueAt: d(6) },
    { title: "Draft street renovation proposal", description: "Include cost estimates and timeline", groupId: rcCouncil.id, creatorId: robin.id, assigneeId: robin.id, dueAt: d(5) },
    { title: "Inspect fire truck equipment", groupId: rcFireDept.id, creatorId: max.id, assigneeId: max.id, dueAt: d(4) },
    { title: "Prepare school renovation presentation", description: "For the next Youth Parliament session", groupId: rcYouthParl.id, creatorId: leila.id, assigneeId: leila.id, dueAt: d(3) },
    { title: "Compile citizen feedback on park budget", groupId: rochefort.id, creatorId: robin.id, assigneeId: jonas.id, dueAt: d(6) },
    // Some done tasks
    { title: "Set up garden irrigation", groupId: mqGarden.id, creatorId: sam.id, assigneeId: max.id, done: true },
    { title: "Welcome packet for new residents", groupId: mqEvents.id, creatorId: nina.id, assigneeId: nina.id, done: true },
    { title: "Register for regional tournament", groupId: scYouth.id, creatorId: alex.id, assigneeId: alex.id, done: true },
  ]});

  // ═══════════════════════════════════════════
  // Documents (group info and rules)
  // ═══════════════════════════════════════════

  await prisma.document.createMany({ data: [
    { title: "House Rules", content: "1. Quiet hours: 10 PM – 7 AM\n2. Pets allowed with board approval\n3. Common areas must be cleaned after use\n4. Parking spots are assigned — no swapping without approval\n5. Guests may stay up to 14 consecutive days", groupId: marinQuarter.id, authorId: alex.id },
    { title: "Board Guidelines", content: "The board meets monthly. Decisions require simple majority. Emergency sessions can be called by any two board members. Minutes are shared with all residents within 48 hours.", groupId: mqBoardMgmt.id, authorId: alex.id },
    { title: "Garden Plot Rules", content: "1. Mark your plot with the provided stakes\n2. Return shared tools to the shed after use\n3. Use the community compost — no plastic\n4. Water conservation: use rain barrels first\n5. Harvesting from others' plots requires permission", groupId: mqGarden.id, authorId: emma.id },
    { title: "Club Bylaws", content: "§1 The club's purpose is promoting sports and community health.\n§2 Membership is open to all.\n§3 Annual membership fee is decided at the AGM.\n§4 The board consists of Chair, Treasurer, and Secretary.\n§5 Board elections are held annually.", groupId: sportclub.id, authorId: alex.id },
    { title: "Youth Program Guidelines", content: "1. Training: Tue & Thu 4–6 PM\n2. Tournament travel is subsidized\n3. Parent meeting once per quarter\n4. Code of conduct must be signed by parent/guardian\n5. Minimum attendance: 60% of sessions", groupId: scYouth.id, authorId: alex.id },
    { title: "Council Rules of Procedure", content: "Art. 1 — The council meets once per month.\nArt. 2 — Sessions are public.\nArt. 3 — The mayor chairs all sessions.\nArt. 4 — Citizens may speak during the public comment period.\nArt. 5 — Votes require simple majority of present members.", groupId: rcCouncil.id, authorId: robin.id },
    { title: "Fire Department Operations Manual", content: "1. All members must complete basic training\n2. Equipment checks every 2 weeks\n3. Emergency callout response time: under 8 minutes\n4. Training exercises monthly\n5. Incident reports within 24 hours", groupId: rcFireDept.id, authorId: max.id },
    { title: "Youth Parliament Charter", content: "The Youth Parliament represents residents aged 14–25. We meet bi-weekly to discuss proposals that affect young people. Any member can submit a proposal. Approved proposals are forwarded to the Town Council.", groupId: rcYouthParl.id, authorId: leila.id },
  ]});

  // ═══════════════════════════════════════════
  // Processes
  // ═══════════════════════════════════════════

  await prisma.process.createMany({ data: [
    { title: "Install EV charging stations?", description: "Two residents requested electric vehicle charging in the parking garage. Estimated cost: €12,000.", status: "active", groupId: marinQuarter.id, authorId: alex.id },
    { title: "Expand community garden", description: "Add 8 new plots on the east side. Requires board approval for budget.", status: "active", groupId: mqGarden.id, authorId: sam.id },
    { title: "New indoor training facility?", description: "Proposal to rent a second gym for winter months.", status: "draft", groupId: sportclub.id, authorId: alex.id },
    { title: "Youth program scholarship fund", description: "Create a fund to subsidize membership for low-income families.", status: "active", groupId: scYouth.id, authorId: leila.id },
    { title: "Market square renovation", description: "Redesign plan for the central square. Public consultation phase.", status: "active", groupId: rochefort.id, authorId: robin.id },
    { title: "Purchase new fire ladder", description: "Current ladder truck is 15 years old. Replacement budget needed.", status: "active", groupId: rcFireDept.id, authorId: max.id },
  ]});

  // Template content
  await prisma.event.createMany({ data: [
    { title: "Example: Weekly Training", startsAt: d(7), groupId: tplSport.id, creatorId: alex.id },
    { title: "Example: Annual General Meeting", startsAt: d(14), groupId: tplSport.id, creatorId: alex.id },
  ]});
  await prisma.document.createMany({ data: [
    { title: "Example: Bylaws", content: "§1 Name & Location\n§2 Purpose\n§3 Membership\n§4 Governance\n§5 Fees", groupId: tplSport.id, authorId: alex.id },
    { title: "Example: House Rules", content: "1. Quiet hours\n2. Common areas\n3. Waste disposal", groupId: tplHousing.id, authorId: alex.id },
  ]});
  await prisma.process.createMany({ data: [
    { title: "Example: Membership fee increase", description: "Should the annual fee be adjusted?", groupId: tplSport.id, authorId: alex.id },
    { title: "Example: Bicycle path initiative", description: "Expanding the cycling network", groupId: tplTown.id, authorId: alex.id },
  ]});

  // ═══════════════════════════════════════════
  // Chats
  // ═══════════════════════════════════════════

  const chat1 = await prisma.chat.create({
    data: {
      type: "group", subject: "Summer Training Schedule",
      groupId: sportclub.id,
      participants: { create: [{ userId: alex.id }, { userId: sam.id }, { userId: nina.id }, { userId: leila.id }] },
    },
  });
  await prisma.message.createMany({ data: [
    { content: "Should we move Tuesday practice to 6:30 PM? It stays light longer now.", authorId: alex.id, groupId: sportclub.id, chatId: chat1.id, createdAt: new Date("2026-03-01T09:00:00") },
    { content: "Works for me! That's actually better for my schedule.", authorId: sam.id, groupId: sportclub.id, chatId: chat1.id, createdAt: new Date("2026-03-01T09:15:00") },
    { content: "I can do 6:30 on Tuesdays. What about Thursday?", authorId: nina.id, groupId: sportclub.id, chatId: chat1.id, createdAt: new Date("2026-03-01T09:30:00") },
    { content: "Thursday at 5 PM still works. The gym is booked until 7.", authorId: alex.id, groupId: sportclub.id, chatId: chat1.id, createdAt: new Date("2026-03-01T10:00:00") },
  ]});

  const chat2 = await prisma.chat.create({
    data: {
      type: "group", subject: "Spring Garden Planning",
      groupId: mqGarden.id,
      participants: { create: [{ userId: sam.id }, { userId: emma.id }, { userId: max.id }, { userId: nina.id }] },
    },
  });
  await prisma.message.createMany({ data: [
    { content: "Anyone up for preparing the beds this Saturday?", authorId: emma.id, groupId: mqGarden.id, chatId: chat2.id, createdAt: new Date("2026-03-05T14:00:00") },
    { content: "Count me in! I'll bring soil and seeds.", authorId: sam.id, groupId: mqGarden.id, chatId: chat2.id, createdAt: new Date("2026-03-05T14:30:00") },
    { content: "I can bring the wheelbarrow. What time?", authorId: max.id, groupId: mqGarden.id, chatId: chat2.id, createdAt: new Date("2026-03-05T14:45:00") },
    { content: "Let's start at 10 AM. I'll make coffee!", authorId: emma.id, groupId: mqGarden.id, chatId: chat2.id, createdAt: new Date("2026-03-05T15:00:00") },
  ]});

  const chat3 = await prisma.chat.create({
    data: {
      type: "group", subject: "Council Meeting Agenda",
      groupId: rcCouncil.id,
      participants: { create: [{ userId: robin.id }, { userId: alex.id }, { userId: jonas.id }] },
    },
  });
  await prisma.message.createMany({ data: [
    { content: "Draft agenda for next week: street renovation, park budget, citizen proposals. Anything to add?", authorId: robin.id, groupId: rcCouncil.id, chatId: chat3.id, createdAt: new Date("2026-03-06T10:00:00") },
    { content: "Can we add the EV charging station request from Marin Quarter?", authorId: alex.id, groupId: rcCouncil.id, chatId: chat3.id, createdAt: new Date("2026-03-06T10:30:00") },
    { content: "Good idea. I'll prepare the cost breakdown.", authorId: jonas.id, groupId: rcCouncil.id, chatId: chat3.id, createdAt: new Date("2026-03-06T11:00:00") },
  ]});

  const directChat1 = await prisma.chat.create({
    data: { type: "direct", subject: null, participants: { create: [{ userId: alex.id }, { userId: sam.id }] } },
  });
  await prisma.message.createMany({ data: [
    { content: "Hey Sam, do you have the documents for the board meeting?", authorId: alex.id, groupId: marinQuarter.id, chatId: directChat1.id, createdAt: new Date("2026-03-07T16:00:00") },
    { content: "Yes, I'll send them over by email tonight!", authorId: sam.id, groupId: marinQuarter.id, chatId: directChat1.id, createdAt: new Date("2026-03-07T16:05:00") },
    { content: "Thanks!", authorId: alex.id, groupId: marinQuarter.id, chatId: directChat1.id, createdAt: new Date("2026-03-07T16:06:00") },
  ]});

  const directChat2 = await prisma.chat.create({
    data: { type: "direct", subject: "Tournament logistics", participants: { create: [{ userId: alex.id }, { userId: leila.id }] } },
  });
  await prisma.message.createMany({ data: [
    { content: "Leila, can you confirm the team list for the regional tournament?", authorId: alex.id, groupId: sportclub.id, chatId: directChat2.id, createdAt: new Date("2026-03-08T11:00:00") },
    { content: "Sure! We have 12 confirmed players. I'll send the list today.", authorId: leila.id, groupId: sportclub.id, chatId: directChat2.id, createdAt: new Date("2026-03-08T11:30:00") },
  ]});

  const directChat3 = await prisma.chat.create({
    data: { type: "direct", subject: null, participants: { create: [{ userId: robin.id }, { userId: leila.id }] } },
  });
  await prisma.message.createMany({ data: [
    { content: "Robin, the school renovation proposal is ready for review.", authorId: leila.id, groupId: rochefort.id, chatId: directChat3.id, createdAt: new Date("2026-03-09T09:00:00") },
    { content: "Great work! I'll take a look this evening and give you feedback.", authorId: robin.id, groupId: rochefort.id, chatId: directChat3.id, createdAt: new Date("2026-03-09T09:30:00") },
  ]});

  // ═══════════════════════════════════════════
  const topLevel = await prisma.group.count({ where: { parentId: null, isTemplate: false } });
  const subs = await prisma.group.count({ where: { NOT: { parentId: null }, isTemplate: false } });
  const templates = await prisma.group.count({ where: { isTemplate: true, parentId: null } });
  const userCount = await prisma.user.count();

  console.log("Seed completed.");
  console.log(`  Servers:     ${topLevel}`);
  console.log(`  Subgroups:   ${subs}`);
  console.log(`  Templates:   ${templates}`);
  console.log(`  Users:       ${userCount}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
