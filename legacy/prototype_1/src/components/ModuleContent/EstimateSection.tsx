import React, { useState } from 'react';
import { EstimateModule } from '@/data/interfaces';
import { useMockup } from '@/context/ContextFiles/MockupContext';
import { renderDateTime } from './moduleContent';

interface EstimateSectionProps {
  module: EstimateModule;
}

const EstimateSection: React.FC<EstimateSectionProps> = ({ module }) => {
  const [expandedIdeas, setExpandedIdeas] = useState<number[]>([]);
  const mockupData = useMockup();

  const toggleIdea = (ideaId: number) => {
    setExpandedIdeas(prev =>
      prev.includes(ideaId)
        ? prev.filter(id => id !== ideaId)
        : [...prev, ideaId]
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

  return (
    <>
      <h3 className="text-2xl font-semibold mb-2">Estimate Module</h3>
      <p className="mb-4 text-brand-950">{module.description}</p>
      <p className="mb-6 text-brand-950">{module.content}</p>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setExpandedIdeas(expandedIdeas.length === module.options.length ? [] : module.options.map(idea => idea.id))}
          className="bg-brand-400 text-brand-0 px-4 py-2 rounded hover:bg-brand-400 transition-colors"
        >
          {expandedIdeas.length === module.options.length ? 'Collapse All' : 'Expand All'}
        </button>
      </div>
      <h3 className="text-2xl font-semibold mb-2">Estimate potential Consequences:</h3>
      {module.options.map((idea) => (
        <div
          key={idea.id}
          className="bg-brand-0 border border-brand-900 rounded-lg mb-6"
        >
          <div
            className="p-4 cursor-pointer"
            onClick={() => toggleIdea(idea.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <div>
                  <p className="text-lg font-semibold">
                    <span className="font-normal">{idea.description}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {expandedIdeas.includes(idea.id) && (
            <div className="mt-4 p-4 border-t border-brand-550">
              <div className="flex items-center">
                <div>
                  <p className="text-brand-950 mb-2">{idea.content}</p>
                </div>
              </div>

              <h4 className="font-semibold mb-2">Consequences:</h4>
              <ul className="space-y-4 pl-6">
                {idea.comments.map((comment) => (
                  <li key={comment.id} className="bg-brand-550 p-4 rounded">
                    <div className="flex items-center mb-2">
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
                  placeholder="Leave a comment..."
                  className="w-full bg-brand-0 px-3 py-2 border border-brand-950 rounded-md focus:outline-none focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default EstimateSection;