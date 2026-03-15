import React, { useState } from 'react';
import { AnnouncementModule, RelativeTime } from '@/data/interfaces';
import { CalculateDateTime } from '@/components/functions/CalculateDateTime';
import FormattedDate from '@/components/functions/FormattedDate';
import { ThumbsUp } from 'lucide-react';
import { useMockup } from '@/context/ContextFiles/MockupContext';

interface AnnouncementSectionProps {
  module: AnnouncementModule;
}

const AnnouncementSection: React.FC<AnnouncementSectionProps> = ({ module }) => {
  const [expandedComments, setExpandedComments] = useState<boolean>(false);
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

  const announcement = module.options[0]; // Assuming there's only one announcement

  return (
      <div className="p-6">
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-2">{announcement.description}</h3>
          <p className="text-sm text-brand-950 mb-4">
            Announced by {getUsernameById(announcement.createdBy)} on {renderDateTime(announcement.createdAt)}
          </p>
          <p className="text-brand-950">{announcement.content}</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold">Comments</h4>
          <button
              onClick={() => setExpandedComments(!expandedComments)}
              className="text-brand-700 hover:underline"
          >
            {expandedComments ? 'Collapse Comments' : 'Expand Comments'}
          </button>
        </div>

        {expandedComments && (
            <ul className="space-y-4">
              {announcement.comments.map((comment) => (
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
                    <div className="space-x-2 mt-2">
                      <button className="text-brand-700 hover:underline">support</button>
                      <button className="text-brand-700 hover:underline">reply</button>
                      <button className="text-brand-700 hover:underline">report</button>
                    </div>
                  </li>
              ))}
            </ul>
        )}

        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Leave a Comment</h4>
          <textarea
              className="w-full bg-brand-0 px-3 py-2 border border-brand-950 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500"
              rows={3}
              placeholder="Type your comment here..."
          ></textarea>
          <button
              className="mt-2 bg-brand-400 text-brand-0 px-4 py-2 rounded hover:bg-brand-400 transition-colors"
              onClick={(e) => e.preventDefault()}
          >
            Submit Comment
          </button>
        </div>
      </div>
  );
};

export default AnnouncementSection;