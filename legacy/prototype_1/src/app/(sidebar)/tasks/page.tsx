"use client"

import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { GroupCheckboxes } from "@/components/ui/GroupCheckboxes"
import { useMemo } from "react"
import FormattedDate from "@/components/functions/FormattedDate"
import { useCheckbox } from "@/context/ContextFiles/CheckboxesContext"
import { CheckCircle, Circle } from "lucide-react"
import { Group, Task } from "@/data/interfaces"
import { CalculateDateTime } from "@/components/functions/CalculateDateTime"
import { useMockup } from "@/context/ContextFiles/MockupContext"

const TasksPage = () => {
  const { groups } = useCheckbox()
  const mockData = useMockup()

  const getGroupColor = (groupName: string, isDone: boolean): string => {
    if (isDone) {
      return "bg-gray-300 border-gray-300 text-gray-700";
    }
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

  const getCircleColor = (groupName: string): string => {
    switch (groupName) {
      case "Park Club":
        return "text-group-park-club-500";
      case "Marin Quarter":
        return "text-group-marin-quarter-500";
      case "Rochefort":
        return "text-group-rochefort-500";
      default:
        return "text-gray-300";
    }
  };

  const tasks = useMemo(() => {
    const allTasks = mockData.flatMap((group: Group) => {
      const isGroupChecked = groups.find(g => g.name === group.name)?.checked
      const groupTasks = isGroupChecked ? group.tasks.map(task => ({
        ...task,
        group: group.name,
        subgroup: group.name,
      })) : []
      const subgroupTasks = group.subgroups
        .filter(subgroup => groups.find(g => g.name === subgroup.name)?.checked)
        .flatMap(subgroup => subgroup.tasks.map(task => ({ ...task, group: group.name, subgroup: subgroup.name })))
      return [...groupTasks, ...subgroupTasks]
    })

    return allTasks.sort((a: Task, b: Task) => {
      if (a.done !== b.done) {
        return a.done ? 1 : -1
      }

      const dateA = CalculateDateTime(a.dueAt.time, a.dueAt.distance)
      const dateB = CalculateDateTime(b.dueAt.time, b.dueAt.distance)

      return dateB.getTime() - dateA.getTime() // Most recent first
    })
  }, [groups, mockData])

  return (
    <section className="bg-brand-25">
      <MaxWidthWrapper>
        <div className="flex w-full">
          <div className="w-full">
            <GroupCheckboxes />
            {tasks.map((task: Task & { group: string; subgroup: string }, index: number) => {
              const taskDate = CalculateDateTime(task.dueAt.time, task.dueAt.distance)

              return (
                <div key={index} className="mb-4 p-4 bg-brand-0 rounded shadow">
                  <div className="flex items-center mb-2">
                    <div className="mr-3">
                      {task.done ? (
                        <CheckCircle className="w-5 h-5 text-brand-950" />
                      ) : (
                        <Circle className={`w-5 h-5 ${getCircleColor(task.group)}`} />
                      )}
                    </div>
                    <span className={`${getGroupColor(task.group, task.done)} text-sm font-medium py-1 px-2 rounded min-w-[180px] text-center`}>
                      {task.subgroup}
                    </span>
                    <h3 className="font-bold ml-4 flex-grow">{task.description}</h3>
                  </div>
                  <div className="ml-8">
                    <p>Due: <FormattedDate date={taskDate} /></p>
                    <p className="text-sm text-brand-950 mt-2">{task.content}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default TasksPage