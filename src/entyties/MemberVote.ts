import { Timer } from "./Timer";

export interface MemberVote {
  status: MemberVoteStatus;
  currentIssue: number;
  memberVoteResult: MemberVoteTicket[];
  timer: Timer;
}

export enum MemberVoteStatus {
  BEFORE_START, IN_PROGRESS, FINISHED
}

export interface MemberVoteTicket {
  userId: string;
  value: string;
}