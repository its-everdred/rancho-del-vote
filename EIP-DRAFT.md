---
EIP: TBD
Title: Ranked Delegated Voting Standard
Author: [everdred] <[its-everdred@gmail.com]>
Discussions-To: https://gov.optimism.io/t/the-weight-of-influence-an-analysis-of-the-power-in-the-collective/9966
Status: Draft
Type: Standards Track
Category: ERC
Created: 2025-06-30
Requires: ERC-20, ERC-5805, ERC-1202 (optional)
---

## Simple Summary

A standard for ranked delegated voting in Ethereum-based DAOs that allows token holders to create ordered delegation lists. Voting power cascades down the list to the highest-ranked delegate who voted on a specific proposal. This improves voter participation and ensures delegated tokens are actively used without compromising user control.

## Abstract

This EIP introduces a mechanism to extend token-based delegation (as in `ERC20Votes`) to support ranked fallback delegation. Users can assign a prioritized list of delegates to vote on their behalf. On a per-proposal basis, the system checks if the token holder voted; if not, it checks the delegates in order until it finds one who did vote. The first such delegate receives the token holder's voting power for that proposal.

The voting mechanism is compatible with single-option yes/no proposals and can integrate with ranked-choice voting schemes like Instant-Runoff Voting (IRV). The standard is designed to work with OpenZeppelin's `ERC20Votes` and `Governor` contracts.

## Motivation

In DAOs such as Optimism, a vast majority of voting power is under-utilized:

- ~2.7% of OP tokens are actively delegated
- ~33% of delegates miss proposals

This leads to governance capture and apathy. Traditional delegation is fragile: if your delegate is inactive, your vote is lost. A ranked delegation system ensures votes find the most active trusted representative and reduces vote wastage.

## Specification

### New Functions

#### Delegation List

```solidity
/// @notice Set a ranked list of delegates (highest priority first)
function setDelegationList(address[] calldata rankedDelegates) external;

/// @notice Get the delegation list for an account
function getDelegationList(address account) external view returns (address[] memory);
```

#### Proposal Resolution

Integrates with `Governor`-style voting:

1. If the token holder voted directly, use their vote
2. Else, iterate through their delegate list and assign their voting power to the first delegate who voted
3. Else, count as abstained or uncast

This logic can be implemented in:

- An off-chain vote counter (e.g. Snapshot strategy)
- On-chain `Governor` contract via a proposal finalization function

#### Snapshot Compatibility

- At the snapshot block (set by proposal), determine the effective vote
- Voter's delegate list must be fixed before the proposal snapshot

## Rationale

- **Gas efficiency**: Storage is limited to an array of addresses per user
- **Override friendly**: Direct voting overrides delegate votes
- **Simplicity**: Easy to explain; behaves like email forwarding with a fallback

## Backward Compatibility

The standard builds on `ERC20Votes` and `ERC5805` (for snapshotting). No changes are required to token contracts; only governance modules need to support fallback logic.

## Reference Implementation

- [https://github.com/rancho-del-vote/contracts](https://github.com/rancho-del-vote/contracts)
- ENS Default Delegate Proposal (discussion): [https://discuss.ens.domains/t/](https://discuss.ens.domains/t/)...

## Security Considerations

- **Cyclic delegation** must be disallowed or safely short-circuited
- **Griefing**: Delegates could abstain intentionally; recommend transparency tooling

## Copyright

Copyright and related rights waived via CC0.
