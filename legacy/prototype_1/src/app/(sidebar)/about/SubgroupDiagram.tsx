
"use client"

import { Group } from "@/data/interfaces"
import { useState } from "react"

interface SubgroupDiagramProps {
  mainGroup: Group
  activeGroupName: string
  onSubgroupClick: (name: string, isMainGroup: boolean) => void
}

const getGroupTooltipContent = (group: Group) => {
  const newMessages = group.chats.flatMap(c => c.messages).filter(m => m.new).length
  const totalDebates = group.processes.length
  const openTasks = group.tasks.filter(t => !t.done).length
  const upcomingEvents = group.appointments.length

  const hasInfo = group.IAmMember || newMessages > 0 || totalDebates > 0 || openTasks > 0 || upcomingEvents > 0
  if (!hasInfo) return null

  return (
    <ul className="list-none text-left space-y-1">
      {group.IAmMember && <li>✓ You are a member</li>}
      {newMessages > 0 && (
        <li>
          {newMessages} new message{newMessages !== 1 ? "s" : ""}
        </li>
      )}
      {totalDebates > 0 && (
        <li>
          {totalDebates} debate{totalDebates !== 1 ? "s" : ""}
        </li>
      )}
      {openTasks > 0 && (
        <li>
          {openTasks} open task{openTasks !== 1 ? "s" : ""}
        </li>
      )}
      {upcomingEvents > 0 && (
        <li>
          {upcomingEvents} upcoming event{upcomingEvents !== 1 ? "s" : ""}
        </li>
      )}
    </ul>
  )
}

export const SubgroupDiagram = ({ mainGroup, activeGroupName, onSubgroupClick }: SubgroupDiagramProps) => {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: React.ReactNode; position: "top" | "bottom" } | null>(null)

  if (!mainGroup || !mainGroup.subgroups) return null

  const memberSubgroups = mainGroup.subgroups.filter(g => g.IAmMember)
  const privateSubgroups = mainGroup.subgroups.filter(g => !g.IAmMember)
  const isMainActive = mainGroup.name === activeGroupName

  const nodesToRender = [
    ...memberSubgroups.map(g => ({ type: 'group', data: g })),
    ...(privateSubgroups.length > 0 ? [{ type: 'private', count: privateSubgroups.length, subgroups: privateSubgroups }] : [])
  ]

  const handleMouseEnter = (e: React.MouseEvent, content: React.ReactNode) => {
    if (!content) return
    const rect = e.currentTarget.getBoundingClientRect()
    const position = rect.top < 150 ? "bottom" : "top" // If element is too close to the top, show tooltip below

    setTooltip({
      x: rect.left + rect.width / 2,
      y: position === "top" ? rect.top : rect.bottom,
      content,
      position,
    })
  }

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-2xl text-brand-1 font-semibold mb-8 text-center">Group Structure</h2>
      <div className="min-w-max">
        <div className="flex flex-col items-center">
          {/* Root Node (Main Group) */}
          <div>
            <div
              className={`
                relative z-10 p-4 rounded-lg border-2 cursor-pointer transition-all min-w-[200px] text-center shadow-sm
                ${isMainActive
                  ? "bg-brand-200 border-brand-600 ring-2 ring-brand-200 ring-offset-1"
                  : "bg-white border-brand-200 hover:border-brand-400 hover:shadow-md"
                }
              `}
              onClick={() => onSubgroupClick(mainGroup.name, true)}
              onMouseEnter={(e) => handleMouseEnter(e, getGroupTooltipContent(mainGroup))}
              onMouseLeave={() => setTooltip(null)}
            >
              <p className="font-bold text-lg text-brand-900">{mainGroup.name}</p>
              <p className="text-sm text-gray-600">{mainGroup.members.length} Members</p>
            </div>
          </div>

          {/* Connector System */}
          {nodesToRender.length > 0 && (
            <>
              {/* Vertical line down from root */}
              <div className="h-8 w-0.5 bg-brand-300"></div>
              
              {/* Children Container */}
              <div className="flex justify-center items-start pt-6 relative">
                
                {nodesToRender.map((node, index) => {
                  const isFirst = index === 0
                  const isLast = index === nodesToRender.length - 1
                  const isOnly = nodesToRender.length === 1
                  
                  return (
                    <div key={index} className="flex flex-col items-center relative px-4">
                       {/* Horizontal Lines connecting siblings */}
                       {!isOnly && (
                         <>
                           {/* Left part of the connector */}
                           <div className={`absolute top-[-24px] left-0 w-1/2 h-0.5 bg-brand-300 ${isFirst ? 'hidden' : 'block'}`} />
                           {/* Right part of the connector */}
                           <div className={`absolute top-[-24px] right-0 w-1/2 h-0.5 bg-brand-300 ${isLast ? 'hidden' : 'block'}`} />
                         </>
                       )}
                       
                       {/* Vertical Line up to the horizontal connector */}
                       <div className="absolute top-[-24px] h-6 w-0.5 bg-brand-300"></div>
                       
                       {/* Node Content */}
                        {"data" in node ? (
                         <div>
                           <div
                             onClick={() => onSubgroupClick(node.data.name, false)}
                             className={`
                               relative z-10 p-3 rounded-lg border-2 text-center min-w-[140px] max-w-[180px] shadow-sm transition-all cursor-pointer
                               ${node.data.name === activeGroupName
                                 ? "bg-brand-200 border-brand-600 ring-2 ring-brand-200 ring-offset-1"
                                 : "bg-white border-brand-200 hover:border-brand-400 hover:shadow-md"
                               }
                             `}
                             onMouseEnter={(e) => handleMouseEnter(e, getGroupTooltipContent(node.data))}
                             onMouseLeave={() => setTooltip(null)}
                           >
                             <p className="font-bold text-sm text-brand-900">{node.data.name}</p>
                             <p className="text-xs text-gray-500 mt-1">{node.data.members.length} Members</p>
                           </div>
                         </div>
                        ) : (
                         <div>
                           <div
                             className="relative z-10 p-3 rounded-lg border-2 border-gray-300 bg-gray-50 text-center min-w-[140px] max-w-[180px] shadow-sm cursor-default"
                             onMouseEnter={(e) => handleMouseEnter(e, (
                               <ul className="list-none text-left space-y-1">
                                 {node.subgroups.map((sub, i) => (
                                   <li key={i}>{sub.name} (private)</li>
                                 ))}
                               </ul>
                             ))}
                             onMouseLeave={() => setTooltip(null)}
                           >
                             <p className="font-bold text-sm text-gray-500">{node.count} other subgroup{node.count > 1 ? 's' : ''}</p>
                             <p className="text-xs text-gray-400 mt-1">Private</p>
                           </div>
                         </div>
                       )}
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
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
    </div>
  )
}