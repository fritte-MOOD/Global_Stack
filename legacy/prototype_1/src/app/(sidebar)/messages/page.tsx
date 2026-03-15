"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { useChat } from "@/context/ContextFiles/ChatContext"
import { GroupCheckboxes } from "@/components/ui/GroupCheckboxes"
import FormattedDate from "@/components/functions/FormattedDate"
import { useCheckbox } from "@/context/ContextFiles/CheckboxesContext"
import { Chat, Group, Member, RelativeTime } from "@/data/interfaces"
import { CalculateDateTime } from "@/components/functions/CalculateDateTime"
import { useMockup } from "@/context/ContextFiles/MockupContext"

const ChatsPage = () => {
  const router = useRouter()
  const { setChatId } = useChat()
  const { groups } = useCheckbox()
  const [isLoading, setIsLoading] = useState(true)
  const mockData = useMockup()

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const getDateFromRelativeTime = (relativeTime: RelativeTime | undefined): Date => {
    if (!relativeTime) return new Date(0)
    return CalculateDateTime(relativeTime.time, relativeTime.distance)
  }

  const getGroupColor = (groupName: string, isSubgroup: boolean): string => {
    switch (groupName) {
      case "Park Club":
        return "bg-group-park-club-500 border-group-park-club-500 text-brand-0";
      case "Marin Quarter":
        return "bg-group-marin-quarter-500 border-group-marin-quarter-500 text-brand-0";
      case "Rochefort":
        return "bg-group-rochefort-500 border-group-rochefort-500 text-brand-0";
      default:
        return "bg-gray-300 border-gray-300 text-gray-700";
    }
  };

  const chatMembersMap = useMemo(() => {
    const membersMap = new Map<number, Member[]>()
    mockData.forEach(group => {
      group.chats.forEach(chat => {
        const chatMembers = group.members.filter(member => chat.members.includes(member.id))
        membersMap.set(chat.id, chatMembers)
      })
      group.subgroups.forEach(subgroup => {
        subgroup.chats.forEach(chat => {
          const chatMembers = subgroup.members.filter(member => chat.members.includes(member.id))
          if (membersMap.has(chat.id)) {
            const existingMembers = membersMap.get(chat.id)!
            const newMembers = chatMembers.filter(member =>
              !existingMembers.some(existingMember => existingMember.id === member.id),
            )
            membersMap.set(chat.id, existingMembers.concat(newMembers))
          } else {
            membersMap.set(chat.id, chatMembers)
          }
        })
      })
    })
    return membersMap
  }, [mockData])

  const sortedAndFilteredChats = useMemo(() => {
    const filteredChats = mockData
      .flatMap((group: Group) => {
        const isGroupChecked = groups.find(g => g.name === group.name)?.checked
        const groupChats = isGroupChecked 
          ? group.chats.map((chat: Chat) => ({ 
              groupName: group.name, 
              subgroupName: group.name, 
              chat, 
              isSubgroup: false 
            })) 
          : []
        const subgroupChats = group.subgroups
          .filter((subgroup: Group) => groups.find(g => g.name === subgroup.name)?.checked)
          .flatMap((subgroup: Group) => subgroup.chats.map((chat: Chat) => ({ 
            groupName: group.name, 
            subgroupName: subgroup.name, 
            chat, 
            isSubgroup: true 
          })))
        return [...groupChats, ...subgroupChats]
      })
      .sort((a, b) => {
        const dateA = getDateFromRelativeTime(a.chat.messages[a.chat.messages.length - 1]?.at)
        const dateB = getDateFromRelativeTime(b.chat.messages[b.chat.messages.length - 1]?.at)
        return dateB.getTime() - dateA.getTime()
      })

    return filteredChats
  }, [groups, mockData])

  const handleChatClick = (chatId: number) => {
    setChatId(chatId.toString())
    router.push("/messages/chat")
  }

  return (
    <section className="bg-brand-25">
      <MaxWidthWrapper>
        <div className="w-full mb-6">
          <GroupCheckboxes />
        </div>
        <div className="w-full">
          {sortedAndFilteredChats.length === 0 ? (
            <p className="text-brand-950">No chats found in the selected groups.</p>
          ) : (
            sortedAndFilteredChats.map(({ groupName, subgroupName, chat, isSubgroup }) => {
              const lastMessage = chat.messages[chat.messages.length - 1]
              const chatMembers = chatMembersMap.get(chat.id) || []

              let memberNames
              if (chatMembers.length <= 3) {
                memberNames = chatMembers.map(member => member.name).join(", ")
              } else {
                const firstThreeNames = chatMembers.slice(0, 3).map(member => member.name).join(", ")
                memberNames = `${firstThreeNames} + ${chatMembers.length - 3} more`
              }

              const hasNewMessages = chat.messages.some(message => message.new)
              return (
                <div
                  key={chat.id}
                  className="mb-6 p-4 bg-brand-0 rounded shadow flex items-start cursor-pointer hover:bg-brand-550 transition-colors duration-200"
                  onClick={() => handleChatClick(chat.id)}
                >
                  <div className="flex-grow">
                    <div className="flex mb-2 items-center">
                      <span className={`${getGroupColor(groupName, isSubgroup)} text-l font-medium py-0.5 rounded min-w-[180px] text-center`}>
                        {isSubgroup ? subgroupName : groupName}
                      </span>
                      <h2 className="pl-6 text-xl font-semibold">{memberNames}</h2>
                      {hasNewMessages && (
                        <div className="w-4 h-4 bg-brand-300 rounded-full ml-auto"></div>
                      )}
                    </div>
                    <p className="text-brand-950 mb-3">
                      <span className="font-medium">{chatMembers.find(member => member.id === lastMessage?.sentBy)?.name}: </span>
                      {lastMessage?.content || "No messages"}
                    </p>
                    <div className="flex justify-between text-sm text-brand-950">
                      <p>
                        Last message: {lastMessage ? <FormattedDate date={getDateFromRelativeTime(lastMessage.at)} /> : "No date"}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default ChatsPage