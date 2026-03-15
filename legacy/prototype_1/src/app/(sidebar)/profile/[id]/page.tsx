"use client"

import { useParams, useRouter } from "next/navigation"
import { useMockup } from "@/context/ContextFiles/MockupContext"
import { useChat } from "@/context/ContextFiles/ChatContext"
import { Group, Chat, Task, Appointment } from "@/data/interfaces"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { useEffect, useState } from "react"
import FormattedDate from "@/components/functions/FormattedDate"
import { CalculateDateTime } from "@/components/functions/CalculateDateTime"

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { setChatId } = useChat()
  const id = Number(params.id)
  const mockData = useMockup()

  const [profileData, setProfileData] = useState<{
    name: string;
    groups: Group[];
    chats: Chat[];
    tasks: Task[];
    appointments: Appointment[];
  } | null>(null)

  useEffect(() => {
    if (!mockData || isNaN(id)) return

    let foundName = "Unknown User"
    const foundGroups: Group[] = []
    const foundChats: Chat[] = []
    const foundTasks: Task[] = []
    const foundAppointments: Appointment[] = []
    const currentUserId = 1 // "You" is always ID 1

    const traverse = (groups: Group[]) => {
      for (const group of groups) {
        // 1. Check Membership
        const member = group.members.find(m => m.id === id)
        if (member) {
          foundName = member.name
          foundGroups.push(group)
        }

        // 2. Check All Chats user is in
        if (group.chats) {
          group.chats.forEach(chat => {
            if (chat.members && chat.members.includes(id)) {
            if (!foundChats.some(c => c.id === chat.id)) {
              foundChats.push(chat)
            }
          }
          })
        }

        // 3. Check Future Tasks (Created by User)
        group.tasks.forEach(task => {
          if (task.assignedBy === id) {
            const taskDueDate = CalculateDateTime(task.dueAt.time, task.dueAt.distance)
            if (taskDueDate >= new Date() && !foundTasks.some(t => t.id === task.id)) {
              foundTasks.push(task)
            }
          }
        })

        // 4. Check Appointments (Created by or Invited)
        group.appointments.forEach(app => {
          if (app.createdBy === id || app.invited.includes(id)) {
             if (!foundAppointments.some(a => a.id === app.id)) {
               foundAppointments.push(app)
             }
          }
        })

        // Recursion
        if (group.subgroups) {
          traverse(group.subgroups)
        }
      }
    }

    traverse(mockData)

    setProfileData({
      name: foundName,
      groups: foundGroups,
      chats: foundChats,
      tasks: foundTasks,
      appointments: foundAppointments
    })

  }, [id, mockData])

  const handleChatClick = (chatId: number) => {
    setChatId(chatId.toString())
    router.push("/messages/chat")
  }

  if (!profileData) return <div className="p-8 text-center text-gray-500">Loading profile...</div>

  return (
    <div className="min-h-screen overflow-y-auto bg-brand-25">
      <MaxWidthWrapper>
        <section className="py-8 space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-4 border-b border-brand-200 pb-6">
            <div className="w-20 h-20 bg-brand-200 rounded-full flex items-center justify-center text-3xl font-bold text-brand-800 shadow-sm">
              {profileData.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-brand-900">{profileData.name}</h1>
              <p className="text-brand-600">User ID: {id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Groups Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-brand-800 flex items-center">
                Groups <span className="ml-2 text-sm bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full">{profileData.groups.length}</span>
              </h2>
              {profileData.groups.length > 0 ? (
                <ul className="space-y-2">
                  {profileData.groups.map((group, idx) => (
                    <li key={idx} className="p-4 bg-white rounded-lg shadow-sm border border-brand-100 flex justify-between items-center hover:shadow-md transition-shadow">
                      <span className="font-medium text-brand-900">{group.name}</span>
                      {group.IAmMember && (
                        <span className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded-full font-medium">
                          Shared Group
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : <p className="text-gray-500 italic">No groups found.</p>}
            </div>

            {/* Shared Chats Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-brand-800 flex items-center">
                Chats <span className="ml-2 text-sm bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full">{profileData.chats.length}</span>
              </h2>
              {profileData.chats.length > 0 ? (
                <ul className="space-y-2">
                  {profileData.chats.map((chat, idx) => (
                    <li 
                      key={idx} 
                      className="p-4 bg-white rounded-lg shadow-sm border border-brand-100 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleChatClick(chat.id)}
                    >
                      <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Chat ID: {chat.id}</p>
                      <p className="text-brand-900 truncate italic">"{chat.messages[chat.messages.length - 1]?.content || "No messages"}"</p>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-gray-500 italic">No shared chats.</p>}
            </div>

            {/* Appointments Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-brand-800 flex items-center">
                Appointments <span className="ml-2 text-sm bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full">{profileData.appointments.length}</span>
              </h2>
              {profileData.appointments.length > 0 ? (
                <ul className="space-y-2">
                  {profileData.appointments.map((app, idx) => (
                    <li key={idx} className="p-4 bg-white rounded-lg shadow-sm border border-brand-100 hover:shadow-md transition-shadow">
                      <p className="font-medium text-brand-900">{app.description}</p>
                      <div className="text-xs text-gray-500 mt-2 flex items-center">
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          <FormattedDate date={CalculateDateTime(app.at.time, app.at.distance)} />
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-gray-500 italic">No appointments found.</p>}
            </div>

            {/* Tasks Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-brand-800 flex items-center">
                Upcoming Tasks (Created) <span className="ml-2 text-sm bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full">{profileData.tasks.length}</span>
              </h2>
              {profileData.tasks.length > 0 ? (
                <ul className="space-y-2">
                  {profileData.tasks.map((task, idx) => (
                    <li key={idx} className="p-4 bg-white rounded-lg shadow-sm border border-brand-100 hover:shadow-md transition-shadow">
                      <p className="font-medium text-brand-900">{task.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Due: <FormattedDate date={CalculateDateTime(task.dueAt.time, task.dueAt.distance)} />
                      </p>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-gray-500 italic">No tasks created.</p>}
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </div>
  )
}
