# Smart Contracts

This directory will contain the Foundry-based smart contracts for the Rancho Del Vote governance system.

## Planned Contracts

### Core Contracts
- `RanchoDelVoteGovernor.sol` - Main governance contract extending OpenZeppelin Governor
- `RankedDelegation.sol` - Manages ranked delegation lists and vote cascading logic
- `RanchoToken.sol` - ERC20Votes compatible governance token for testing

### Extensions
- `RankedDelegationStorage.sol` - Optimized storage for delegation data
- `VoteCascading.sol` - Core logic for vote cascading through ranked lists
- `GovernorRankedDelegation.sol` - Governor extension with ranked delegation support

## Standards Compatibility

- **ERC-20Votes**: Full compatibility with existing token delegation
- **Governor**: Extends OpenZeppelin's Governor contracts
- **ERC-1202**: Prepared for future voting standard integration

## Development Setup

```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Initialize Foundry project
forge init

# Install OpenZeppelin contracts
forge install openzeppelin/openzeppelin-contracts
```

## Testing Strategy

- Unit tests for each contract component
- Integration tests with existing Governor contracts
- Gas optimization benchmarks
- Compatibility tests with major DAO tooling