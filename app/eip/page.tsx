"use client";

import { useState } from "react";
import Navigation from "../../components/Navigation";

export default function EIPPage() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-neutral-900 text-white" : "bg-white text-black"
      }`}
    >
      <Navigation
        isDark={isDark}
        onToggleTheme={toggleTheme}
        showThemeToggle={true}
      />

      {/* EIP Content */}
      <main className="max-w-4xl mx-auto px-6 py-24">
        <div
          className={`rounded-xl border transition-colors duration-300 ${
            isDark
              ? "bg-neutral-800/50 border-neutral-700"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="p-8">
            {/* EIP Header */}
            <div
              className={`border-b pb-6 mb-8 transition-colors duration-300 ${
                isDark ? "border-neutral-700" : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">
                  EIP-TBD: Ranked Delegated Voting Standard
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isDark
                      ? "bg-yellow-900/30 text-yellow-400 border border-yellow-600/30"
                      : "bg-yellow-100 text-yellow-800 border border-yellow-300"
                  }`}
                >
                  Work in Progress
                </span>
              </div>

              <div
                className={`grid md:grid-cols-2 gap-4 text-sm ${
                  isDark ? "text-neutral-300" : "text-gray-600"
                }`}
              >
                <div>
                  <strong>Author:</strong> [everdred]
                  &lt;its-everdred@gmail.com&gt;
                </div>
                <div>
                  <strong>Type:</strong> Standards Track
                </div>
                <div>
                  <strong>Category:</strong> ERC
                </div>
                <div>
                  <strong>Created:</strong> 2025-06-30
                </div>
                <div>
                  <strong>Status:</strong> Draft
                </div>
                <div>
                  <strong>Requires:</strong> ERC-20, ERC-5805, ERC-1202
                  (optional)
                </div>
              </div>
            </div>

            {/* EIP Content */}
            <div className="max-w-none transition-colors duration-300 space-y-6">
              <h2 className="text-2xl font-bold mb-4">Simple Summary</h2>
              <p className="mb-4 leading-relaxed">
                A standard for ranked delegated voting in DAOs that allows token
                holders to create ordered delegation lists and point their token
                votes to these lists. Voting power cascades down the list to the
                highest-ranked delegate who voted on a specific proposal. This
                improves voter participation and ensures delegated tokens are
                actively used without compromising user control.
              </p>

              <h2 className="text-2xl font-bold mb-4">Abstract</h2>
              <p className="mb-4 leading-relaxed">
                This EIP introduces a mechanism to extend token-based delegation
                (as in{" "}
                <code
                  className={`px-1 py-0.5 rounded text-sm ${
                    isDark ? "bg-neutral-700" : "bg-gray-200"
                  }`}
                >
                  ERC20Votes
                </code>
                ) to support ranked fallback delegation. Users can assign a
                prioritized list of delegates to vote on their behalf. On a
                per-proposal basis, the system checks if the token holder voted;
                if not, it checks the delegates in order until it finds one who
                did vote. The first such delegate receives the token
                holder&apos;s voting power for that proposal.
              </p>
              <p className="mb-4 leading-relaxed">
                The voting mechanism is compatible with single-option yes/no
                proposals and can integrate with ranked-choice voting schemes
                like Instant-Runoff Voting (IRV). The standard is designed to
                work with OpenZeppelin&apos;s{" "}
                <code
                  className={`px-1 py-0.5 rounded text-sm ${
                    isDark ? "bg-neutral-700" : "bg-gray-200"
                  }`}
                >
                  ERC20Votes
                </code>{" "}
                and{" "}
                <code
                  className={`px-1 py-0.5 rounded text-sm ${
                    isDark ? "bg-neutral-700" : "bg-gray-200"
                  }`}
                >
                  Governor
                </code>{" "}
                contracts.
              </p>

              <h2 className="text-2xl font-bold mb-4">Motivation</h2>
              <p className="mb-4 leading-relaxed">
                In DAOs such as Optimism, a vast majority of voting power is
                under-utilized:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>~2.7% of OP tokens are actively delegated</li>
                <li>~33% of delegates miss proposals</li>
              </ul>
              <p className="mb-4 leading-relaxed">
                This leads to governance capture and apathy. Traditional
                delegation is fragile: if your delegate is inactive, your vote
                is lost. A ranked delegation system ensures votes find the most
                active trusted representative and reduces vote wastage.
              </p>

              <h3 className="text-xl font-semibold mb-3">
                Limitations of Existing Standards
              </h3>
              <p className="mb-4 leading-relaxed">
                Existing contract standards Governor.sol, Votes.sol,
                GovernorVotes.sol are incapable of supporting ranked delegation
                as-is:
              </p>
              <ol className="list-decimal list-inside mb-4 space-y-1">
                <li>Dynamic vote resolution during voting period</li>
                <li>Multiple delegate storage per account</li>
                <li>
                  Conditional vote power transfer based on delegate activity
                </li>
                <li>
                  Per-proposal delegation resolution rather than global
                  delegation
                </li>
              </ol>
              <p className="mb-4 leading-relaxed">
                These requirements are fundamentally incompatible with the
                checkpoint-based, pre-calculated voting power model used by
                OpenZeppelin&apos;s Governor system in the following ways:
              </p>

              <h3 className="text-lg font-medium mb-2 mt-4">
                Specific Blocking Functions
              </h3>
              <p className="mb-2 font-semibold">ERC20Votes/Votes.sol:</p>
              <ul className="list-disc list-inside mb-4 space-y-1 ml-4">
                <li>
                  <code
                    className={`px-1 py-0.5 rounded text-sm ${
                      isDark ? "bg-neutral-700" : "bg-gray-200"
                    }`}
                  >
                    delegates()
                  </code>{" "}
                  - Returns single delegate, not ranked list
                </li>
                <li>
                  <code
                    className={`px-1 py-0.5 rounded text-sm ${
                      isDark ? "bg-neutral-700" : "bg-gray-200"
                    }`}
                  >
                    _delegate()
                  </code>{" "}
                  - Overwrites delegation, no ranking concept
                </li>
                <li>
                  <code
                    className={`px-1 py-0.5 rounded text-sm ${
                      isDark ? "bg-neutral-700" : "bg-gray-200"
                    }`}
                  >
                    _moveDelegateVotes()
                  </code>{" "}
                  - Immediately transfers power
                </li>
                <li>
                  <code
                    className={`px-1 py-0.5 rounded text-sm ${
                      isDark ? "bg-neutral-700" : "bg-gray-200"
                    }`}
                  >
                    getVotes()
                  </code>{" "}
                  - Returns pre-calculated power, not dynamic
                </li>
              </ul>

              <p className="mb-2 font-semibold">GovernorVotes.sol:</p>
              <ul className="list-disc list-inside mb-4 space-y-1 ml-4">
                <li>
                  <code
                    className={`px-1 py-0.5 rounded text-sm ${
                      isDark ? "bg-neutral-700" : "bg-gray-200"
                    }`}
                  >
                    _getVotes()
                  </code>{" "}
                  - Calls token().getPastVotes() for static lookup
                </li>
                <li>Cannot override without breaking checkpoint system</li>
              </ul>

              <p className="mb-2 font-semibold">Governor.sol:</p>
              <ul className="list-disc list-inside mb-4 space-y-1 ml-4">
                <li>Vote counting extensions expect fixed voting power</li>
                <li>Proposal lifecycle assumes static delegation</li>
              </ul>

              <h4 className="text-lg font-medium mb-2 mt-4">
                Detailed Limitations
              </h4>

              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">
                    1. Single Delegate Model (Votes.sol)
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      Line 38:{" "}
                      <code
                        className={`px-1 py-0.5 rounded text-sm ${
                          isDark ? "bg-neutral-700" : "bg-gray-200"
                        }`}
                      >
                        mapping(address account =&gt; address) private
                        _delegatee;
                      </code>
                    </li>
                    <li>
                      <strong>Problem:</strong> Each account can only delegate
                      to one address
                    </li>
                    <li>
                      <strong>Impact:</strong> Cannot store ranked delegation
                      lists
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">
                    2. Static Vote Weight Calculation (GovernorVotes.sol)
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      Line 62:{" "}
                      <code
                        className={`px-1 py-0.5 rounded text-sm ${
                          isDark ? "bg-neutral-700" : "bg-gray-200"
                        }`}
                      >
                        return token().getPastVotes(account, timepoint);
                      </code>
                    </li>
                    <li>
                      <strong>Problem:</strong> Voting power is pre-calculated
                      and stored in checkpoints
                    </li>
                    <li>
                      <strong>Impact:</strong> Cannot perform dynamic cascading
                      at vote time
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">
                    3. Immutable Delegation Storage (Votes.sol)
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      Line 169-175:{" "}
                      <code
                        className={`px-1 py-0.5 rounded text-sm ${
                          isDark ? "bg-neutral-700" : "bg-gray-200"
                        }`}
                      >
                        _delegate()
                      </code>{" "}
                      function overwrites previous delegation
                    </li>
                    <li>
                      <strong>Problem:</strong> Delegation is permanent until
                      explicitly changed
                    </li>
                    <li>
                      <strong>Impact:</strong> No concept of
                      &quot;fallback&quot; or &quot;ranked&quot; delegates
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">
                    4. Checkpoint-Based System (Votes.sol)
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      Line 194-213:{" "}
                      <code
                        className={`px-1 py-0.5 rounded text-sm ${
                          isDark ? "bg-neutral-700" : "bg-gray-200"
                        }`}
                      >
                        _moveDelegateVotes()
                      </code>{" "}
                      immediately transfers voting power
                    </li>
                    <li>
                      <strong>Problem:</strong> Voting power is immediately
                      transferred to delegate
                    </li>
                    <li>
                      <strong>Impact:</strong> Cannot hold voting power in
                      escrow for cascading
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">
                    5. Governor Vote Counting Architecture
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      Governor.sol: Expects fixed voting power per account at
                      proposal snapshot
                    </li>
                    <li>
                      <strong>Problem:</strong> Vote counting assumes static
                      delegation at proposal creation
                    </li>
                    <li>
                      <strong>Impact:</strong> Cannot dynamically resolve
                      delegation during voting period
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">Specification</h2>
              <p className="mb-4 leading-relaxed italic">WIP</p>

              <h2 className="text-2xl font-bold mb-4">
                Reference Implementation
              </h2>
              <p className="mb-4 leading-relaxed italic">WIP</p>
            </div>
          </div>
        </div>

        {/* Discussion Links */}
        <div
          className={`mt-8 p-6 rounded-xl border transition-colors duration-300 ${
            isDark
              ? "bg-neutral-800/30 border-neutral-700"
              : "bg-blue-50 border-blue-200"
          }`}
        >
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
