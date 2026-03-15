export interface RelativeTime {
  time: string;
  distance: number;
}

export interface Message {
  new: boolean;
  at: RelativeTime;
  sentBy: number;
  supportedBy: number[];
  content: string;
}

export interface Chat {
  id: number;
  members: number[];
  messages: Message[];
}

export interface Member {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  done: boolean;
  dueAt: RelativeTime;
  assignedBy: number;
  description: string;
  content: string;
}

export interface Appointment {
  id: number;
  at: RelativeTime;
  createdBy: number;
  invited: number[];
  accepted: number[];
  declined: number[];
  description: string;
  content: string;
}

export interface Comment {
  id: number;
  new: boolean;
  createdAt: RelativeTime;
  createdBy: number;
  supportedBy: number[];
  content: string;
  comments: Comment[];
}

export interface Option {
  id: number;
  new: boolean;
  createdAt: RelativeTime;
  createdBy: number;
  supportedBy: number[];
  rank: number;
  description: string;
  content: string;
  comments: Comment[];
}

export interface BaseModule {
  id: number;
  dueAt: RelativeTime;
  type: string;
  description: string;
  content: string;
}

export interface IdeationModule extends BaseModule {
  type: "Ideation";
  options: Option[];
}

export interface EstimateModule extends BaseModule {
  type: "Estimate";
  options: Option[];
}

export interface PrioritizeModule extends BaseModule {
  type: "Prioritize";
  options: Option[];
}

export interface VoteModule extends BaseModule {
  type: "Vote";
  options: Option[];
}

export interface DebateModule extends BaseModule {
  type: "Debate";
  options: Option[];
}

export interface ExternalDecisionModule extends BaseModule {
  type: "ExternalDecision";
  options: Option[];
}

export interface BrainstormingModule extends BaseModule {
  type: "Brainstorming";
  options: Option[];
}

export interface AnnouncementModule extends BaseModule {
  type: "Announcement";
  options: Option[];
}

export type Module =
  IdeationModule
  | EstimateModule
  | PrioritizeModule
  | VoteModule
  | DebateModule
  | ExternalDecisionModule
  | BrainstormingModule
  | AnnouncementModule;

export interface Process {
  id: number;
  new: boolean;
  public: boolean;
  active: boolean;
  createdAt: RelativeTime;
  dueAt: RelativeTime;
  creator: number;
  description: string;
  content: string;
  modules: Module[];
}

export interface Group {
  isPublic: boolean;
  name: string;
  IAmMember: boolean;
  description: string;
  content: string;
  rules: string;
  subgroups: Group[];
  members: Member[];
  chats: Chat[];
  tasks: Task[];
  appointments: Appointment[];
  processes: Process[];
}