import VotingPlayground from "../components/VotingPlayground";
import Navigation from "../components/Navigation";
import OptimizedImage from "../components/OptimizedImage";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Navigation isDark={true} />

      {/* Full-Screen Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Static Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"></div>

        {/* Large Background Logo */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/3 z-0">
          <div className="w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] lg:w-[1200px] lg:h-[1200px] relative opacity-15">
            <OptimizedImage
              src="/logo-512.png"
              alt="Ranked Choice Delegation Logo Background"
              width={1200}
              height={1200}
              className="object-contain blur-[3px]"
              priority={true}
              quality={75}
            />
          </div>
        </div>

        {/* Dark Opaque Overlay */}
        <div className="absolute inset-0 bg-neutral-900/60 z-5"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* New Governance Standard Badge - Top Center */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium">
              New Governance Standard
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
            {/* Empty Space Section - Left 1/3 (for logo positioning) */}
            <div className="lg:w-1/3"></div>

            {/* Text Section - Right 2/3 */}
            <div className="lg:w-2/3 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-neutral-300">
                Fix DAO Governance with
              </h2>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
                <span className="text-red-500">
                  Ranked Choice
                  <br />
                  Delegation
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 leading-relaxed mb-12 max-w-3xl lg:max-w-none">
                A new voting standard that combines ranked-choice voting with
                cascading delegation to unlock greater participation and reduce
                uncast votes.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-24">
            <a
              href="#demo"
              className="bg-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition-colors text-lg"
            >
              Try Demo
            </a>
            <a
              href="#problem"
              className="border border-neutral-700 text-neutral-300 px-8 py-4 rounded-lg font-semibold hover:bg-neutral-800 hover:text-white transition-colors text-lg"
            >
              Read More
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <a
              href="#problem"
              className="w-8 h-8 border-2 border-neutral-600 flex items-center justify-center animate-bounce hover:border-neutral-400 transition-colors cursor-pointer"
            >
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
            </a>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="problem" className="py-20 bg-white relative overflow-hidden">
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
                  <span className="text-red-400 font-bold text-lg">1/1</span>
                </div>
                <div>
                  <p className="font-semibold text-black text-lg">
                    Single Delegate Only
                  </p>
                  <p className="text-gray-600">
                    Current systems only allow delegation to one address
                  </p>
                </div>
              </div>
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

          {/* Flow Diagram */}
          <div className="bg-neutral-800/30 border border-neutral-700 rounded-2xl p-8 mb-12">
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
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    →
                  </div>
                  <p className="text-neutral-300">
                    If Bob didn&apos;t vote, check Carol → if yes, use
                    Carol&apos;s vote
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

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl">📋</span>
              </div>
              <h4 className="font-semibold text-white text-lg mb-3">
                Ranked Lists
              </h4>
              <p className="text-neutral-400">
                Define multiple delegation lists, use them between tokens.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl">⬇️</span>
              </div>
              <h4 className="font-semibold text-white text-lg mb-3">
                Cascading Fallback
              </h4>
              <p className="text-neutral-400">
                Voting power flows down the list to active participants
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl">✅</span>
              </div>
              <h4 className="font-semibold text-white text-lg mb-3">
                Higher Participation
              </h4>
              <p className="text-neutral-400">
                Reduces uncast votes and inactive delegation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section id="demo" className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Try It Yourself
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Experience ranked delegation in action with this interactive
              voting playground
            </p>
          </div>

          <VotingPlayground />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-900 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 relative">
                <OptimizedImage
                  src="/logo-32.png"
                  alt="Ranked Choice Delegation Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-neutral-400 font-medium">
                Ranked Choice Delegation
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
