export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">
                  Rancho Del Vote
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-6 text-sm">
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Documentation
                </a>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  EIP Draft
                </a>
                <a
                  href="https://github.com/its-everdred/rancho-del-vote"
                  className="text-neutral-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </nav>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm font-medium">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Static Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"></div>


        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium mb-6">
              New Governance Standard
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Fix DAO Governance with{" "}
              <span className="text-red-500">
                Ranked Choice Delegated Voting
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-300 max-w-4xl mx-auto leading-relaxed mb-12">
              A new voting standard that combines ranked-choice voting with
              cascading delegation to unlock greater participation and reduce
              uncast votes in DAO governance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button className="bg-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition-colors text-lg">
              Try Demo
            </button>
            <button className="border border-neutral-700 text-neutral-300 px-8 py-4 rounded-lg font-semibold hover:bg-neutral-800 hover:text-white transition-colors text-lg">
              Read EIP Draft
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-8 border-2 border-neutral-600 flex items-center justify-center animate-bounce">
              <svg
                className="w-4 h-4 text-neutral-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              The Problem
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              DAO governance today is rigid. Votes often go uncast because token
              holders delegate to inactive representatives, or forget to vote
              themselves.
            </p>
          </div>

          {/* Optimism Stats */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-black mb-8 text-center">
              Real Example: Optimism DAO
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center">
                  <span className="text-red-400 font-bold text-xl">2.7%</span>
                </div>
                <div>
                  <p className="font-semibold text-black text-lg">
                    Token Delegation Rate
                  </p>
                  <p className="text-gray-600 mb-2">
                    Only 2.7% of OP tokens are delegated
                  </p>
                  <a
                    href="https://gov.optimism.io/t/the-weight-of-influence-an-analysis-of-the-power-in-the-collective/9966"
                    className="text-red-400 text-sm hover:text-red-300 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source →
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center">
                  <span className="text-red-400 font-bold text-xl">33%</span>
                </div>
                <div>
                  <p className="font-semibold text-black text-lg">
                    Delegate Absenteeism
                  </p>
                  <p className="text-gray-600 mb-2">
                    Delegates miss 33% of proposals
                  </p>
                  <a
                    href="https://gov.optimism.io/t/governance-report-october-2024-update/9218"
                    className="text-red-400 text-sm hover:text-red-300 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Oct 2024 Gov Report →
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 font-bold text-xl">1</span>
                </div>
                <div>
                  <p className="font-semibold text-black text-lg">
                    Single Delegate Only
                  </p>
                  <p className="text-gray-600">
                    Current systems only allow delegation to one address,
                    creating single points of failure
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Problem Bubbles */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 hover:bg-gray-200 transition-colors">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-red-400 text-xl">📊</span>
              </div>
              <h4 className="font-semibold text-black mb-3">
                Low Participation
              </h4>
              <p className="text-sm text-gray-600">
                Most tokens remain undelegated and unused in governance
                decisions
              </p>
            </div>
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 hover:bg-gray-200 transition-colors">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-red-400 text-xl">😴</span>
              </div>
              <h4 className="font-semibold text-black mb-3">
                Inactive Delegates
              </h4>
              <p className="text-sm text-gray-600">
                Chosen representatives often miss votes or participate
                irregularly
              </p>
            </div>
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 hover:bg-gray-200 transition-colors">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-red-400 text-xl">🗳️</span>
              </div>
              <h4 className="font-semibold text-black mb-3">Uncast Votes</h4>
              <p className="text-sm text-gray-600">
                Voting power goes unused when delegates abstain or forget to
                participate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Solution: Ranked-Choice Delegation
            </h2>
            <p className="text-xl text-neutral-300 max-w-4xl mx-auto">
              Instead of delegating to a single address, token holders create a
              ranked list of trusted delegates. When they don&apos;t vote
              directly, their voting power cascades through the list until an
              active delegate is found.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-red-400 text-3xl">📋</span>
              </div>
              <h4 className="font-semibold text-white text-lg mb-3">
                Ranked Lists
              </h4>
              <p className="text-neutral-400">
                Define multiple trusted delegates in order of preference
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-red-400 text-3xl">⬇️</span>
              </div>
              <h4 className="font-semibold text-white text-lg mb-3">
                Cascading Fallback
              </h4>
              <p className="text-neutral-400">
                Voting power flows down the list to active participants
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-red-400 text-3xl">✅</span>
              </div>
              <h4 className="font-semibold text-white text-lg mb-3">
                Higher Participation
              </h4>
              <p className="text-neutral-400">
                Reduces uncast votes and inactive delegation
              </p>
            </div>
          </div>

          {/* Flow Diagram */}
          <div className="bg-neutral-800/30 border border-neutral-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h3>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    1
                  </div>
                  <p className="text-neutral-300">
                    Token holder sets ranked delegate list: [Alice, Bob, Carol]
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    2
                  </div>
                  <p className="text-neutral-300">
                    Proposal voting period begins
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    ✓
                  </div>
                  <p className="text-neutral-300">
                    If token holder votes directly → use their vote
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    →
                  </div>
                  <p className="text-neutral-300">
                    If not, check if Alice voted → if yes, use Alice&apos;s vote
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    →
                  </div>
                  <p className="text-neutral-300">
                    If Alice didn&apos;t vote, check Bob → if yes, use
                    Bob&apos;s vote
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-neutral-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    ∅
                  </div>
                  <p className="text-neutral-300">
                    If no delegates voted, mark as abstained
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Built on Proven Standards
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Compatible with existing DAO infrastructure while introducing
              innovative delegation mechanics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-red-400 font-bold text-lg">20</span>
              </div>
              <h4 className="font-semibold text-black text-lg mb-2">
                ERC-20Votes
              </h4>
              <p className="text-sm text-gray-600">
                Compatible with existing token standards
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-red-400 font-bold text-lg">⚖️</span>
              </div>
              <h4 className="font-semibold text-black text-lg mb-2">
                Governor
              </h4>
              <p className="text-sm text-gray-600">
                Extends OpenZeppelin&apos;s battle-tested contracts
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-red-400 font-bold text-lg">🔗</span>
              </div>
              <h4 className="font-semibold text-black text-lg mb-2">Modular</h4>
              <p className="text-sm text-gray-600">
                Lightweight architecture for easy adoption
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-red-400 font-bold text-lg">🔮</span>
              </div>
              <h4 className="font-semibold text-black text-lg mb-2">
                Future-Ready
              </h4>
              <p className="text-sm text-gray-600">
                Prepared for ERC-1202 and Snapshot integration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-900 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-neutral-400 font-medium">
                Rancho Del Vote
              </span>
            </div>
            <div className="flex items-center space-x-8 text-neutral-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-white transition-colors">
                EIP Draft
              </a>
              <a
                href="https://github.com/its-everdred/rancho-del-vote"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
