"use client"

import { Heading } from "@/components/ui/heading"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { Box } from "lucide-react"
import { useRouter } from "next/navigation"
import { useGroup } from "@/context/ContextFiles/GroupContext"
import { useMockup } from "@/context/ContextFiles/MockupContext"
import { CalculateDateTime } from "@/components/functions/CalculateDateTime"
import { useEffect } from "react"

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Define the interface for a subgroup
interface Subgroup {
  name: string;
  IAmMember: boolean;
  members: any[];
  chats: any[];
  tasks: any[];
  appointments: any[];
  processes: any[];
}

const Page = () => {
  const router = useRouter()
  const { groupName, setGroupName } = useGroup()
  const mockData = useMockup()

  useEffect(() => {
  }, [groupName, mockData])

  const SubgroupCard = ({ subgroup }: { subgroup: Subgroup }) => {
    const openTasks = subgroup.tasks.filter(task => !task.completed).length

    const nextAppointment = subgroup.appointments
      .filter(app => CalculateDateTime(app.at.time, app.at.distance) > new Date())
      .sort((a, b) =>
        CalculateDateTime(a.at.time, a.at.distance).getTime() -
        CalculateDateTime(b.at.time, b.at.distance).getTime(),
      )[0]

    const recentDebate = subgroup.processes
      .filter(process => process.modules.some((module: { type: string }) => module.type === "Debate"))
      .sort((a, b) =>
        CalculateDateTime(b.createdAt.time, b.createdAt.distance).getTime() -
        CalculateDateTime(a.createdAt.time, a.createdAt.distance).getTime(),
      )[0]?.modules.find((module: { type: string; description?: string }) => module.type === "Debate")?.description

    return (
      <div className="w-[360px] h-auto p-6 border border-gray-300 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl bg-white cursor-pointer"
      >
        <div className="flex items-center justify-center text-lg gap-x-2 py-2 px-6 group w-full">
          <Box className="text-brand-300" />
          <span>{subgroup.name}</span>
        </div>
        <p className="text-base/7 text-gray-600 w-full text-center">
          {subgroup.members.length} Members <br />
          {subgroup.chats.length} Chats <br />
          {openTasks} Open Tasks <br />
          {nextAppointment ? (
            <>
              Next meeting: {formatDate(CalculateDateTime(nextAppointment.at.time, nextAppointment.at.distance))} <br />
              {nextAppointment.description} <br />
            </>
          ) : (
            "No upcoming appointments"
          )}
          {recentDebate && (
            <>
              Recent debate: {recentDebate} <br />
            </>
          )}
        </p>
      </div>
    )
  }

  const mainGroups = mockData.map(group => group.name)

  // Function to get the correct group name
  const getValidGroupName = (name: string): string => {
    return mainGroups.includes(name) ? name : mainGroups[0]
  }

  // Use the valid group name
  const validGroupName = getValidGroupName(groupName)

  const currentGroup = mockData.find(group => group.name === validGroupName)

  const yourSubgroups = currentGroup?.subgroups.filter(subgroup => subgroup.IAmMember) || []
  const otherSubgroups = currentGroup?.subgroups.filter(subgroup => !subgroup.IAmMember) || []

  return (
    <>
      <section className="relative">
        <MaxWidthWrapper className="relative mx-auto items-center flex flex-col gap-10">
          {/* Group Picker */}
          <div className="w-full max-w-xs mb-6">
            <label htmlFor="group-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Group:
            </label>
            <select
              id="group-select"
              value={validGroupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500"
            >
              {mainGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full flex flex-col items-center gap-8">
            <p className="text-left text-2xl mb-4 w-full">Your Subgroups:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {yourSubgroups.map((subgroup, index) => (
                <SubgroupCard key={index} subgroup={subgroup} />
              ))}
            </div>

            <p className="text-left text-2xl pt-10 mb-4 w-full">Other Public {validGroupName} Subgroups:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {otherSubgroups.map((subgroup, index) => (
                <SubgroupCard key={index} subgroup={subgroup} />
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}

export default Page