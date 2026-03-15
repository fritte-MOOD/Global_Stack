// /Users/intus/Desktop/MOOD/prototype_1/src/app/(sidebar)/calendar/page.tsx

"use client"

import React, { useMemo, useState, useEffect } from "react"
import moment from "moment"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { GroupCheckboxes } from "@/components/ui/GroupCheckboxes"
import { useCheckbox } from "@/context/ContextFiles/CheckboxesContext"
import { CalculateDateTime } from "@/components/functions/CalculateDateTime"
import { useMockup } from "@/context/ContextFiles/MockupContext"
import { Appointment, Group } from "@/data/interfaces"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/Modal/dialog"
import FormattedDate from "@/components/functions/FormattedDate"

const CalendarPage = () => {
  const { groups } = useCheckbox()
  const [currentDate, setCurrentDate] = useState(new Date())
  const mockData = useMockup()
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [memberMap, setMemberMap] = useState<Map<number, string>>(new Map())

  useEffect(() => {
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
  }, [mockData])

  const findMemberNameById = (id: number): string => {
    return memberMap.get(id) || "Unknown"
  }

  const events = useMemo(() => {
    return mockData.flatMap((group: Group) => {
      const isGroupChecked = groups.find(g => g.name === group.name)?.checked
      const groupEvents = isGroupChecked ? group.appointments.map(app => ({...app, groupName: group.name, isSubgroup: false})) : []
      const subgroupEvents = group.subgroups
        .filter(subgroup => groups.find(g => g.name === subgroup.name)?.checked)
        .flatMap(subgroup => subgroup.appointments.map(app => ({...app, groupName: group.name, subgroupName: subgroup.name, isSubgroup: true})))

      return [...groupEvents, ...subgroupEvents].map((appointment: Appointment & {groupName: string, subgroupName?: string, isSubgroup: boolean}) => {
        const startDateTime = CalculateDateTime(appointment.at.time, appointment.at.distance)
        const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000) // Add 1 hour
        return {
          appointment,
          title: appointment.description,
          time: appointment.at.time,
          start: startDateTime,
          end: endDateTime,
          allDay: false,
          groupName: appointment.groupName,
          subgroupName: appointment.subgroupName,
          isSubgroup: appointment.isSubgroup
        }
      })
    })
  }, [groups, mockData])

  const getEventColorClass = (groupName: string): string => {
    switch (groupName) {
      case "Park Club":
        return "bg-group-park-club-500 text-white border-group-park-club-500";
      case "Marin Quarter":
        return "bg-group-marin-quarter-500 text-white border-group-marin-quarter-500";
      case "Rochefort":
        return "bg-group-rochefort-500 text-white border-group-rochefort-500";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const Calendar = () => {
    const startOfMonth = moment(currentDate).startOf('month');
    const endOfMonth = moment(currentDate).endOf('month');
    const startDay = moment(startOfMonth).startOf('week');
    const endDay = moment(endOfMonth).endOf('week');

    const calendarDays = [];
    let day = startDay.clone();

    while (day.isBefore(endDay, 'day')) {
      calendarDays.push(day.clone());
      day.add(1, 'day');
    }
    // Ensure the last day is included if the loop condition misses it (though endOf week usually covers it)
    if (day.isSame(endDay, 'day')) {
        calendarDays.push(day.clone());
    }


    return (
      <div className="bg-white rounded-xl shadow-sm border border-brand-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-brand-100 bg-brand-50/50">
          <h2 className="text-2xl font-bold text-brand-900 capitalize">
            {moment(currentDate).format('MMMM YYYY')}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentDate(moment(currentDate).subtract(1, 'month').toDate())}
              className="p-2 rounded-full hover:bg-brand-100 text-brand-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-1 text-sm font-medium text-brand-700 bg-white border border-brand-200 rounded-md hover:bg-brand-50 transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentDate(moment(currentDate).add(1, 'month').toDate())}
              className="p-2 rounded-full hover:bg-brand-100 text-brand-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-brand-100 bg-brand-50/30">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-3 text-center text-xs font-semibold text-brand-700 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 auto-rows-fr bg-brand-100 gap-px">
          {calendarDays.map((dayItem, idx) => {
            const isCurrentMonth = dayItem.isSame(currentDate, 'month');
            const isToday = dayItem.isSame(new Date(), 'day');
            const dayEvents = events.filter(event => moment(event.start).isSame(dayItem, 'day'));

            return (
              <div 
                key={idx} 
                className={`min-h-[120px] bg-white p-2 transition-colors hover:bg-brand-50/30 flex flex-col gap-1 ${!isCurrentMonth ? 'bg-gray-50/50 text-gray-400' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <span 
                    className={`
                      text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                      ${isToday ? 'bg-brand-600 text-white' : 'text-brand-900'}
                    `}
                  >
                    {dayItem.format('D')}
                  </span>
                </div>
                
                <div className="flex-1 flex flex-col gap-1 mt-1 overflow-hidden">
                  {dayEvents.slice(0, 4).map((event, index) => (
                    <div 
                      key={index} 
                      onClick={() => setSelectedAppointment(event.appointment)}
                      className={`
                        group relative text-xs px-2 py-1 rounded border truncate cursor-pointer
                        ${getEventColorClass(event.groupName)}
                      `}
                    >
                      {event.title}
                      
                      {/* Tooltip */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-50 w-max max-w-xs">
                        <div className="bg-brand-950 text-white text-xs rounded p-2 shadow-lg">
                          <p className="font-bold mb-1">{event.title}</p>
                          <p className="opacity-90">{moment(event.start).format('LT')} - {moment(event.end).format('LT')}</p>
                          <p className="opacity-75 mt-1 text-[10px] uppercase tracking-wide">{event.groupName} {event.subgroupName ? `• ${event.subgroupName}` : ''}</p>
                        </div>
                        {/* Arrow */}
                        <div className="w-2 h-2 bg-brand-950 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
                      </div>
                    </div>
                  ))}
                  {dayEvents.length > 4 && (
                    <div className="text-xs text-brand-500 font-medium pl-1">
                      + {dayEvents.length - 4} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-25/30">
      <MaxWidthWrapper>
        <div className="py-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-brand-900">Calendar</h1>
              <p className="text-brand-600 mt-1">Manage your appointments and community events.</p>
            </div>
            <div className="w-full md:w-auto">
               <GroupCheckboxes />
            </div>
          </div>

          <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2 text-xs text-brand-900 pb-2">
            <span className="font-semibold">Legend:</span>
            <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-1.5 bg-group-park-club-500"></div>
                <span>Park Club</span>
            </div>
            <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-1.5 bg-group-marin-quarter-500"></div>
                <span>Marin Quarter</span>
            </div>
            <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-1.5 bg-group-rochefort-500"></div>
                <span>Rochefort</span>
            </div>
          </div>
          
          <Calendar />
        </div>
      </MaxWidthWrapper>
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

export default CalendarPage
