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

## Specification

WIP

## Reference Implementation

WIP
