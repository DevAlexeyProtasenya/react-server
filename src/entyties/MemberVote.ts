import { Timer } from "./Timer";

export interface MemberVote {
  status: MemberVoteStatus;
  currentIssue: number;
  memberVoteResult: MemberVoteTicket[];
  timer: Timer;
}

export enum MemberVoteStatus {
  BEFORE_START = 'before start',
  IN_PROGRESS = 'in progress',
  FINISHED = 'finished',
}

export interface MemberVoteTicket {
  userId: string;
  value: string;
}