import React, { useEffect, useState } from 'react';
import { CalculateDateTime } from '@/components/functions/CalculateDateTime';
import FormattedDate from '@/components/functions/FormattedDate';
import PrioritizeSection from "./PrioritizeSection"
import IdeationSection from "./IdeationSection"
import EstimateSection from "./EstimateSection"
import VoteSection from "./VoteSection"
import DebateSection from "./DebateSection"
import ExternalDecisionSection from "./ExternalDecisionSection"
import AnnouncementSection from "./AnnouncementSection"

import {
  IdeationModule,
  EstimateModule,
  PrioritizeModule,
  VoteModule,
  DebateModule,
  ExternalDecisionModule,
  BrainstormingModule,
  AnnouncementModule,
  RelativeTime
} from '@/data/interfaces';

type ModuleType =
  | IdeationModule
  | EstimateModule
  | PrioritizeModule
  | VoteModule
  | DebateModule
  | ExternalDecisionModule
  | BrainstormingModule
  | AnnouncementModule;

interface ModuleContentProps {
  module: ModuleType;
}

export const renderDateTime = (relativeTime: RelativeTime) => {
  const date = CalculateDateTime(relativeTime.time, relativeTime.distance);
  return <FormattedDate date={date} />;
};

export const ModuleContent: React.FC<ModuleContentProps> = ({ module }) => {
  const [preferences, setPreferences] = useState<{[key: number]: number}>({});

  useEffect(() => {
    if (module.type === 'Prioritize') {
      setPreferences(module.options.reduce((acc, idea) => ({ ...acc, [idea.id]: 50 }), {}));
    }
  }, [module]);

  switch (module.type) {
    case 'Ideation':
      return <IdeationSection module={module} />;
    case 'Estimate':
      return <EstimateSection module={module} />;
    case 'Prioritize':
      return <PrioritizeSection module={module} />;
    case 'Vote':
      return <VoteSection module={module} />;
    case 'Debate':
      return <DebateSection module={module} />;
    case 'ExternalDecision':
      return <ExternalDecisionSection module={module} />;
    case 'Announcement':
      return <AnnouncementSection module={module} />;
    default:
      return <p>Unknown module type</p>
  }
}