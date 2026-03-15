"use client"

import { useEffect, useRef, useState } from "react"
import { useChat } from "@/context/ContextFiles/ChatContext"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import FormattedDate from "@/components/functions/FormattedDate"
import { CalculateDateTime } from "@/components/functions/CalculateDateTime"
import { Chat, Group, Member, Message } from "@/data/interfaces"
import { useMockup } from "@/context/ContextFiles/MockupContext"

const ChatPage = () => {
  const { chatId } = useChat()
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [chatGroup, setChatGroup] = useState<string>("")
  const [chatMembers, setChatMembers] = useState<Member[]>([])
  const mockData = useMockup()
  const messageContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatId) {
      let foundChat: Chat | null = null
      let foundGroup: string = ""
      let foundMembers: Member[] = []

      mockData.some((group: Group) => {
        foundChat = group.chats.find(chat => chat.id.toString() === chatId) || null
        if (foundChat) {
          foundGroup = group.name
          foundMembers = group.members.filter(member => foundChat!.members.includes(member.id))
          return true
        }
        return group.subgroups.some(subgroup => {
          foundChat = subgroup.chats.find(chat => chat.id.toString() === chatId) || null
          if (foundChat) {
            foundGroup = subgroup.name
            foundMembers = subgroup.members.filter(member => foundChat!.members.includes(member.id))
            return true
          }
          return false
        })
      })

      setCurrentChat(foundChat)
      setChatGroup(foundGroup)
      setChatMembers(foundMembers)
    }
  }, [chatId, mockData])

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
    }
  }, [currentChat])

  return (
    <section className="relative py-24 sm:py-32">
      <MaxWidthWrapper>
        <div className="relative mx-auto flex flex-col items-center gap-10">
          {currentChat ? (
            <div className="w-full flex flex-col md:flex-row">
              {/* Left side - Chat info (visible from md viewport) */}
              <div className="hidden md:block w-1/4 pr-4 border-r">
                <h2 className="text-xl font-semibold mb-4">Chat Info</h2>
                <h3 className="font-medium">Group:</h3>
                <p className="mb-4">{chatGroup}</p>
                <h3 className="font-medium">Members:</h3>
                <ul className="list-disc list-inside mb-4">
                  {chatMembers.map((member: Member) => (
                    <li key={member.id}>{member.id === 1 ? "You" : member.name}</li>
                  ))}
                </ul>
              </div>

              {/* Right side - Chat messages */}
              <div className="w-full md:w-3/4 md:pl-4 flex flex-col h-[600px]">
                <div ref={messageContainerRef} className="flex-grow overflow-y-auto mb-4 space-y-4">
                  {currentChat.messages.map((message: Message, index: number) => {
                    const isCurrentUser = message.sentBy === 1
                    const senderName = isCurrentUser ? "You" : chatMembers.find(member => member.id === message.sentBy)?.name || "Unknown"
                    return (
                      <div key={index} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`flex items-start space-x-2 max-w-[70%] ${isCurrentUser ? "flex-row-reverse space-x-reverse" : ""}`}>
                          <div
                            className={`p-3 rounded-lg ${isCurrentUser ? "bg-brand-100 text-right" : "bg-brand-550"}`}>
                            <p className="font-medium">{senderName}</p>
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs text-brand-950 mt-1">
                              <FormattedDate date={CalculateDateTime(message.at.time, message.at.distance)} />
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-auto">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full bg-brand-0 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-300"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xl font-semibold">
              No chat selected (ID: {chatId || "None"})
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default ChatPage