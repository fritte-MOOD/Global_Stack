import { Group } from "./interfaces"

// Some hints when generating content:


/* These are the ID Spaces for ALL entities (messages, tasks, etc.):
   Each group and subgroup can use IDs within its designated range for any entity type.
   The same ID can be used for different entity types within a group/subgroup.
   Members always keep the same ID, even when they are in multiple groups or subgroups.
   Member's Names can be from any culture, but are mostly from european countries, and not so much from the US.
   Don't add ethnic background to the names.

1000-1999    All Groups of Park Club
   1000-1099    "Park Club"
   1100-1199    "Executive Committee"
   1200-1299    "2nd Senior Team"
   1300-1399    "Construction Committee"
   1400-1499    "Training Organization"

2000-2999    All Groups of Rochefort
   2000-2099    "Rochefort"
   2100-2199    "Parents of Rochefort"
   2200-2299    "Sports in Rochefort"

3000-3099    All Groups of Marin Quarter
   3000-3099    "Marin Quarter"
   3100-3199    "House 13"
   3200-3299    "Handcrafts"
   3300-3399    "Shared Dinner"
   3400-3499    rest of the Houses: "House 1", "House 2", "House 11", "House 12", "House 21", "House 22", "House 23"
   3500-3599    "Board"
   3600-3699    "Childcare"
   3700-3799    "Building"
   3800-3899    "Garden"

General:
-   Always keep the same order of typescript types as defined in "interfaces.ts" file.

Members:
-   IDs are unique within each group/subgroup, but can be reused across different entity types.
    For example, in "Park Club", ID 1001 could be both a message ID and a member ID.
-   Always include a member with Name: "You" and ID: 1 in each group where the user is a member. The character description is this: "32, Political activist: welcoming, collaborative and empathetic, but assertive, concerned and strict."
-   To use "Your" Name as saved in NameContext.tsx, type "USER" and it's going to be exchanged later. Never use USER inside number input such as "supportedBy" and "createdBy" fields.
-   Never mention, that "You" is a political activist. Always use they/them as You's pronoun.
-   Members always keep the same ID, even when they are in multiple groups or subgroups.
-   Member's Names can be from any culture, but are mostly from european countries, and not so much from the US. Don't add ethnic background to the members, just use different names.

example for formatting:
        { id: 1, name: "You" }, // Your character: 32, Political activist, welcoming, collaborative and empathetic, but assertive, concerned and strict.

        //House 1 (or other subgroup)
        { id: 3401, name: "Alex Chen" }, // 22, Engineering student, loves tinkering with electronics, organizes house parties
        { id: 3402, name: "Dmitri Volkov" }, // 24, Physics PhD student, quiet but brilliant, enjoys stargazing

        //House 2 (or other subgroup)
        { id: 3501, name: "Lisa Lee" }, // 23, Art student, loves painting, organizes art exhibitions
        { id: 3502, name: "Michael Baker" }, // 25, History PhD student, quiet but brilliant, enjoys reading historical books

amd so on...

Messages:
- Keep them realistic, can also be funny occasionally. Don't stay too polite all the time and don't write unnecessarily long messages. Some users can be polite, some a little more direct, some are practical. You can check the characteristics in the "Members" section of each group.
- Chats start somewhere in the last 12 months, so distance is 1-365.
- As direct reference to "You" use USER and the name will be exchanged later.

example for formatting:
        {new: false, at: { time: "09:00", distance: -30 }, sentBy: 3457, supportedBy: [3473],
        content: "Morning everyone! Just updated the workshop rules in the Documents area. Please take a look when you get a chance. Let me know if you have any questions." },

Tasks:
example for formatting:
        { id: 3501, done: true, dueAt: { time: "09:00", distance: -365 }, assignedBy: 3457,
        description: "Workshop Cleaning Duty", content: "Deep clean the workshop area, including organizing tools, wiping down surfaces, and ensuring all equipment is in its designated place. Pay special attention to the painting area and shared workbenches." },

Processes:

example for formatting:
  {id: 3501, new: true, public: true, active: true, createdAt: { time: "14:30", distance: -2 }, dueAt: { time: "20:00", distance: 5 }, creator: 3112, description: "Collecting Ideas for Next Dinner Themes",
  content: "Let's brainstorm some exciting themes for our upcoming shared dinners. Feel free to suggest any cuisine, cultural theme, or unique concept you'd like to explore. Don't forget to comment on others' ideas if you like them or have something to add!",
  modules: [
            {id: 35011, type: 'Ideation', dueAt: { time: "20:00", distance: 5 }, description: "Dinner Theme Ideas",
            content: "Share your ideas for dinner themes and comment on others' suggestions.",
            Ideas: [
                    {id: 350111,
                    createdAt: { time: "15:00", distance: -2 }, createdBy: 3112,  new: false, supportedBy: [3450, 3469, 3101, 1, 3419], rank: 0, description: "Italian Night",
                    content: "Italian Night",
                    comments: [
                                {id: 3501111,
                                createdAt: { time: "15:30", distance: -2 }, createdBy: 3450,new: false, supportedBy: [3112, 3469, 1], comments: [],
                                content: "Great idea! I can share some authentic recipes from my nonna."}, ...and so on...

For the Modules: (unnecessary types need to be left empty, but need to be added nonetheless)
- Ideation and Brainstorming: Everything except for rank. Rank=0
- Estimate: Everything except for rank, supportedBy, createdBy, CreatedAt
- Prioritize: Everything except for createdBy, CreatedAt, Rank is the total percentage from 1-100 and supportedBy means "this member gave this option the highest rank"
- Vote: Everything except for createdBy, CreatedAt, Rank is the total votes from all users and supportedBy means "this member voted for this option"
- Announcement: only one option with: ID, description, createdAt, content and comments. module's dueAt, description and content are left blank.
- External decision: everything except for createdAt, createdAy, supportedBy. An options content is either "approved" or "denied" and the Comments on the options are the explanation from the decision maker, why something was approved or denied.
 */


const importGroupData = async (groupName: string) => {
  const normalizedName = groupName.replace(/\s+/g, "").toLowerCase()
  try {
    return await import(`./Groups/${normalizedName}.ts`)
  } catch (error) {
    return {}
  }
}

const importSubgroupData = async (mainGroupName: string, subgroupName: string) => {
  const normalizedMainGroup = mainGroupName.replace(/\s+/g, "").toLowerCase()
  const normalizedSubgroup = subgroupName.replace(/\s+/g, "").toLowerCase()
  try {
    const importedData = await import(`./Groups/${normalizedMainGroup}/${normalizedSubgroup}.ts`)
    return importedData
  } catch (error) {
    return {}
  }
}

const createGroup = async (name: string, IAmMember: boolean, isPublic: boolean, subgroupNames: string[]): Promise<Group> => {
  const groupData = await importGroupData(name)

  const subgroups = await Promise.all(subgroupNames.map(async (subgroupName) => {
    const subgroupData = await importSubgroupData(name, subgroupName)
    return {
      name: subgroupName,
      IAmMember: subgroupData.IAmMember,
      isPublic: subgroupData.isPublic,
      subgroups: [],
      members: subgroupData.members || [],
      processes: subgroupData.processes || [],
      chats: subgroupData.chats || [],
      tasks: subgroupData.tasks || [],
      appointments: subgroupData.appointments || [],
      description: subgroupData.description || "",
      content: subgroupData.content || "",
      rules: subgroupData.rules || ""
    }
  }))

  return {
    name,
    IAmMember,
    isPublic: isPublic,
    subgroups,
    members: groupData.members || [],
    processes: groupData.processes || [],
    chats: groupData.chats || [],
    tasks: groupData.tasks || [],
    appointments: groupData.appointments || [],
    description: groupData.description || "",
    content: groupData.content || "",
    rules: groupData.rules || ""
  }
}

export const getGroupStructure = async (): Promise<Group[]> => {
  return Promise.all([
    createGroup("Park Club", true, true, [
      "Executive Committee",
      "Junior Team",
      "1st Senior Team",
      "2nd Senior Team",
      "Masters",
      "Construction Committee",
      "Training Organization",

    ]),
    createGroup("Rochefort", true, true, [
      "Parents of Rochefort",
      "Sports in Rochefort",
    ]),
    createGroup("Marin Quarter", true, true, [
      "House 1",
      "House 2",
      "House 11",
      "House 12",
      "House 13",
      "House 21",
      "House 22",
      "House 23",
      "Handcrafts",
      "Shared Dinner",
      "Board",
      "Childcare",
      "Building",
      "Garden",
    ]),
  ])
}