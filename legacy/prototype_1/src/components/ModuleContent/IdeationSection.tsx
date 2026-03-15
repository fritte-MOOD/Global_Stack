import React, { useState } from 'react';
import { IdeationModule, RelativeTime } from '@/data/interfaces';
import { CalculateDateTime } from '@/components/functions/CalculateDateTime';
import FormattedDate from '@/components/functions/FormattedDate';
import { ThumbsUp } from 'lucide-react';
import { useMockup } from '@/context/ContextFiles/MockupContext';

interface IdeationSectionProps {
  module: IdeationModule;
}

const IdeationSection: React.FC<IdeationSectionProps> = ({ module }) => {
  const [expandedOptions, setExpandedOptions] = useState<number[]>([]);
  const mockupData = useMockup();

  const toggleOption = (optionId: number) => {
    setExpandedOptions(prev =>
        prev.includes(optionId)
            ? prev.filter(id => id !== optionId)
            : [...prev, optionId]
    );
  };

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
        <h3 className="text-2xl font-semibold mb-2">Ideation Module</h3>
        <p className="mb-4 text-brand-950">{module.description}</p>
        <p className="mb-6 text-brand-950">{module.content}</p>

        <div className="flex justify-end mb-4">
          <button
              onClick={() => setExpandedOptions(expandedOptions.length === module.options.length ? [] : module.options.map(option => option.id))}
              className="bg-brand-400 text-brand-0 px-4 py-2 rounded hover:bg-brand-400 transition-colors"
          >
            {expandedOptions.length === module.options.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
        <h3 className="text-2xl font-semibold mb-2">Collect Ideas:</h3>
        {module.options.map((option) => (
            <div
                key={option.id}
                className="bg-brand-0 border border-brand-400 shadow-md rounded-lg mb-6"
            >
              <div
                  className="p-4 cursor-pointer"
                  onClick={() => toggleOption(option.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-lg font-semibold mb-2">{option.description}</p>
                    <p className="text-brand-950 mb-2">{option.content}</p>
                    <div className="flex items-center text-sm text-brand-950">
                      <span className="mr-2">By: {getUsernameById(option.createdBy)}</span>
                      <span>•</span>
                      <span className="ml-2">{renderDateTime(option.createdAt)}</span>
                    </div>
                  </div>
                  <span className="bg-brand-100 text-brand-700 font-semibold px-3 py-1 rounded-full flex items-center">
                <ThumbsUp size={16} className="mr-1" /> {option.supportedBy.length}
              </span>
                </div>
              </div>
              {expandedOptions.includes(option.id) && (
                  <div className="mt-4 p-4 border-t border-brand-550">
                    <div className="flex items-center">
                <span className="bg-brand-100 text-brand-700 font-semibold px-3 py-1 rounded-full mr-3 flex items-center invisible">
                  <ThumbsUp size={16} className="mr-1" /> {option.supportedBy.length}
                </span>
                    </div>

                    <h4 className="font-semibold mb-2">Comments:</h4>
                    <ul className="space-y-4 pl-6">
                      {option.comments.map((comment) => (
                          <li key={comment.id} className="bg-brand-550 p-4 rounded">
                            <div className="flex items-center mb-2">
                      <span className="bg-brand-100 text-brand-700 font-semibold px-3 py-1 rounded-full mr-3 flex items-center">
                        <ThumbsUp size={16} className="mr-1" /> {comment.supportedBy.length}
                      </span>
                              <p className="font-semibold">
                                {getUsernameById(comment.createdBy)}: <span className="font-normal">{comment.content}</span>
                              </p>
                            </div>
                            <p className="text-sm text-brand-950 mt-2">
                              {renderDateTime(comment.createdAt)}
                            </p>
                            <div className="space-x-2 mb-4">
                              <button className="text-brand-700 hover:underline">support</button>
                              <button className="text-brand-700 hover:underline">comment</button>
                              <button className="text-brand-700 hover:underline">report</button>
                            </div>
                            {comment.comments && comment.comments.length > 0 && (
                                <ul className="mt-2 space-y-2 pl-4">
                                  {comment.comments.map((subComment) => (
                                      <li key={subComment.id} className="bg-brand-550 p-2 rounded">
                                        <div className="flex items-center mb-1">
                              <span className="bg-brand-100 text-brand-700 font-semibold px-2 py-0.5 rounded-full mr-2 flex items-center text-xs">
                                <ThumbsUp size={12} className="mr-1" /> {subComment.supportedBy.length}
                              </span>
                                          <p className="font-semibold">
                                            {getUsernameById(subComment.createdBy)}: <span className="font-normal">{subComment.content}</span>
                                          </p>
                                        </div>
                                        <p className="text-xs text-brand-950">
                                          {renderDateTime(subComment.createdAt)}
                                        </p>
                                        <div className="mt-2 space-x-2">
                                          <button className="text-brand-700 hover:underline">support</button>
                                          <button className="text-brand-700 hover:underline">comment</button>
                                          <button className="text-brand-700 hover:underline">report</button>
                                        </div>
                                      </li>
                                  ))}
                                </ul>
                            )}
                          </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <input
                          type="text"
                          placeholder="Leave a comment on this idea..."
                          className="w-full px-3 py-2 border border-brand-950 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500"
                      />
                    </div>
                  </div>
              )}
            </div>
        ))}

        <h3 className="text-xl font-semibold mb-4">Submit New Idea</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-brand-950 mb-2">
              Description
            </label>
            <input
                type="text"
                id="description"
                name="description"
                className="w-full bg-brand-0 px-3 py-2 border border-brand-950 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500"
                placeholder="Enter idea description"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-brand-950 mb-2">
              Content
            </label>
            <textarea
                id="content"
                name="content"
                rows={4}
                className="w-full bg-brand-0 px-3 py-2 border border-brand-950 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500"
                placeholder="Enter idea content"
            ></textarea>
          </div>
          <button
              type="button"
              className="bg-brand-400 text-brand-0 px-4 py-2 rounded hover:bg-brand-400 transition-colors"
              onClick={(e) => e.preventDefault()}
          >
            Submit Idea
          </button>
        </form>
      </>
  );
};

export default IdeationSection;