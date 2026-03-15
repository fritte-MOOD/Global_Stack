"use client";

import { MaxWidthWrapper } from "./max-width-wrapper";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Drama, Home, Volleyball, ChevronRight } from "lucide-react";
import { useGroup } from "@/context/ContextFiles/GroupContext";
import { useCheckbox } from '@/context/ContextFiles/CheckboxesContext';
import { DarkModeToggle } from "./darkModeToggle";

export const Navbar = () => {
    // State and hooks
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { groupName, setGroupName } = useGroup();
    const { groupStructure, activateMainAndSubs, activateOnlySub } = useCheckbox();

    // Handle group selection
    const handleGroupClick = (newGroupName: string) => {
        setGroupName(newGroupName);
        const isMainGroup = groupStructure.some(group => group.name === newGroupName);
        isMainGroup ? activateMainAndSubs(newGroupName) : activateOnlySub(newGroupName);
        router.push("/about");
    };

    // Get icon for group
    const getGroupIcon = (iconGroupName: string) => {
        const IconComponent = {
            "Park Club": Volleyball,
            "Rochefort": Drama,
            "Marin Quarter": Home
        }[iconGroupName] || ChevronRight;
        return <IconComponent className="self-center" />;
    };

    return (
        <nav className="hidden lg:block sticky z-[100] h-14 px-4 top-0 width-full border-b border-brand-550 bg-brand-50 backdrop-blur-lg">
            <MaxWidthWrapper>
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <div onClick={() => router.push("/")} className="h-14 flex text-brand-901 items-center font-bold text-lg cursor-pointer">
                        <span className="text-brand-902">/</span>MOOD
                    </div>

                    {/* Navigation Items */}
                    <div className="flex gap-4 items-center">
                        {/* Groups Dropdown */}
                        <div>
                            <div
                                className="relative"
                                onMouseEnter={() => setIsOpen(true)}
                                onMouseLeave={() => setIsOpen(false)}
                            >
                                {/* Groups Button */}
                                <div
                                    onClick={() => router.push("/dashboard")}
                                    className={`rounded-md h-14 px-7 flex items-center text-[20px] cursor-pointer transition-all duration-200 ${
                                        groupName ? 'text-brand-1 font-semibold' : ''
                                    }`}
                                >
                                    {groupName ? `active: ${groupName}` : "My Groups"}
                                    {groupName && <ChevronRight className="ml-2 text-brand-1" size={20} />}
                                </div>
                            </div>

                            {/* Dropdown Menu */}
                            {isOpen && (
                                <div
                                    className="bg-brand-0 rounded-md text-s font-medium text-brand-950 absolute left-auto shadow-lg top-full text-sm cursor-pointer overflow-hidden"
                                    onMouseEnter={() => setIsOpen(true)}
                                    onMouseLeave={() => setIsOpen(false)}
                                >
                                    {groupStructure.map((mainGroup) => (
                                        <div key={mainGroup.name}>
                                            {/* Main Group Item */}
                                            <div
                                                className={`flex gap-x-2 py-2 px-6 cursor-pointer group transition-all duration-200 ${
                                                    groupName === mainGroup.name
                                                        ? 'bg-brand-100 text-brand-950 font-semibold border-l-4 border-brand-300'
                                                        : 'hover:bg-brand-550'
                                                }`}
                                                onClick={() => handleGroupClick(mainGroup.name)}
                                            >
                                                <div className={`flex justify-center ${
                                                    groupName === mainGroup.name ? 'text-brand-700' : 'text-brand-950'
                                                }`}>
                                                    {getGroupIcon(mainGroup.name)}
                                                </div>
                                                {mainGroup.name}
                                            </div>
                                            {/* Subgroup Items */}
                                            {mainGroup.subgroups.map((subgroup) => (
                                                <div
                                                    key={subgroup}
                                                    onClick={() => handleGroupClick(subgroup)}
                                                    className={`py-2 pl-12 pr-6 block transition-all duration-200 ${
                                                        groupName === subgroup
                                                            ? 'bg-brand-100 text-brand-950 font-semibold border-l-4 border-brand-300'
                                                            : 'hover:bg-brand-550'
                                                    }`}
                                                >
                                                    {subgroup}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Settings Button */}
                        <div
                            onClick={() => router.push("")}
                            className="rounded-md h-14 px-7 flex text-brand-1 font-semibold items-center text-[20px] cursor-pointer transition-all duration-200 hover:bg-brand-550"
                        >
                            Settings
                        </div>

                        {/* Dark Mode Toggle */}
                        <div className="h-14 flex items-center justify-center px-2">
                            <DarkModeToggle />
                        </div>
                    </div>
                </nav>
            </MaxWidthWrapper>
        </nav>
    );
};