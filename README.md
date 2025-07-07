# Ranked Choice Delegation

**Ranked-Choice Delegated Voting for Ethereum DAOs**

A new governance standard that combines ranked-choice voting with cascading delegation to unlock greater participation and reduce uncast votes in DAO governance.

## The Problem

DAO governance today is rigid and ineffective:

- **Low Participation**: Only ~2.7% of OP tokens are delegated in Optimism DAO ([source](https://gov.optimism.io/t/the-weight-of-influence-an-analysis-of-the-power-in-the-collective/9966))
- **Inactive Delegates**: Delegates miss ~33% of proposals ([Oct 2024 Gov Report](https://gov.optimism.io/t/governance-report-october-2024-update/9218))
- **Binary Delegation**: Current systems only allow delegation to a single address, creating single points of failure
- **Uncast Votes**: When delegates are inactive, voting power goes unused instead of flowing to backup representatives

## The Solution: Ranked-Choice Delegation

Ranked Choice Delegation introduces a new voting mechanism where:

1. **Ranked Delegate Lists**: Token holders define a ranked list of trusted delegates (e.g., [Alice, Bob, Carol])
2. **Cascading Fallback**: If a token holder doesn't vote directly, their voting power cascades through their ranked list
3. **First-Active Wins**: The first delegate in the list who voted on that specific proposal receives the voting power
4. **Graceful Abstention**: If no delegates in the list voted, the vote is marked as abstained

## How It Works

```
Token Holder → [Delegate 1, Delegate 2, Delegate 3, ...]
                    ↓
              Did I vote directly? → YES: Use my vote
                    ↓ NO
              Did Delegate 1 vote? → YES: Use their vote
                    ↓ NO
              Did Delegate 2 vote? → YES: Use their vote
                    ↓ NO
              Did Delegate 3 vote? → YES: Use their vote
                    ↓ NO
                 ABSTAIN
```

## Key Features

- **ERC-20Votes Compatible**: Built on OpenZeppelin's proven governance standards
- **Governor Integration**: Works with existing Governor contracts and proposal systems
- **Modular Architecture**: Lightweight, extensible design for developer adoption
- **Optimism Focused**: Designed with Optimism DAO's needs and aesthetic in mind
- **Future-Ready**: Prepared for ERC-1202 and Snapshot integration

## Technical Architecture

The system preserves compatibility with current delegation and voting interfaces while adding ranked-choice functionality:

- **Smart Contracts**: Foundry-based contracts extending OpenZeppelin Governor
- **Off-Chain Indexing**: Efficient tracking of delegation rankings and vote cascading
- **Web Interface**: Next.js frontend for delegate management and voting
- **Standard Compliance**: Maintains ERC-20Votes and Governor compatibility

## Project Status

🚧 **In Development** - This is a demonstration of the proposed standard. Implementation includes:

- [x] Project foundation and documentation
- [ ] Smart contract implementation
- [ ] EIP specification draft
- [ ] Off-chain voting mechanism
- [ ] Web interface for delegate management
- [ ] Integration testing with Governor contracts

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the governance tool.

## Contributing

This project demonstrates a novel approach to DAO governance. Contributions welcome as we develop this standard for broader Ethereum ecosystem adoption.

## License

MIT
