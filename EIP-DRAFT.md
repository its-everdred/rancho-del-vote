---
EIP: TBD
Title: Ranked Delegated Voting Standard
Author: [everdred] <[its-everdred@gmail.com]>
Discussions-To: TBD
Status: Draft
Type: Standards Track
Category: ERC
Created: 2025-06-30
Requires: ERC-20, ERC-5805, ERC-1202 (optional)
---

# WORK IN PROGRESS

## Simple Summary

A standard for ranked delegated voting in DAOs that allows token holders to create ordered delegation lists and point their token votes to these lists. Voting power cascades down the list to the highest-ranked delegate who voted on a specific proposal. This improves voter participation and ensures delegated tokens are actively used without compromising user control.

## Abstract

This EIP introduces a mechanism to extend token-based delegation (as in `ERC20Votes`) to support ranked fallback delegation. Users can assign a prioritized list of delegates to vote on their behalf. On a per-proposal basis, the system checks if the token holder voted; if not, it checks the delegates in order until it finds one who did vote. The first such delegate receives the token holder's voting power for that proposal.

The voting mechanism is compatible with single-option yes/no proposals and can integrate with ranked-choice voting schemes like Instant-Runoff Voting (IRV). The standard is designed to work with OpenZeppelin's `ERC20Votes` and `Governor` contracts.

## Motivation

In DAOs such as Optimism, a vast majority of voting power is under-utilized:

- ~2.7% of OP tokens are actively delegated
- ~33% of delegates miss proposals

This leads to governance capture and apathy. Traditional delegation is fragile: if your delegate is inactive, your vote is lost. A ranked delegation system ensures votes find the most active trusted representative and reduces vote wastage.

### Existing Standards

Existing contract standards Governor.sol, Votes.sol are incapable of supporting ranked delegation:

1. Dynamic vote resolution during voting period
2. Multiple delegate storage per account
3. Conditional vote power transfer based on delegate activity
4. Per-proposal delegation resolution rather than global delegation

These requirements are fundamentally incompatible with the
checkpoint-based, pre-calculated voting power model used by
OpenZeppelin's Governor system in the following ways:

1. Single Delegate Model (Votes.sol)

- Line 38: mapping(address account => address) private \_delegatee;
- Problem: Each account can only delegate to one address
- Impact: Cannot store ranked delegation lists

2. Static Vote Weight Calculation (GovernorVotes.sol)

- Line 62: return token().getPastVotes(account, timepoint);
- Problem: Voting power is pre-calculated and stored in checkpoints
- Impact: Cannot perform dynamic cascading at vote time

3. Immutable Delegation Storage (Votes.sol)

- Line 169-175: \_delegate() function overwrites previous delegation
- Problem: Delegation is permanent until explicitly changed
- Impact: No concept of "fallback" or "ranked" delegates

4. Checkpoint-Based System (Votes.sol)

- Line 194-213: \_moveDelegateVotes() immediately transfers voting
  power
- Problem: Voting power is immediately transferred to delegate
- Impact: Cannot hold voting power in escrow for cascading

5. Governor Vote Counting Architecture

- Governor.sol: Expects fixed voting power per account at proposal
  snapshot
- Problem: Vote counting assumes static delegation at proposal
  creation
- Impact: Cannot dynamically resolve delegation during voting
  period

Specific Blocking Functions

ERC20Votes/Votes.sol:

- delegates() - Returns single delegate, not ranked list
- \_delegate() - Overwrites delegation, no ranking concept
- \_moveDelegateVotes() - Immediately transfers power
- getVotes() - Returns pre-calculated power, not dynamic

GovernorVotes.sol:

- \_getVotes() - Calls token().getPastVotes() for static lookup
- Cannot override without breaking checkpoint system

Governor.sol:

- Vote counting extensions expect fixed voting power
- Proposal lifecycle assumes static delegation

Summary

## Specification

WIP

## Reference Implementation

WIP
