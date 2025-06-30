export interface Delegate {
  address: string;
  name?: string;
  bio?: string;
  votingPower: bigint;
  participationRate: number;
}

export interface RankedDelegation {
  tokenHolder: string;
  delegates: string[];
  blockNumber: bigint;
  timestamp: number;
}

export interface Proposal {
  id: bigint;
  title: string;
  description: string;
  proposer: string;
  startBlock: bigint;
  endBlock: bigint;
  forVotes: bigint;
  againstVotes: bigint;
  abstainVotes: bigint;
  status: ProposalStatus;
}

export enum ProposalStatus {
  Pending = 0,
  Active = 1,
  Canceled = 2,
  Defeated = 3,
  Succeeded = 4,
  Queued = 5,
  Expired = 6,
  Executed = 7,
}

export enum VoteType {
  Against = 0,
  For = 1,
  Abstain = 2,
}

export interface Vote {
  proposalId: bigint;
  voter: string;
  support: VoteType;
  weight: bigint;
  reason?: string;
  params?: string;
}

export interface CascadedVote extends Vote {
  originalVoter: string;
  delegateRank: number;
  isCascaded: boolean;
}