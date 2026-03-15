"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useGroup } from "@/context/ContextFiles/GroupContext"
import { useMockup } from "@/context/ContextFiles/MockupContext"
import { useCheckbox } from "@/context/ContextFiles/CheckboxesContext"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { Heading } from "@/components/ui/heading"
import { Task, Group, Appointment } from "@/data/interfaces"
import { SubgroupDiagram } from "@/app/(sidebar)/about/SubgroupDiagram"
import Link from "next/link"
import { CalculateDateTime } from "@/components/functions/CalculateDateTime"
import FormattedDate from "@/components/functions/FormattedDate"
import { useChat } from "@/context/ContextFiles/ChatContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/Modal/dialog"

const AboutPage = () => {
  const router = useRouter()
  const { setChatId } = useChat()
  const { groupName, setGroupName } = useGroup()
  const { activateOnlySub, activateMainAndSubs } = useCheckbox()
  const mockData = useMockup()
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null)
  const [parentGroup, setParentGroup] = useState<Group | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [memberMap, setMemberMap] = useState<Map<number, string>>(new Map())
  const [stats, setStats] = useState({ debates: 0, appointments: 0, openTasks: 0, chats: 0 })

  useEffect(() => {
    const findGroupAndParent = (groups: Group[], targetName: string, parent: Group | null = null): [Group | null, Group | null] => {
      for (const group of groups) {
        if (group.name === targetName) return [group, parent]
        const [subgroup, subParent] = findGroupAndParent(group.subgroups, targetName, group)
        if (subgroup) return [subgroup, subParent]
      }
      return [null, null]
    }

    const [group, parent] = findGroupAndParent(mockData, groupName)
    if (group) {
      setCurrentGroup(group)
      setParentGroup(parent)
      setCurrentPage(1)

      const newMemberMap = new Map<number, string>()
      const buildMap = (groups: Group[]) => {
        for (const group of groups) {
          for (const member of group.members) {
            if (!newMemberMap.has(member.id)) {
              newMemberMap.set(member.id, member.name)
            }
          }
          if (group.subgroups) buildMap(group.subgroups)
        }
      }
      buildMap(mockData)
      setMemberMap(newMemberMap)

      const newStats = {
        debates: group.processes.filter(p => p.active).length,
        appointments: group.appointments.length,
        openTasks: group.tasks.filter((t: Task) => !t.done).length,
        chats: group.chats.length
      }
      setStats(newStats)
    }
  }, [groupName, mockData])

  const handleGroupClick = (clickedGroupName: string, isMainGroup: boolean) => {
    setGroupName(clickedGroupName)
    if (isMainGroup) {
      activateMainAndSubs(clickedGroupName)
    } else {
      activateOnlySub(clickedGroupName)
    }
  }

  const handleChatClick = (chatId: number) => {
    setChatId(chatId.toString())
    router.push("/messages/chat")
  }

  const rootGroup = parentGroup || currentGroup

  const futureAppointments = currentGroup?.appointments
    .filter(app => CalculateDateTime(app.at.time, app.at.distance) > new Date())
    .sort((a, b) => CalculateDateTime(a.at.time, a.at.distance).getTime() - CalculateDateTime(b.at.time, b.at.distance).getTime()) || []

  const futureTasks = currentGroup?.tasks
    .filter(t => CalculateDateTime(t.dueAt.time, t.dueAt.distance) > new Date())
    .sort((a, b) => CalculateDateTime(a.dueAt.time, a.dueAt.distance).getTime() - CalculateDateTime(b.dueAt.time, b.dueAt.distance).getTime()) || []


  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: React.ReactNode; position: "top" | "bottom" } | null>(null)

  const findMemberNameById = (id: number): string => {
    return memberMap.get(id) || "Unknown"
  }

  const getMemberSubgroups = (memberId: number): string[] => {
    if (!rootGroup || !rootGroup.subgroups) return []
    return rootGroup.subgroups
      .filter(subgroup => subgroup.members.some(member => member.id === memberId))
      .map(subgroup => subgroup.name)
  }

  const handleMouseEnter = (e: React.MouseEvent, content: React.ReactNode) => {
    if (!content) return
    const rect = e.currentTarget.getBoundingClientRect()
    const position = rect.top < 150 ? "bottom" : "top"

    setTooltip({
      x: rect.left + rect.width / 2,
      y: position === "top" ? rect.top : rect.bottom,
      content,
      position,
    })
  }

  const handleMouseLeave = () => {
    setTooltip(null)
  }

  const getMemberTooltipContent = (memberId: number) => {
    const memberSubgroups = getMemberSubgroups(memberId)
    if (memberSubgroups.length === 0) return null
    return (
      <>
        <p className="font-bold mb-1">Member of:</p>
        <ul className="list-disc list-inside">
          {memberSubgroups.map(subName => (
            <li key={subName}>{subName}</li>
          ))}
        </ul>
      </>
    )
  }

  const getAppointmentTooltipContent = (appointment: Appointment) => {
    const creatorName = findMemberNameById(appointment.createdBy)
    return (
      <div className="text-xs space-y-2">
        <p className="font-bold">{appointment.description}</p>
        <p className="opacity-80">{appointment.content}</p>
        <ul className="text-xs space-y-0.5 border-t border-white/20 pt-2 mt-2">
          <li><strong>Created by:</strong> {creatorName}</li>
          <li><strong>Invited:</strong> {appointment.invited.length}</li>
          <li><strong>Accepted:</strong> {appointment.accepted.length}</li>
          <li><strong>Declined:</strong> {appointment.declined.length}</li>
        </ul>
      </div>
    )
  }

  const membersPerPage = 20
  const members = currentGroup?.members || []
  const totalPages = Math.ceil(members.length / membersPerPage)
  const indexOfLastMember = currentPage * membersPerPage
  const indexOfFirstMember = indexOfLastMember - membersPerPage
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember)

  return (
    <div className="min-h-screen overflow-y-auto">
      <MaxWidthWrapper>
        <section className="py-8">
          {rootGroup && (
            <div>
              <SubgroupDiagram
                mainGroup={rootGroup}
                activeGroupName={currentGroup?.name || ""}
                onSubgroupClick={handleGroupClick}
              />
            </div>
          )}

          <div className="mt-8 lg:grid lg:grid-cols-5 space-y-8 lg:space-y-0">
            {/* Left column */}
            <div className="lg:col-span-3 space-y-8 lg:pr-8">
              <details className="group">
                <summary className="text-2xl text-brand-1 font-semibold cursor-pointer list-none flex justify-between items-center">
                  Information
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="mt-4">
                  <h3 className="font-bold text-lg mb-2 text-brand-900">{currentGroup?.description}</h3>
                  {currentGroup?.content && (
                    <p className="text-brand-950 whitespace-pre-wrap break-words">{currentGroup.content}</p>
                  )}
                </div>
              </details>

              {currentGroup?.rules && (
                <details className="group">
                  <summary className="text-2xl text-brand-1 font-semibold cursor-pointer list-none flex justify-between items-center">
                    Rules
                    <span className="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-brand-950 whitespace-pre-wrap break-words">{currentGroup.rules}</p>
                </details>
              )}

              {currentMembers.length > 0 && (
                <details className="group">
                  <summary className="text-2xl text-brand-1 font-semibold cursor-pointer list-none flex justify-between items-center">
                    Members ({members.length})
                    <span className="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <div className="mt-4">
                    <ul className="space-y-2">
                    {currentMembers.map(member => (
                      <li
                        key={member.id}
                        className="text-brand-950 w-fit"
                        onMouseEnter={(e) => handleMouseEnter(e, getMemberTooltipContent(member.id))}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Link href={`/profile/${member.id}`} className="hover:underline hover:text-brand-700 transition-colors">
                          {member.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-4 text-sm">
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-brand-200 text-brand-900 font-semibold hover:bg-brand-300 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <span>
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded bg-brand-200 text-brand-900 font-semibold hover:bg-brand-300 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}
                  </div>
                </details>
              )}

              <div>
                <h2 className="text-2xl text-brand-1 font-semibold mb-4">Group Statistics</h2>
                <ul className="list-disc text-brand-950 pl-5">
                  <li>Number of members: {
                    currentGroup?.name === "Rochefort" ? 14840 :
                      currentGroup?.name === "Sports in Rochefort" ? 247 :
                        currentGroup?.name === "Parents of Rochefort" ? 736 :
                          currentGroup?.members.length
                  }</li>
                  <li>Group type: {currentGroup?.isPublic ? 'Public' : 'Private'}</li>
                  <li>Your membership: {currentGroup?.IAmMember ? 'Member' : 'Not a member'}</li>
                  <li>Active debates: {stats.debates}</li>
                  <li>Upcoming appointments: {stats.appointments}</li>
                  <li>Open tasks: {stats.openTasks}</li>
                  <li>Active chats: {stats.chats}</li>
                </ul>
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-2 space-y-8 lg:border-l lg:border-brand-200 lg:pl-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl text-brand-1 font-semibold">Debates ({currentGroup?.processes.length || 0})</h2>
                  <Link href="/debate" className="text-sm text-brand-600 hover:underline">View all</Link>
                </div>
                {currentGroup?.processes && currentGroup.processes.length > 0 ? (
                  <ul className="space-y-3">
                    {currentGroup.processes.slice(0, 3).map(process => (
                      <li key={process.id} className="border-b border-brand-200 pb-2 last:border-0">
                        <p className="font-medium text-brand-900 break-words">{process.description}</p>
                        <p className="text-xs text-gray-500">Due: {process.dueAt.time} (in {process.dueAt.distance} days)</p>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-gray-500">No active debates.</p>}
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl text-brand-1 font-semibold">Upcoming Events ({futureAppointments.length})</h2>
                  <Link href="/calendar" className="text-sm text-brand-600 hover:underline">View all</Link>
                </div>
                {futureAppointments.length > 0 ? (
                  <ul className="space-y-3">
                    {futureAppointments.slice(0, 3).map((app) => (
                      <li
                        key={app.id}
                        className="border-b border-brand-200 pb-2 last:border-0 cursor-pointer hover:bg-brand-50/50 transition-colors rounded p-1 -m-1"
                        onMouseEnter={(e) => handleMouseEnter(e, getAppointmentTooltipContent(app))}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => setSelectedAppointment(app)}
                      >
                        <p className="font-medium text-brand-900 break-words">{app.description}</p>
                        <p className="text-xs text-gray-500">
                          <FormattedDate date={CalculateDateTime(app.at.time, app.at.distance)} />
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-gray-500">No upcoming events.</p>}
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl text-brand-1 font-semibold">Tasks ({futureTasks.length})</h2>
                  <Link href="/tasks" className="text-sm text-brand-600 hover:underline">View all</Link>
                </div>
                {futureTasks.length > 0 ? (
                  <ul className="space-y-3">
                    {futureTasks.slice(0, 3).map(task => (
                      <li key={task.id} className="border-b border-brand-200 pb-2 last:border-0">
                        <p className="font-medium text-brand-900 break-words">{task.description}</p>
                        <p className="text-xs text-gray-500">
                          Due: <FormattedDate date={CalculateDateTime(task.dueAt.time, task.dueAt.distance)} />
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-gray-500">No open tasks.</p>}
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl text-brand-1 font-semibold">Chats ({currentGroup?.chats.length || 0})</h2>
                  <Link href="/messages" className="text-sm text-brand-600 hover:underline">View all</Link>
                </div>
                {currentGroup?.chats && currentGroup.chats.length > 0 ? (
                  <ul className="space-y-3">
                    {currentGroup.chats.slice(0, 3).map((chat, idx) => (
                      <li 
                        key={idx} 
                        className="border-b border-brand-200 pb-2 last:border-0 cursor-pointer hover:bg-brand-50 transition-colors rounded px-1"
                        onClick={() => handleChatClick(chat.id)}
                      >
                        <p className="font-medium text-brand-900 truncate">{chat.messages[chat.messages.length - 1]?.content || "No messages"}</p>
                        <p className="text-xs text-gray-500">Chat ID: {chat.id}</p>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-gray-500">No new messages.</p>}
              </div>
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
      {tooltip && (
        <div
          className="fixed z-50 p-2 bg-brand-950 text-white text-xs rounded-lg shadow-lg pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: tooltip.position === "top"
              ? "translate(-50%, -100%) translateY(-8px)"
              : "translate(-50%, 0) translateY(8px)",
          }}
        >
          {tooltip.content}
        </div>
      )}
      <Dialog open={!!selectedAppointment} onOpenChange={(isOpen) => !isOpen && setSelectedAppointment(null)}>
        <DialogContent className="bg-brand-50 text-brand-950">
          <DialogHeader>
            <DialogTitle className="text-brand-900">{selectedAppointment?.description}</DialogTitle>
            <DialogDescription>
              <FormattedDate date={CalculateDateTime(selectedAppointment?.at.time || "00:00", selectedAppointment?.at.distance || 0)} />
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 text-sm space-y-4">
            <p className="whitespace-pre-wrap break-words">{selectedAppointment?.content}</p>
            <div>
              <h4 className="font-semibold mb-2">Details</h4>
              <ul className="text-xs space-y-1 bg-brand-100 p-3 rounded-md">
                <li><strong>Created by:</strong> {findMemberNameById(selectedAppointment?.createdBy || 0)}</li>
                <li><strong>Invited:</strong> {selectedAppointment?.invited.length}</li>
                <li><strong>Accepted:</strong> {selectedAppointment?.accepted.length}</li>
                <li><strong>Declined:</strong> {selectedAppointment?.declined.length}</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AboutPage
