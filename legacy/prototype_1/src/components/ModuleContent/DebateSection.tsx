import React, { useState } from 'react';
import { DebateModule, RelativeTime } from '@/data/interfaces';
import { CalculateDateTime } from '@/components/functions/CalculateDateTime';
import FormattedDate from '@/components/functions/FormattedDate';
import { ThumbsUp } from 'lucide-react';
import { useMockup } from '@/context/ContextFiles/MockupContext';

interface DebateSectionProps {
  module: DebateModule;
}

const DebateSection: React.FC<DebateSectionProps> = ({ module }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const mockupData = useMockup();

  const getUsernameById = (userId: number): string => {
    for (const group of mockupData) {
      const user = group.members.find(member => member.id === userId);
      if (user) return user.name;

      for (const subgroup of group.subgroups) {
        const subgroupUser = subgroup.members.find(member => member.id === userId);
        if (subgroupUser) return subgroupUser.name;
      }
    }
    return "Unknown User";
  };

  const renderDateTime = (relativeTime: RelativeTime) => {
    const date = CalculateDateTime(relativeTime.time, relativeTime.distance);
    return <FormattedDate date={date} />;
  };

  return (
      <>
        <h3 className="text-2xl font-semibold mb-2">{module.description}</h3>
        <p className="mb-6 text-brand-950">{module.content}</p>

        <div className="flex justify-center mb-6">
          {module.options.map((option) => (
              <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`mx-2 px-20 py-2 rounded ${
                      selectedOption === option.id
                          ? 'bg-brand-400 text-brand-0'
                          : 'bg-brand-550 text-brand-950 hover:bg-brand-550'
                  }`}
              >
                {option.description}
              </button>
          ))}
        </div>

        {selectedOption && (
            <div className="p-6">
              {module.options
                  .find((option) => option.id === selectedOption)
                  ?.comments.map((comment) => (
                      <div key={comment.id} className="mb-6">
                        <div className="flex items-center mb-2">
                  <span className="bg-brand-100 text-brand-700 font-semibold px-3 py-1 rounded-full mr-3 flex items-center">
                    <ThumbsUp size={16} className="mr-1" /> {comment.supportedBy.length}
                  </span>
                          <p className="font-semibold">
                            {getUsernameById(comment.createdBy)}: <span className="font-normal">{comment.content}</span>
                          </p>
                        </div>
                        <p className="text-sm text-brand-950 mb-2">
                          {renderDateTime(comment.createdAt)}
                        </p>
                        <div className="space-x-2 mb-4">
                          <button className="text-brand-700 hover:underline">support</button>
                          <button className="text-brand-700 hover:underline">comment</button>
                          <button className="text-brand-700 hover:underline">report</button>
                        </div>
                        {comment.comments && (
                            <ul className="pl-6 space-y-4">
                              {comment.comments.map((subComment) => (
                                  <li key={subComment.id} className="bg-brand-550 p-4 rounded">
                                    <div className="flex items-center mb-1">
                          <span className="bg-brand-100 text-brand-700 font-semibold px-2 py-0.5 rounded-full mr-2 flex items-center text-xs">
                            <ThumbsUp size={12} className="mr-1" /> {subComment.supportedBy.length}
                          </span>
                                      <p className="font-semibold">
                                        {getUsernameById(subComment.createdBy)}: <span className="font-normal">{subComment.content}</span>
                                      </p>
                                    </div>
                                    <p className="text-xs text-brand-950 mb-2">
                                      {renderDateTime(subComment.createdAt)}
                                    </p>
                                    <div className="space-x-2">
                                      <button className="text-brand-700 hover:underline">support</button>
                                      <button className="text-brand-700 hover:underline">comment</button>
                                      <button className="text-brand-700 hover:underline">report</button>
                                    </div>
                                  </li>
                              ))}
                            </ul>
                        )}
                      </div>
                  ))}
              <div className="mt-4">
                <input
                    type="text"
                    placeholder="Add a new argument..."
                    className="w-full bg-brand-0 px-3 py-2 border border-brand-950 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
            </div>
        )}
      </>
  );
};

export default DebateSection;