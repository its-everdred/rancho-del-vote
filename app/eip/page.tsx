'use client';

import { useState } from 'react';
import Navigation from '../../components/Navigation';

export default function EIPPage() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-neutral-900 text-white' : 'bg-white text-black'
    }`}>
      <Navigation 
        isDark={isDark} 
        onToggleTheme={toggleTheme} 
        showThemeToggle={true} 
      />

      {/* EIP Content */}
      <main className="max-w-4xl mx-auto px-6 py-24">
        <div className={`rounded-xl border transition-colors duration-300 ${
          isDark 
            ? 'bg-neutral-800/50 border-neutral-700' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="p-8">
            {/* EIP Header */}
            <div className={`border-b pb-6 mb-8 transition-colors duration-300 ${
              isDark ? 'border-neutral-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">EIP-TBD: Ranked Delegated Voting Standard</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isDark 
                    ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-600/30' 
                    : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                }`}>
                  Draft
                </span>
              </div>
              
              <div className={`grid md:grid-cols-2 gap-4 text-sm ${
                isDark ? 'text-neutral-300' : 'text-gray-600'
              }`}>
                <div><strong>Author:</strong> [Your Name] &lt;your-email@example.com&gt;</div>
                <div><strong>Type:</strong> Standards Track</div>
                <div><strong>Category:</strong> ERC</div>
                <div><strong>Created:</strong> 2025-06-30</div>
                <div><strong>Status:</strong> Draft</div>
                <div><strong>Requires:</strong> ERC-20, ERC-5805, ERC-1202 (optional)</div>
              </div>
            </div>

            {/* EIP Content */}
            <div className="max-w-none transition-colors duration-300 space-y-6">
              <h2 className="text-2xl font-bold mb-4">Simple Summary</h2>
              <p className="mb-4 leading-relaxed">
                A standard for ranked delegated voting in Ethereum-based DAOs that allows token holders to create ordered delegation lists. 
                Voting power cascades down the list to the highest-ranked delegate who voted on a specific proposal. 
                This improves voter participation and ensures delegated tokens are actively used without compromising user control.
              </p>

              <h2 className="text-2xl font-bold mb-4">Abstract</h2>
              <p className="mb-4 leading-relaxed">
                This EIP introduces a mechanism to extend token-based delegation (as in <code>ERC20Votes</code>) to support ranked fallback delegation. 
                Users can assign a prioritized list of delegates to vote on their behalf. On a per-proposal basis, the system checks if the token holder voted; 
                if not, it checks the delegates in order until it finds one who did vote. The first such delegate receives the token holder&apos;s voting power for that proposal.
              </p>
              <p className="mb-4 leading-relaxed">
                The voting mechanism is compatible with single-option yes/no proposals and can integrate with ranked-choice voting schemes like Instant-Runoff Voting (IRV). 
                The standard is designed to work with OpenZeppelin&apos;s <code>ERC20Votes</code> and <code>Governor</code> contracts.
              </p>

              <h2 className="text-2xl font-bold mb-4">Motivation</h2>
              <p className="mb-4 leading-relaxed">In DAOs such as Optimism, a vast majority of voting power is under-utilized:</p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>~2.7% of OP tokens are actively delegated</li>
                <li>~33% of delegates miss proposals</li>
              </ul>
              <p className="mb-4 leading-relaxed">
                This leads to governance capture and apathy. Traditional delegation is fragile: if your delegate is inactive, your vote is lost. 
                A ranked delegation system ensures votes find the most active trusted representative and reduces vote wastage.
              </p>

              <h2 className="text-2xl font-bold mb-4">Specification</h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">New Functions</h3>
              
              <h4 className="text-lg font-medium mb-2 mt-4">Delegation List</h4>
              <pre className={`rounded-lg p-4 overflow-x-auto transition-colors duration-300 ${
                isDark ? 'bg-neutral-900 border border-neutral-700' : 'bg-gray-100 border border-gray-200'
              }`}>
                <code>{`/// @notice Set a ranked list of delegates (highest priority first)
function setDelegationList(address[] calldata rankedDelegates) external;

/// @notice Get the delegation list for an account
function getDelegationList(address account) external view returns (address[] memory);`}</code>
              </pre>

              <h4 className="text-lg font-medium mb-2 mt-4">Proposal Resolution</h4>
              <p className="mb-4 leading-relaxed">Integrates with <code>Governor</code>-style voting:</p>
              <ol className="list-decimal list-inside mb-4 space-y-1">
                <li>If the token holder voted directly, use their vote</li>
                <li>Else, iterate through their delegate list and assign their voting power to the first delegate who voted</li>
                <li>Else, count as abstained or uncast</li>
              </ol>
              
              <p className="mb-4 leading-relaxed">This logic can be implemented in:</p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>An off-chain vote counter (e.g. Snapshot strategy)</li>
                <li>On-chain <code>Governor</code> contract via a proposal finalization function</li>
              </ul>

              <h4 className="text-lg font-medium mb-2 mt-4">Snapshot Compatibility</h4>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>At the snapshot block (set by proposal), determine the effective vote</li>
                <li>Voter&apos;s delegate list must be fixed before the proposal snapshot</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">Rationale</h2>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li><strong>Gas efficiency:</strong> Storage is limited to an array of addresses per user</li>
                <li><strong>Override friendly:</strong> Direct voting overrides delegate votes</li>
                <li><strong>Simplicity:</strong> Easy to explain; behaves like email forwarding with a fallback</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">Backward Compatibility</h2>
              <p className="mb-4 leading-relaxed">
                The standard builds on <code>ERC20Votes</code> and <code>ERC5805</code> (for snapshotting). 
                No changes are required to token contracts; only governance modules need to support fallback logic.
              </p>

              <h2 className="text-2xl font-bold mb-4">Reference Implementation</h2>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li><a href="https://github.com/rancho-del-vote/contracts" className="text-red-500 hover:text-red-600">https://github.com/rancho-del-vote/contracts</a></li>
                <li>ENS Default Delegate Proposal (discussion): <a href="https://discuss.ens.domains/t/" className="text-red-500 hover:text-red-600">https://discuss.ens.domains/t/</a>...</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">Security Considerations</h2>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li><strong>Cyclic delegation</strong> must be disallowed or safely short-circuited</li>
                <li><strong>Griefing:</strong> Delegates could abstain intentionally; recommend transparency tooling</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">Copyright</h2>
              <p className="mb-4 leading-relaxed">Copyright and related rights waived via CC0.</p>
            </div>
          </div>
        </div>

        {/* Discussion Links */}
        <div className={`mt-8 p-6 rounded-xl border transition-colors duration-300 ${
          isDark 
            ? 'bg-neutral-800/30 border-neutral-700' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <h3 className="font-semibold text-lg mb-4">Join the Discussion</h3>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://gov.optimism.io/t/the-weight-of-influence-an-analysis-of-the-power-in-the-collective/9966"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Optimism Governance Forum →
            </a>
            <a
              href="https://github.com/its-everdred/rancho-del-vote"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-600 font-medium"
            >
              GitHub Repository →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}