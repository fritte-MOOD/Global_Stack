"use client"

import { buttonVariants } from "@/components/Modal/button"
import { Modal } from "@/components/Modal/modal"
import { cn } from "@/components/functions/utils"
import {
  BookKey,
  BookOpenText,
  Boxes,
  CalendarDays,
  ChartNoAxesCombined,
  Combine,
  File,
  LucideIcon,
  Menu,
  MessageSquareText,
  Shield,
  SquareCheckBig,
  UserRoundPen,
  Volleyball,
  X,
} from "lucide-react"
import Link from "next/link"
import { PropsWithChildren, useState } from "react"
import { Navbar } from "@/components/ui/navbar_sidebar"
import { usePathname } from 'next/navigation'

interface SidebarItem {
  href: string
  icon: LucideIcon
  text: string
}

interface SidebarCategory {
  category: string
  items: SidebarItem[]
}

const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    category: "Main",
    items: [
      { href: "/about", icon: Volleyball, text: "About" },
      { href: "/debate", icon: Combine, text: "Debate" },
    ],
  },

  {
    category: "Organize",
    items: [
      { href: "/calendar", icon: CalendarDays, text: "Calendar" },
      { href: "/tasks", icon: SquareCheckBig, text: "Tasks" },
      { href: "/messages", icon: MessageSquareText, text: "Messages" },
      { href: "", icon: File, text: "Documents" },
    ],
  },


  {
    category: "Components",
    items: [
      { href: "", icon: BookOpenText, text: "Knowledge Hub" },
      { href: "", icon: ChartNoAxesCombined, text: "Analysis Tools" },
      { href: "", icon: Shield, text: "Moderate" },
      { href: "", icon: BookKey, text: "Administrate" },
    ],
  },


  {
    category: "",
    items: [
      { href: "", icon: UserRoundPen, text: "Profile" },
    ],
  },
]

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname()

  return (
    <div className="space-y-4 md:space-y-6 relative z-20 flex flex-col flex-1">
      {/* Navigation Items */}
      <div className="flex-grow">
        <ul>
          {SIDEBAR_ITEMS.map(({ category, items }) => (
            <li key={category} className="mb-4 md:mb-8">
              <p className="text-xs font-medium leading-6 text-brand-950">
                {category}
              </p>
              <div className="-mx-2 flex flex-1 flex-col">
                {items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      "w-full justify-start group flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium leading-6 transition-all duration-200",
                      pathname === item.href
                        ? "bg-brand-100 text-brand-950 font-semibold border-l-4 border-brand-300"
                        : "text-brand-950 hover:bg-brand-550"
                    )}
                    onClick={onClose}
                  >
                    <item.icon className={cn(
                      "size-4 transition-colors duration-200",
                      pathname === item.href 
                        ? "text-brand-900"
                        : "text-brand-950 group-hover:text-brand-900"
                    )} />
                    {item.text}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const Layout = ({ children }: PropsWithChildren) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex">
        {/* Sidebar for desktop */}
        <aside className="fixed top-14 left-0 bottom-0 w-64 hidden lg:block overflow-y-auto border-r border-brand-800">
          <div className="p-6">
            <Sidebar />
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 lg:ml-64">
          {/* Mobile header - only visible on small screens */}
          <div className="lg:hidden h-14 flex items-center justify-between px-[26px] border-b border-brand-550">
            <Link href="/" className="flex z-40 font-bold text-lg">
              <span className="text-brand-300">/</span>MOOD
            </Link>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-600"
            >
              <Menu className="size-6" />
            </button>
          </div>

          {/* Page content */}
          <div className="bg-brand-25 shadow-md p-4 md:p-6 min-h-[calc(100vh-3.5rem)] lg:min-h-screen">
            {children}
          </div>
        </main>

        {/* Mobile sidebar modal - only visible when open on small screens */}
        <Modal
          className="p-4 lg:hidden"
          showModal={isDrawerOpen}
          setShowModal={setIsDrawerOpen}
        >
          <div className="flex justify-between items-center mb-4">
            <button
              aria-label="Close modal"
              onClick={() => setIsDrawerOpen(false)}
            >
              <X className="size-6" />
            </button>
          </div>
          <Sidebar onClose={() => setIsDrawerOpen(false)} />
        </Modal>
      </div>
    </div>
  )
}

export default Layout