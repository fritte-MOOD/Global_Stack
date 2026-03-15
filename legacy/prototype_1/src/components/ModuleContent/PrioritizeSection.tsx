import React, { useState } from 'react';
import { PrioritizeModule as PrioritizeModuleType } from '@/data/interfaces';

interface PrioritizeModuleProps {
  module: PrioritizeModuleType;
}

const PrioritizeSection: React.FC<PrioritizeModuleProps> = ({ module }) => {
  const [showResults, setShowResults] = useState(false);
  const [preferences, setPreferences] = useState<{[key: number]: number}>(
      module.options.reduce((acc: {[key: number]: number}, idea) => ({ ...acc, [idea.id]: 50 }), {})
  );

  const handleSliderChange = (ideaId: number, value: number) => {
    setPreferences(prev => ({ ...prev, [ideaId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const voteCountOption = module.options.find(option => option.id === 0);
  const sortedIdeas = voteCountOption
      ? [...module.options].filter(idea => idea.id !== 0).sort((a, b) => b.rank - a.rank)
      : [...module.options].sort((a, b) => b.rank - a.rank);

  const getSubmittedVotesText = () => {
    if (voteCountOption) {
      return `Results after ${voteCountOption.rank} submitted votes:`;
    } else {
      const totalVotes = sortedIdeas.reduce((total, idea) => total + idea.supportedBy.length, 0);
      return `Results after ${totalVotes} submitted votes:`;
    }
  };

  return (
      <div>
        <h3 className="text-2xl font-semibold mb-2">Prioritize Module</h3>
        <p className="mb-4 text-brand-950">{module.description}</p>
        <p className="mb-6 text-brand-950">{module.content}</p>

        {!showResults ? (
            <form onSubmit={handleSubmit}>
              {sortedIdeas.map((idea) => (
                  <div key={idea.id} className="mb-6 bg-brand-0 p-4 rounded-lg shadow">
                    <p className="font-semibold mb-2">{idea.content}</p>
                    <p className="text-sm text-brand-950 mb-4">{idea.description}</p>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={preferences[idea.id]}
                        onChange={(e) => handleSliderChange(idea.id, parseInt(e.target.value))}
                        className="w-full appearance-none bg-brand-550 h-2 rounded-full"
                        style={{
                          background: `linear-gradient(to right, #fba762 0%, #fba762 ${preferences[idea.id]}%, #F7FAFD ${preferences[idea.id]}%, #F7FAFD 100%)`
                        }}
                    />
                    <div className="flex justify-between text-sm text-brand-950">
                      <span>0%</span>
                      <span>{preferences[idea.id]}%</span>
                      <span>100%</span>
                    </div>
                  </div>
              ))}
              <button
                  type="submit"
                  className="bg-brand-400 text-brand-0 px-4 py-2 rounded hover:bg-brand-400 transition-colors"
              >
                Submit Preferences
              </button>
            </form>
        ) : (
            <div>
              <h4 className="text-xl font-semibold mb-4">
                {getSubmittedVotesText()}
              </h4>
              {sortedIdeas.map((idea, index) => (
                  <div key={idea.id} className="mb-4 bg-brand-0 p-4 rounded-lg shadow">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold mr-4">{index + 1}</span>
                      <div className="flex-grow">
                        <p className="font-semibold">{idea.content}</p>
                        <p className="text-sm text-brand-950">{idea.description}</p>
                        <div className="mt-2 bg-brand-550 rounded-full">
                          <div
                              className="bg-brand-400 text-xs font-medium text-black text-center p-0.5 leading-none rounded-full"
                              style={{ width: `${idea.rank}%` }}
                          >
                            {idea.rank}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default PrioritizeSection;