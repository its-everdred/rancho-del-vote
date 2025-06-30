export const OPTIMISM_COLORS = {
  primary: '#dc2626', // red-600
  primaryHover: '#b91c1c', // red-700
  light: '#fef2f2', // red-50
  border: '#fecaca', // red-200
} as const;

export const GOVERNANCE_CONSTANTS = {
  MAX_DELEGATES: 10,
  MIN_VOTING_PERIOD: 3600, // 1 hour in seconds
  DEFAULT_VOTING_PERIOD: 86400 * 7, // 1 week in seconds
  QUORUM_PERCENTAGE: 4, // 4% quorum
} as const;

export const CHAIN_IDS = {
  MAINNET: 1,
  OPTIMISM: 10,
  SEPOLIA: 11155111,
  OPTIMISM_SEPOLIA: 11155420,
} as const;

export const MOCK_DELEGATES = [
  {
    address: '0x1234567890123456789012345678901234567890',
    name: 'Alice Johnson',
    bio: 'DeFi researcher and governance advocate',
    votingPower: 1500000n,
    participationRate: 0.92,
  },
  {
    address: '0x2345678901234567890123456789012345678901',
    name: 'Bob Smith',
    bio: 'Core contributor to Optimism ecosystem',
    votingPower: 2300000n,
    participationRate: 0.85,
  },
  {
    address: '0x3456789012345678901234567890123456789012',
    name: 'Carol Davis',
    bio: 'Smart contract security expert',
    votingPower: 950000n,
    participationRate: 0.78,
  },
] as const;