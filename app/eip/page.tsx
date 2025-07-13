"use client";

import { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export default function EIPPage() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "eip" | "delegation" | "erc20votes" | "votes" | "governor"
  >("eip");
  const [contractCode, setContractCode] = useState<string>("");

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    const fetchContractCode = async () => {
      try {
        const response = await fetch("/api/contract-source");
        const data = await response.text();
        setContractCode(data);
      } catch (error) {
        console.error("Failed to fetch contract code:", error);
        setContractCode("// Failed to load contract code");
      }
    };

    if (activeTab === "delegation") {
      fetchContractCode();
    }
  }, [activeTab]);

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

      <main className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-8">
          <div
            className={`border-b transition-colors duration-300 ${
              isDark ? "border-neutral-700" : "border-gray-200"
            }`}
          >
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("eip")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                  activeTab === "eip"
                    ? isDark
                      ? "border-red-400 text-red-400"
                      : "border-red-600 text-red-600"
                    : isDark
                    ? "border-transparent text-neutral-400 hover:text-white hover:border-neutral-300"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                EIP
              </button>
              <button
                onClick={() => setActiveTab("delegation")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                  activeTab === "delegation"
                    ? isDark
                      ? "border-red-400 text-red-400"
                      : "border-red-600 text-red-600"
                    : isDark
                    ? "border-transparent text-neutral-400 hover:text-white hover:border-neutral-300"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                DelegationRegistry.sol
              </button>
              <button
                onClick={() => setActiveTab("erc20votes")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                  activeTab === "erc20votes"
                    ? isDark
                      ? "border-red-400 text-red-400"
                      : "border-red-600 text-red-600"
                    : isDark
                    ? "border-transparent text-neutral-400 hover:text-white hover:border-neutral-300"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                ERC20Votes.sol
              </button>
              <button
                onClick={() => setActiveTab("votes")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                  activeTab === "votes"
                    ? isDark
                      ? "border-red-400 text-red-400"
                      : "border-red-600 text-red-600"
                    : isDark
                    ? "border-transparent text-neutral-400 hover:text-white hover:border-neutral-300"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Votes.sol
              </button>
              <button
                onClick={() => setActiveTab("governor")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                  activeTab === "governor"
                    ? isDark
                      ? "border-red-400 text-red-400"
                      : "border-red-600 text-red-600"
                    : isDark
                    ? "border-transparent text-neutral-400 hover:text-white hover:border-neutral-300"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Governor.sol
              </button>
            </nav>
          </div>
        </div>

        {activeTab === "eip" ? (
          <div
            className={`rounded-xl border transition-colors duration-300 ${
              isDark
                ? "bg-neutral-800/50 border-neutral-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="p-8">
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
              </div>

              <div className="max-w-none transition-colors duration-300 space-y-6">
                <h2 className="text-2xl font-bold mb-4">Simple Summary</h2>
                <p className="mb-4 leading-relaxed">
                  A standard for ranked delegated voting in DAOs that allows
                  token holders to create ordered delegation lists and point
                  their token votes to these lists. Voting power cascades down
                  the list to the highest-ranked delegate who voted on a
                  specific proposal. This improves voter participation and
                  ensures delegated tokens are actively used without
                  compromising user control.
                </p>

                <h2 className="text-2xl font-bold mb-4">Abstract</h2>
                <p className="mb-4 leading-relaxed">
                  This EIP introduces a mechanism to extend token-based
                  delegation (as in{" "}
                  <code
                    className={`px-1 py-0.5 rounded text-sm ${
                      isDark ? "bg-neutral-700" : "bg-gray-200"
                    }`}
                  >
                    ERC20Votes
                  </code>
                  ) to support ranked fallback delegation. Users can assign a
                  prioritized list of delegates to vote on their behalf. On a
                  per-proposal basis, the system checks if the token holder
                  voted; if not, it checks the delegates in order until it finds
                  one who did vote. The first such delegate receives the token
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
                  is lost. A ranked delegation system ensures votes find the
                  most active trusted representative and reduces vote wastage.
                </p>

                <h3 className="text-xl font-semibold mb-3">
                  Limitations of Existing Standards
                </h3>
                <p className="mb-4 leading-relaxed">
                  Existing contract standards Governor.sol, Votes.sol,
                  GovernorVotes.sol are incapable of supporting ranked
                  delegation as-is:
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
                        <strong>Impact:</strong> Cannot perform dynamic
                        cascading at vote time
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

                <h2 className="text-2xl font-bold mb-4">Possible Solutions</h2>
                <p className="mb-4 leading-relaxed">
                  There are several delegation strategies that could address the
                  limitations of existing standards:
                </p>

                <div className="space-y-6">
                  <div
                    className={`p-4 rounded-lg border ${
                      isDark
                        ? "bg-neutral-800/30 border-neutral-700"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <h4 className="text-lg font-semibold mb-2">
                      1. Ranked Delegation
                    </h4>
                    <p className="mb-2 leading-relaxed">
                      A token holder selects many ranked delegates in priority
                      order. When voting, the system cascades through the list
                      until finding an active delegate who voted.
                    </p>
                    <p className="text-sm font-medium">
                      Example: [Alice, Bob, Carol] → If Alice didn&apos;t vote,
                      check Bob → If Bob didn&apos;t vote, use Carol&apos;s vote
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg border ${
                      isDark
                        ? "bg-neutral-800/30 border-neutral-700"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <h4 className="text-lg font-semibold mb-2">
                      2. Chained Delegation
                    </h4>
                    <p className="mb-2 leading-relaxed">
                      A token holder selects one delegate, who may select
                      another delegate, creating a delegation chain. Voting
                      power flows through the chain to the final active
                      delegate.
                    </p>
                    <p className="text-sm font-medium">
                      Example: Token Holder → Alice → Bob → Carol (if Carol
                      votes, she gets all the delegated power)
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg border ${
                      isDark
                        ? "bg-neutral-800/30 border-neutral-700"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <h4 className="text-lg font-semibold mb-2">
                      3. Fractional Delegation
                    </h4>
                    <p className="mb-2 leading-relaxed">
                      A token holder selects a set of delegates and allocates
                      different portions of their tokens to each delegate,
                      allowing for diversified representation.
                    </p>
                    <p className="text-sm font-medium">
                      Example: 40% to Alice, 35% to Bob, 25% to Carol (each
                      delegate receives their allocated portion if they vote)
                    </p>
                  </div>
                </div>

                <div
                  className={`mt-6 p-4 rounded-lg border ${
                    isDark
                      ? "bg-blue-900/20 border-blue-700/30"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <h4 className="text-lg font-semibold mb-2">
                    Optimal Solution
                  </h4>
                  <p className="leading-relaxed">
                    An optimal solution is one that can support all of these
                    strategies or a combination of them, allowing the token
                    issuer to determine which delegation strategies they want to
                    support for their specific project and governance needs.
                  </p>
                </div>

                <h2 className="text-2xl font-bold mb-4">Specification</h2>
                <p className="mb-4 leading-relaxed italic">WIP</p>

                <h2 className="text-2xl font-bold mb-4">
                  Reference Implementation
                </h2>
                <p className="mb-4 leading-relaxed">
                  See the{" "}
                  <button
                    onClick={() => setActiveTab("delegation")}
                    className="text-red-500 hover:text-red-600 font-medium underline"
                  >
                    DelegationRegistry.sol
                  </button>{" "}
                  tab for the complete implementation.
                </p>

                <h2 className="text-2xl font-bold mb-4">Open Questions</h2>
                <ol className="list-decimal list-inside mb-4 space-y-1">
                  <li>
                    Should each delegation list exist as a contract that lives
                    at a single address or should a single registry hold all
                    lists?
                    <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-300">
                      The factory pattern costs approximately 2-3x additional
                      gas per delegation list due to contract deployment
                      overhead. However, it provides the benefit of maintaining
                      ERC20Votes compatibility by giving each delegation list a
                      unique address that can be used with existing
                      delegate(address) functions. Storing all lists as arrays
                      within a single registry contract centralizes management
                      and can be more gas-efficient, but may limit flexibility
                      and upgradability.
                    </div>
                  </li>
                  <li>
                    Should delegation list updates use full array overwrite or
                    support incremental add/remove operations?
                    <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-300">
                      Gas analysis shows full overwrite is more efficient for
                      most scenarios:
                      <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
                        <li>
                          Full overwrite wins for any changes involving 2+
                          delegates
                        </li>
                        <li>
                          Incremental operations only cheaper for single
                          additions at list end (~16k gas savings)
                        </li>
                        <li>
                          Position matters significantly: adding at beginning
                          costs ~72k gas vs ~31k at end
                        </li>
                        <li>
                          Operation cost scales with list size: 10 delegates =
                          42k gas, 50 delegates = 99k gas
                        </li>
                      </ul>
                      Conclusion: Simple full-array replacement provides better
                      UX and gas efficiency for typical use cases.
                    </div>
                  </li>
                </ol>
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
              <h3 className="font-semibold text-lg mb-4">
                Join the Discussion
              </h3>
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
          </div>
        ) : activeTab === "delegation" ? (
          <div
            className={`rounded-xl border transition-colors duration-300 ${
              isDark
                ? "bg-neutral-800/50 border-neutral-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">DelegationRegistry.sol</h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isDark
                      ? "bg-green-900/30 text-green-400 border border-green-600/30"
                      : "bg-green-100 text-green-800 border-green-300"
                  }`}
                >
                  Reference Implementation
                </span>
              </div>
              <div className="rounded-lg overflow-hidden">
                <SyntaxHighlighter
                  language="solidity"
                  style={isDark ? vscDarkPlus : vs}
                  showLineNumbers={true}
                  customStyle={{
                    margin: 0,
                    fontSize: "14px",
                    lineHeight: "1.5",
                  }}
                  lineNumberStyle={{
                    minWidth: "3em",
                    paddingRight: "1em",
                    color: isDark ? "#6b7280" : "#9ca3af",
                  }}
                >
                  {contractCode || "// Loading contract source..."}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`rounded-xl border transition-colors duration-300 ${
              isDark
                ? "bg-neutral-800/50 border-neutral-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">
                  {activeTab === "erc20votes" && "ERC20Votes.sol"}
                  {activeTab === "votes" && "Votes.sol"}
                  {activeTab === "governor" && "Governor.sol"}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isDark
                      ? "bg-green-900/30 text-green-400 border border-green-600/30"
                      : "bg-green-100 text-green-800 border-green-300"
                  }`}
                >
                  Reference Implementation
                </span>
              </div>
              <div className="relative rounded-lg overflow-hidden min-h-[300px]">
                <div className="absolute left-0 right-0 top-0 flex justify-center z-20 pointer-events-none select-none pt-8">
                  <span
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: 800,
                      color: isDark ? "#fff" : "#222",
                      textShadow: "0 2px 16px rgba(0,0,0,0.3)",
                      letterSpacing: "2px",
                      opacity: 0.85,
                    }}
                  >
                    Coming Soon
                  </span>
                </div>
                <div
                  style={{
                    filter: "blur(8px)",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  <SyntaxHighlighter
                    language="solidity"
                    style={isDark ? vscDarkPlus : vs}
                    showLineNumbers={true}
                    customStyle={{
                      margin: 0,
                      fontSize: "14px",
                      lineHeight: "1.5",
                    }}
                    lineNumberStyle={{
                      minWidth: "3em",
                      paddingRight: "1em",
                      color: isDark ? "#6b7280" : "#9ca3af",
                    }}
                  >
                    {contractCode || "// Loading contract source..."}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
