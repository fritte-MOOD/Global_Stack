"use client"

import { useDebate } from "@/context/ContextFiles/DebateContext"
import { useMockup } from "@/context/ContextFiles/MockupContext"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import FormattedDate from "@/components/functions/FormattedDate"
import { CalculateDateTime } from "@/components/functions/CalculateDateTime"
import { useEffect, useState } from "react"
import { ModuleContent } from "@/components/ModuleContent/moduleContent"

const DebatesPage = () => {
  const { debateId } = useDebate()
  const mockData = useMockup()
  const [selectedModule, setSelectedModule] = useState<number | null>(null)

  const currentProcess = mockData.flatMap(group =>
    [...group.processes, ...group.subgroups.flatMap(subgroup => subgroup.processes)],
  ).find(process => process.id === debateId)

  useEffect(() => {
    if (currentProcess && currentProcess.modules.length > 0) {
      setSelectedModule(0)
    }
  }, [currentProcess])

  const getUsernameById = (userId: number): string => {
    for (const group of mockData) {
      const user = group.members.find(member => member.id === userId)
      if (user) return user.name

      for (const subgroup of group.subgroups) {
        const subgroupUser = subgroup.members.find(member => member.id === userId)
        if (subgroupUser) return subgroupUser.name
      }
    }
    return "Unknown User"
  }

  return (
    <section className="bg-brand-25 min-h-screen py-8">
      <MaxWidthWrapper>
        {currentProcess ? (
          <>
            <div className="bg-brand-0 p-8 rounded-lg shadow-md mb-8">
              <h1 className="text-3xl font-bold mb-6">{currentProcess.description}</h1>

              <div className="mb-6">
                <p className="text-lg mb-2">{currentProcess.content}</p>
                <div className="text-sm text-brand-950">
                  <p className="mb-1">
                    Status: <span
                    className={`font-semibold ${currentProcess.active ? "text-green-600" : "text-red-600"}`}>
                    {currentProcess.active ? "Active" : "Inactive"}
                  </span>
                  </p>
                  <p>
                    Due date: <FormattedDate
                    date={CalculateDateTime(currentProcess.dueAt.time, currentProcess.dueAt.distance)} />
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-brand-950">
                <div>
                  <p>Created by: {getUsernameById(currentProcess.creator)}</p>
                  <p>Created at: <FormattedDate
                    date={CalculateDateTime(currentProcess.createdAt.time, currentProcess.createdAt.distance)} /></p>
                </div>
              </div>
            </div>

            <div className="relative mb-8">
              <div className="flex justify-center items-end overflow-x-auto py-4">
                {currentProcess.modules.map((module: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <button
                      onClick={() => setSelectedModule(index)}
                      className={`flex items-center justify-center h-12 w-40 text-lg font-bold transition-all duration-200
                        ${selectedModule === index
                        ? "bg-brand-400 text-brand-0 rounded-t-md shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),_4px_0_6px_-1px_rgba(0,0,0,0.1),_-4px_0_6px_-1px_rgba(0,0,0,0.1)] relative z-10"
                        : "bg-brand-550 text-brand-950 hover:bg-brand-100 rounded-md"
                      }`}
                    >
                      <span className="text-center">{module.type}</span>
                    </button>
                    {index < currentProcess.modules.length - 1 && (
                      <div className="flex items-center justify-center w-8 h-8 mx-2">
                        <svg className="w-4 h-4 text-brand-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {selectedModule !== null && currentProcess.modules[selectedModule] && (
                <div className="bg-brand-0 rounded-lg shadow-md p-8 -mt-[1px]">
                  <ModuleContent module={currentProcess.modules[selectedModule]} />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-brand-0 p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Debate Context</h1>
            <p className="text-lg">
              Current Debate ID: {debateId !== null ? debateId : "No debate selected"}
            </p>
            <p className="text-red-600 mt-4">Process not found</p>
          </div>
        )}
      </MaxWidthWrapper>
    </section>
  )
}

export default DebatesPage