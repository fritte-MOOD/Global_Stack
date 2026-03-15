import React, { useState } from 'react';
import { VoteModule } from '@/data/interfaces';

interface VoteSectionProps {
  module: VoteModule;
}

const VoteSection: React.FC<VoteSectionProps> = ({ module }) => {
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const sortedOptions = [...module.options].sort((a, b) => b.rank - a.rank);

  return (
      <div>
        <h3 className="text-2xl font-semibold mb-2">Vote Module</h3>
        <p className="mb-4 text-brand-950">{module.description}</p>
        <p className="mb-6 text-brand-950">{module.content}</p>

        {!showResults ? (
            <form onSubmit={handleSubmit}>
              {sortedOptions.map((option) => (
                  <div key={option.id} className="mb-6 bg-brand-0 p-4 rounded-lg shadow">
                    <label className="flex items-center cursor-pointer">
                      <input
                          type="radio"
                          name="voteOption"
                          value={option.id}
                          checked={selectedOption === option.id}
                          onChange={() => handleOptionSelect(option.id)}
                          className="mr-3 appearance-none w-4 h-4 border border-brand-400 rounded-full checked:bg-brand-400 checked:border-transparent focus:outline-none"
                      />
                      <div>
                        <p className="font-semibold mb-2">{option.content}</p>
                        <p className="text-sm text-brand-950">{option.description}</p>
                      </div>
                    </label>
                  </div>
              ))}
              <button
                  type="submit"
                  className="bg-brand-400 text-brand-0 px-4 py-2 rounded hover:bg-brand-400 transition-colors"
                  disabled={selectedOption === null}
              >
                Submit Vote
              </button>
            </form>
        ) : (
            <div>
              <h4 className="text-xl font-semibold mb-4">
                Results after {sortedOptions.reduce((total, option) => total + option.supportedBy.length, 0)} submitted votes:
              </h4>
              {sortedOptions.map((option, index) => (
                  <div key={option.id} className="mb-4 bg-brand-0 p-4 rounded-lg shadow">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold mr-4">{index + 1}</span>
                      <div className="flex-grow">
                        <p className="font-semibold">{option.content}</p>
                        <p className="text-sm text-brand-950">{option.description}</p>
                        <div className="mt-2 bg-brand-550 rounded-full">
                          <div
                              className="bg-brand-400 text-xs font-medium text-black text-center p-0.5 leading-none rounded-full"
                              style={{ width: `${(option.rank / sortedOptions.reduce((total, opt) => total + opt.rank, 0)) * 100}%` }}
                          >
                            {option.rank} votes ({((option.rank / sortedOptions.reduce((total, opt) => total + opt.rank, 0)) * 100).toFixed(1)}%)
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

export default VoteSection;