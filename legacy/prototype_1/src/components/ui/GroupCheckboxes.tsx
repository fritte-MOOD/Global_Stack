import React, { useState } from 'react';
import { Check, X, Filter } from 'lucide-react';
import { useCheckbox } from '@/context/ContextFiles/CheckboxesContext';
import { Modal } from '@/components/Modal/modal';

export const GroupCheckboxes: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { groups, groupStructure, toggleGroup, activateAll, deactivateAll } = useCheckbox();

  const isGroupChecked = (groupName: string): boolean => {
    const group = groups.find(g => g.name === groupName);
    return group ? group.checked : false;
  };

  const areAllSubsAndTheMainChecked = (groupName: string): boolean => {
    const mainGroup = groupStructure.find(g => g.name === groupName);
    if (!mainGroup) return false;
    if (!isGroupChecked(groupName)) return false;
    for (const subgroup of mainGroup.subgroups) {
      if (!isGroupChecked(subgroup)) return false;
    }
    return true;
  };

  const handleAllMain = (groupName: string): void => {
    const mainGroup = groupStructure.find(g => g.name === groupName);
    if (!mainGroup) return;
    const allChecked = areAllSubsAndTheMainChecked(groupName);
    const newState = !allChecked;
    if (!isGroupChecked(groupName) === newState) {
      toggleGroup(groupName);
    }
    mainGroup.subgroups.forEach(subgroup => {
      if (isGroupChecked(subgroup) !== newState) {
        toggleGroup(subgroup);
      }
    });
  };

  const getGroupColor = (groupName: string, isSubgroup: boolean = false): string => {
    switch (groupName) {
      case "Park Club":
        return "bg-group-park-club-500 border-group-park-club-500";
      case "Marin Quarter":
        return "bg-group-marin-quarter-500 border-group-marin-quarter-500";
      case "Rochefort":
        return "bg-group-rochefort-500 border-group-rochefort-500";
      default:
        return "bg-gray-300 border-gray-300";
    }
  };

  const CheckboxList: React.FC = () => (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-brand-950 font-semibold">Filter Groups</h2>
        <button 
          onClick={() => setIsModalOpen(false)} 
          className="text-brand-950 hover:text-brand-550"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="mb-4 flex space-x-2">
        <button
          onClick={activateAll}
          className="px-3 py-1 bg-brand-400 text-brand-0 rounded hover:bg-gray-400 transition-colors"
        >
          Activate All
        </button>
        <button
          onClick={deactivateAll}
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
        >
          Deactivate All
        </button>
      </div>
      
      {groupStructure.map((group) => (
        <div key={group.name} className="mb-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleAllMain(group.name)}
          >
            <div className={`w-4 h-4 border-2 rounded flex items-center justify-center mr-2 ${
              areAllSubsAndTheMainChecked(group.name)
                ? getGroupColor(group.name)
                : 'border-brand-550'
            }`}>
              {areAllSubsAndTheMainChecked(group.name) &&
                <Check className="w-3 h-3 text-white" />
              }
            </div>
            <span className="text-sm text-brand-950 font-medium">All {group.name}</span>
          </div>
          
          <div className="ml-6 mt-2">
            <div
              className="flex items-center mt-1 cursor-pointer"
              onClick={() => toggleGroup(group.name)}
            >
              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center mr-2 ${
                isGroupChecked(group.name) ? getGroupColor(group.name) : 'border-brand-550'
              }`}>
                {isGroupChecked(group.name) && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-sm text-brand-950">{group.name}</span>
            </div>
            
            {group.subgroups.map((subgroup) => (
              <div
                key={subgroup}
                className="flex items-center mt-1 cursor-pointer"
                onClick={() => toggleGroup(subgroup)}
              >
                <div className={`w-4 h-4 border-2 rounded flex items-center justify-center mr-2 ${
                  isGroupChecked(subgroup) ? getGroupColor(group.name, true) : 'border-brand-550'
                }`}>
                  {isGroupChecked(subgroup) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-brand-950">{subgroup}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="mb-4 bg-brand-25 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-[416px] flex items-center justify-center px-3 py-2 bg-brand-400 text-brand-0 rounded hover:bg-brand-700 transition-colors"
        >
          <Filter size={18} className="mr-2" />
          Filter Groups
        </button>
      </div>

      <Modal
        showModal={isModalOpen}
        setShowModal={setIsModalOpen}
        className="p-0 bg-transparent"
      >
        <CheckboxList />
      </Modal>
    </>
  );
};