import React, { useState } from 'react';
import { ExternalDecisionModule, RelativeTime, Option } from '@/data/interfaces';
import { CalculateDateTime } from '@/components/functions/CalculateDateTime';
import FormattedDate from '@/components/functions/FormattedDate';
import { useMockup } from '@/context/ContextFiles/MockupContext';

interface ExternalDecisionSectionProps {
    module: ExternalDecisionModule;
}

const ExternalDecisionSection: React.FC<ExternalDecisionSectionProps> = ({ module }) => {
    const [expandedOptions, setExpandedOptions] = useState<number[]>([]);
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

    const toggleOption = (optionId: number) => {
        setExpandedOptions(prev =>
            prev.includes(optionId)
                ? prev.filter(id => id !== optionId)
                : [...prev, optionId]
        );
    };

    const renderOption = (option: Option) => (
        <div key={option.id} className="mb-6 bg-brand-0 p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold">{option.description}</h4>
                <span className={`px-2 py-1 rounded ${option.content.toLowerCase().includes('approved') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {option.content}
        </span>
            </div>
            <p className="text-sm text-brand-950 mb-2">
                Decision by {getUsernameById(option.createdBy)} on {renderDateTime(option.createdAt)}
            </p>
            <button
                onClick={() => toggleOption(option.id)}
                className="text-brand-700 hover:underline mb-2"
            >
                {expandedOptions.includes(option.id) ? 'Hide Explanation' : 'Show Explanation'}
            </button>
            {expandedOptions.includes(option.id) && (
                <div>
                    <ul className="space-y-4 mt-4">
                        {option.comments.map((comment) => (
                            <li key={comment.id} className="bg-brand-550 p-4 rounded">
                                <div className="flex items-center mb-2">
                                    <p className="font-semibold">
                                        <span className="font-normal">{comment.content}</span>
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

    return (
        <div className="p-6">
            <h3 className="text-2xl font-semibold mb-4">External Decision</h3>
            <p className="mb-6 text-brand-950">{module.content}</p>
            {module.options.map(renderOption)}
        </div>
    );
};

export default ExternalDecisionSection;