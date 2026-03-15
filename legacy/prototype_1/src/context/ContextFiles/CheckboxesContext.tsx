"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMockup } from './MockupContext';
import { Group } from '@/data/interfaces';

interface GroupCheckbox {
  name: string;
  checked: boolean;
}

interface GroupStructure {
  name: string;
  subgroups: string[];
}

interface CheckboxContextType {
  groups: GroupCheckbox[];
  toggleGroup: (groupName: string) => void;
  activateAll: () => void;
  deactivateAll: () => void;
  randomizeAll: () => void;
  groupStructure: GroupStructure[];
  activateMainAndSubs: (mainGroupName: string) => void;
  activateOnlySub: (subGroupName: string) => void;
}

const CheckboxContext = createContext<CheckboxContextType | undefined>(undefined);

export const useCheckbox = () => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error('useCheckbox must be used within a CheckboxProvider');
  }
  return context;
};

export const CheckboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mockData = useMockup();
  const [groups, setGroups] = useState<GroupCheckbox[]>([]);
  const [groupStructure, setGroupStructure] = useState<GroupStructure[]>([]);

  useEffect(() => {
    const initializeData = () => {
      const newGroups: GroupCheckbox[] = [];
      const newGroupStructure: GroupStructure[] = [];

      mockData.forEach((mainGroup: Group) => {
        newGroups.push({ name: mainGroup.name, checked: true });
        const subgroups: string[] = [];
        mainGroup.subgroups.forEach(subgroup => {
          if (subgroup.IAmMember) {
            newGroups.push({ name: subgroup.name, checked: true });
            subgroups.push(subgroup.name);
          }
        });
        newGroupStructure.push({ name: mainGroup.name, subgroups });
      });

      setGroups(newGroups);
      setGroupStructure(newGroupStructure);
    };

    if (mockData.length > 0) {
      initializeData();
    }
  }, [mockData]);

  const toggleGroup = (groupName: string) => {
    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.name === groupName ? { ...group, checked: !group.checked } : group
      )
    );
  };

  const activateAll = () => {
    setGroups(prevGroups => prevGroups.map(group => ({ ...group, checked: true })));
  };

  const deactivateAll = () => {
    setGroups(prevGroups => prevGroups.map(group => ({ ...group, checked: false })));
  };

  const randomizeAll = () => {
    setGroups(prevGroups =>
      prevGroups.map(group => ({ ...group, checked: Math.random() < 0.5 }))
    );
  };

  const activateMainAndSubs = (mainGroupName: string) => {
    setGroups(prevGroups => {
      const deactivatedGroups = prevGroups.map(group => ({ ...group, checked: false }));
      const mainGroup = groupStructure.find(g => g.name === mainGroupName);
      if (mainGroup) {
        return deactivatedGroups.map(group => ({
          ...group,
          checked: group.name === mainGroupName || mainGroup.subgroups.includes(group.name)
        }));
      }
      return deactivatedGroups;
    });
  };

  const activateOnlySub = (subGroupName: string) => {
    setGroups(prevGroups => {
      const deactivatedGroups = prevGroups.map(group => ({ ...group, checked: false }));
      return deactivatedGroups.map(group => ({
        ...group,
        checked: group.name === subGroupName
      }));
    });
  };

  return (
    <CheckboxContext.Provider value={{ 
      groups, 
      toggleGroup, 
      activateAll, 
      deactivateAll, 
      randomizeAll, 
      groupStructure,
      activateMainAndSubs,
      activateOnlySub
    }}>
      {children}
    </CheckboxContext.Provider>
  );
};