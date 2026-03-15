"use client"

import React, { useMemo } from "react"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { GroupCheckboxes } from "@/components/ui/GroupCheckboxes"
import { useCheckbox } from "@/context/ContextFiles/CheckboxesContext"
import { Process } from "@/data/interfaces"
import { useMockup } from "@/context/ContextFiles/MockupContext"
import { useDebate } from "@/context/ContextFiles/DebateContext"
import { useRouter } from "next/navigation"
import { CalculateDateTime } from "@/components/functions/CalculateDateTime"

const DebatesPage = () => {
  const { groups } = useCheckbox()
  const mockData = useMockup()
  const { setDebateId } = useDebate()
  const router = useRouter()

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

  const processes = useMemo(() => {
    return mockData.flatMap(group => {
      const isGroupChecked = groups.find(g => g.name === group.name)?.checked

      const groupProcesses = isGroupChecked
        ? group.processes.map(process => ({ ...process, groupName: group.name, isSubgroup: false }))
        : []

      const subgroupProcesses = group.subgroups.flatMap(subgroup => {
        const isSubgroupChecked = groups.find(g => g.name === subgroup.name)?.checked
        return isSubgroupChecked
          ? subgroup.processes.map(process => ({ 
              ...process, 
              groupName: group.name,
              subgroupName: subgroup.name,
              isSubgroup: true 
            }))
          : []
      })

      return [...groupProcesses, ...subgroupProcesses]
    })
  }, [mockData, groups])

  const handleProcessClick = (processId: number) => {
    setDebateId(processId)
    router.push("/debate/process")
  }

  return (
    <section className="bg-brand-25 py-8">
      <MaxWidthWrapper>
        <div className="w-full mb-6">
          <GroupCheckboxes />
        </div>
        <div className="w-full">
          {processes.length === 0 ? (
            <p className="text-brand-950">No processes found in the selected groups.</p>
          ) : (
            processes.map((process: Process & { groupName: string, subgroupName?: string, isSubgroup: boolean }) => {
              const now = new Date();
              let currentStepIndex = process.modules.findIndex(module =>
                CalculateDateTime(module.dueAt.time, module.dueAt.distance) > now
              );

              if (currentStepIndex === -1) {
                // All modules are in the past, so the process is complete.
                currentStepIndex = process.modules.length;
              }

              return (
                <div
                  key={process.id}
                  className="mb-6 p-6 bg-brand-0 rounded-lg border border-brand-200 cursor-pointer hover:bg-brand-50 transition-colors duration-200"
                  onClick={() => handleProcessClick(process.id)}
                >
                  {/* Header with Group Badge and Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`${getGroupColor(process.groupName, process.isSubgroup)} text-xs font-bold py-1 px-3 rounded text-center whitespace-nowrap`}>
                      {process.isSubgroup ? `${process.subgroupName}` : process.groupName}
                    </span>
                    <h2 className="text-lg font-semibold text-brand-900 text-center">{process.description}</h2>
                  </div>

                  {/* Process Flow Diagram */}
                  <div className="flex items-start w-full">
                    {process.modules.map((module, index) => {
                      const isActive = index === currentStepIndex;
                      const isCompleted = index < currentStepIndex;

                      return (
                        <React.Fragment key={index}>
                          {/* Module Step */}
                          <div className="flex flex-col items-center text-center" style={{ width: '120px' }}>
                            <div className={`
                              w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
                              ${isActive
                                ? 'bg-brand-700 border-brand-700 text-white'
                                : isCompleted
                                ? 'bg-brand-600 border-brand-600 text-white'
                                : 'bg-white border-brand-800 text-brand-800'
                              }
                            `}>
                              {isCompleted ? '✓' : index + 1}
                            </div>
                            <p className={`
                              mt-2 text-xs font-semibold break-words transition-colors
                              ${isActive ? 'text-brand-700' : 'text-brand-950'}
                            `}>
                              {module.type}
                            </p>
                          </div>
                          
                          {/* Connector */}
                          {index < process.modules.length - 1 && (
                            <div className={`
                              flex-1 h-1 mt-3.5 transition-colors
                              ${isCompleted ? 'bg-brand-600' : 'bg-brand-800'}
                            `}></div>
                          )}
                        </React.Fragment>
                      )
                    })}
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

export default DebatesPage