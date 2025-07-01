"use client";

import { useState } from "react";

interface Delegate {
  id: string;
  name: string;
  votingPower: number;
  preference: string;
  archetype: string;
  vote?: "vanilla" | "chocolate" | "strawberry" | null;
  abstainReason?: string;
}

const delegates: Delegate[] = [
  {
    id: "alice",
    name: "Alice",
    votingPower: 1500,
    preference: "Chocolate all the way",
    archetype: "The Protocol Politician",
    vote: "chocolate",
  },
  {
    id: "bob",
    name: "Bob",
    votingPower: 850,
    preference: "I prefer strawberry, but I'm chill",
    archetype: "The Whale",
    vote: "strawberry",
  },
  {
    id: "carol",
    name: "Carol",
    votingPower: 2100,
    preference: "I like all ice cream, I'll vote on vibes in the moment",
    archetype: "The Advocate",
    vote: null,
  },
  {
    id: "dave",
    name: "Dave",
    votingPower: 1200,
    preference: "Vanilla is classic",
    archetype: "The PGF Maxi",
    vote: "vanilla",
  },
  {
    id: "erin",
    name: "Erin",
    votingPower: 950,
    preference:
      "All flavors have their merits, I'll decide when I cast my vote",
    archetype: "The Degen",
    vote: null,
  },
];

const abstainMessages = [
  "Oops! I was OOO.",
  "Didn't get to it in time.",
  "Was in back-to-back meetings.",
  "Forgot to check the forum.",
];

export default function VotingPlayground() {
  const [selectedDelegates, setSelectedDelegates] = useState<string[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [showCascade, setShowCascade] = useState(false);
  const [cascadeStep, setCascadeStep] = useState(0);
  const [finalResult, setFinalResult] = useState<{
    resolvedDelegate: string | null;
    vote: string | null;
    fallbackUsed: boolean;
    abstainedDelegates: { name: string; reason: string }[];
    workingDelegates: Delegate[];
    smartDelegation: boolean;
    originalPreference: string | null;
    firstTwoHavePreferences: boolean;
  } | null>(null);
  const [hoveredDelegate, setHoveredDelegate] = useState<string | null>(null);

  const handleDelegateClick = (delegateId: string) => {
    if (selectedDelegates.includes(delegateId)) {
      setSelectedDelegates(selectedDelegates.filter((id) => id !== delegateId));
    } else if (selectedDelegates.length < 3) {
      setSelectedDelegates([...selectedDelegates, delegateId]);
    }
  };

  const castVote = () => {
    if (selectedDelegates.length !== 3) return;

    const abstainedDelegates: { name: string; reason: string }[] = [];
    const workingDelegates = [...delegates];

    // Check if user selected a smart delegation pattern (1 preference + 2 non-preference)
    const selectedDelegateObjects = selectedDelegates.map(
      (id) => delegates.find((d) => d.id === id)!
    );
    const preferenceCount = selectedDelegateObjects.filter(
      (d) => d.vote !== null
    ).length;
    const nonPreferenceCount = selectedDelegateObjects.filter(
      (d) => d.vote === null
    ).length;

    // Check if first 2 choices have specific preferences
    const firstTwoHavePreferences = selectedDelegateObjects
      .slice(0, 2)
      .every((d) => d.vote !== null);

    let topDelegateVote = null;
    if (preferenceCount === 1 && nonPreferenceCount === 2) {
      // User selected optimal pattern - get the preference from the top delegate
      const topDelegate = selectedDelegateObjects[0];
      topDelegateVote = topDelegate.vote;
    }

    // For delegates with no signaled preference, assign votes strategically
    workingDelegates.forEach((delegate) => {
      if (delegate.vote === null && selectedDelegates.includes(delegate.id)) {
        if (topDelegateVote) {
          // Use the top delegate's preference for smart delegation
          delegate.vote = topDelegateVote;
        } else {
          // Fallback to random for other patterns
          const randomVotes = ["vanilla", "chocolate", "strawberry"] as const;
          delegate.vote =
            randomVotes[Math.floor(Math.random() * randomVotes.length)];
        }
      }
    });

    // Always make the top choice abstain
    const topChoiceId = selectedDelegates[0];
    const topChoice = workingDelegates.find((d) => d.id === topChoiceId);
    if (topChoice) {
      topChoice.vote = null;
      const reason =
        abstainMessages[Math.floor(Math.random() * abstainMessages.length)];
      abstainedDelegates.push({ name: topChoice.name, reason });
    }

    // Find the first delegate in the ranked list who voted (should be second choice)
    let resolvedDelegate = null;
    let vote = null;
    let fallbackUsed = false;

    for (const delegateId of selectedDelegates) {
      const delegate = workingDelegates.find((d) => d.id === delegateId);
      if (delegate && delegate.vote) {
        resolvedDelegate = delegate.name;
        vote = delegate.vote;
        fallbackUsed = selectedDelegates.indexOf(delegateId) > 0;
        break;
      }
    }

    setFinalResult({
      resolvedDelegate,
      vote,
      fallbackUsed,
      abstainedDelegates,
      workingDelegates,
      smartDelegation: preferenceCount === 1 && nonPreferenceCount === 2,
      originalPreference: topDelegateVote || null,
      firstTwoHavePreferences,
    });
    setHasVoted(true);
    setShowCascade(true);

    // Start cascade animation
    setTimeout(() => setCascadeStep(1), 1000); // Step 1: Check first delegate
    setTimeout(() => setCascadeStep(2), 3500); // Step 2: First delegate abstains
    setTimeout(() => setCascadeStep(3), 6000); // Step 3: Check second delegate
    setTimeout(() => setCascadeStep(4), 8500); // Step 4: Second delegate votes
  };

  const reset = () => {
    setSelectedDelegates([]);
    setHasVoted(false);
    setShowCascade(false);
    setCascadeStep(0);
    setFinalResult(null);
  };

  const getVoteEmoji = (vote: string | null) => {
    switch (vote) {
      case "vanilla":
        return "🍦";
      case "chocolate":
        return "🍫";
      case "strawberry":
        return "🍓";
      default:
        return "❓";
    }
  };

  const getVoteColor = (vote: string | null) => {
    switch (vote) {
      case "vanilla":
        return "text-yellow-600";
      case "chocolate":
        return "text-amber-800";
      case "strawberry":
        return "text-pink-600";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
      {/* Proposal */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-black mb-4">
          🍨 Governance Proposal #42
        </h3>
        <p className="text-lg text-gray-700 mb-2">
          &ldquo;Which ice cream flavor should we choose for the party?&rdquo;
        </p>
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          <span className="flex items-center space-x-2">
            <span>🍦</span>
            <span>Vanilla</span>
          </span>
          <span className="flex items-center space-x-2">
            <span>🍫</span>
            <span>Chocolate</span>
          </span>
          <span className="flex items-center space-x-2">
            <span>🍓</span>
            <span>Strawberry</span>
          </span>
        </div>
      </div>

      {!hasVoted ? (
        <>
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Instructions:</strong>&nbsp; Select exactly 3 delegates in
              order of preference. Your vote will cascade to the first delegate
              who actually voted.
            </p>
            <p className="text-xs text-blue-700 mt-2 italic">
              💡 Tip: It&apos;s often better to delegate to an undecided
              delegate than one whose preference you strongly dislike.
            </p>
          </div>

          {/* Delegate Selection */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-black mb-4">
              Select Your Ranked Delegates:
            </h4>
            <div className="grid md:grid-cols-5 gap-4">
              {delegates.map((delegate) => {
                const isSelected = selectedDelegates.includes(delegate.id);
                const rank = selectedDelegates.indexOf(delegate.id) + 1;

                return (
                  <div
                    key={delegate.id}
                    className="relative"
                    onMouseEnter={() => setHoveredDelegate(delegate.id)}
                    onMouseLeave={() => setHoveredDelegate(null)}
                  >
                    <button
                      onClick={() => handleDelegateClick(delegate.id)}
                      disabled={!isSelected && selectedDelegates.length >= 3}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-red-500 bg-red-50"
                          : selectedDelegates.length >= 3
                          ? "border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed"
                          : "border-gray-200 bg-white hover:border-red-300 hover:bg-red-50 cursor-pointer"
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-lg">👤</span>
                        </div>
                        <h5 className="font-semibold text-black text-sm">
                          {delegate.name}
                        </h5>
                        <p className="text-xs text-gray-500 italic">
                          {delegate.archetype}
                        </p>
                        <div className="flex justify-center items-center space-x-1 mt-1">
                          {delegate.vote ? (
                            <>
                              <span className="text-sm">
                                {getVoteEmoji(delegate.vote)}
                              </span>
                              <span
                                className={`text-xs ${getVoteColor(
                                  delegate.vote
                                )}`}
                              >
                                {delegate.vote}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-sm">🤔</span>
                              <span className="text-xs text-gray-500">
                                No signaled preference
                              </span>
                            </>
                          )}
                        </div>
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {rank}
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Hover Card */}
                    {hoveredDelegate === delegate.id && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                        <div className="bg-black text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
                          <div className="font-semibold">{delegate.name}</div>
                          <div className="text-gray-300 italic">
                            {delegate.archetype}
                          </div>
                          <div className="opacity-80">
                            &ldquo;{delegate.preference}&rdquo;
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cast Vote Button */}
          <div className="text-center">
            <button
              onClick={castVote}
              disabled={selectedDelegates.length !== 3}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors ${
                selectedDelegates.length !== 3
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              Cast Vote via Delegation
            </button>
            {selectedDelegates.length > 0 && selectedDelegates.length < 3 && (
              <p className="text-sm text-gray-600 mt-2">
                Select {3 - selectedDelegates.length} more delegate
                {3 - selectedDelegates.length !== 1 ? "s" : ""} to continue
              </p>
            )}
            {selectedDelegates.length === 3 && (
              <p className="text-sm text-gray-600 mt-2">
                Your vote will go to:{" "}
                {selectedDelegates
                  .map((id) => delegates.find((d) => d.id === id)?.name)
                  .join(" → ")}
              </p>
            )}
          </div>
        </>
      ) : showCascade ? (
        /* Cascade Animation */
        <div className="space-y-8">
          {/* Your Ranked Delegates */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-xl font-bold text-blue-800 mb-4 text-center">
              🗳️ Your Ranked Delegate List
            </h4>
            <p className="text-blue-700 text-center mb-6">
              Your 500 tokens will cascade down this list until an active
              delegate is found...
            </p>

            <div className="space-y-4">
              {selectedDelegates.map((delegateId, index) => {
                const delegate = finalResult?.workingDelegates.find(
                  (d) => d.id === delegateId
                );
                const isCurrentStep =
                  cascadeStep === index + 1 || cascadeStep === index + 2;
                const hasVoted = delegate?.vote !== null;
                const isAbstained = finalResult?.abstainedDelegates.some(
                  (a) => a.name === delegate?.name
                );
                const isSelected =
                  cascadeStep >= index + 3 &&
                  hasVoted &&
                  !selectedDelegates
                    .slice(0, index)
                    .some(
                      (id) =>
                        finalResult?.workingDelegates.find((d) => d.id === id)
                          ?.vote !== null
                    );

                return (
                  <div
                    key={delegateId}
                    className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all duration-500 ${
                      isSelected
                        ? "border-green-500 bg-green-50 shadow-lg"
                        : isCurrentStep
                        ? "border-blue-500 bg-blue-100 shadow-md"
                        : isAbstained
                        ? "border-gray-300 bg-gray-100 opacity-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          isSelected
                            ? "bg-green-500"
                            : isCurrentStep
                            ? "bg-blue-500"
                            : "bg-gray-400"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-lg">👤</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-black">
                          {delegate?.name}
                        </h5>
                      </div>
                    </div>

                    <div className="flex-1 text-center">
                      {isAbstained ? (
                        <div className="text-gray-500">
                          <span className="text-lg">😴</span>
                          <p className="text-sm">Abstained</p>
                        </div>
                      ) : delegate?.vote ? (
                        <div className={getVoteColor(delegate.vote)}>
                          <span className="text-lg">
                            {getVoteEmoji(delegate.vote)}
                          </span>
                          <p className="text-sm font-medium capitalize">
                            {delegate.vote}
                          </p>
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          <span className="text-lg">🤔</span>
                          <p className="text-sm">No signaled preference</p>
                        </div>
                      )}
                    </div>

                    {isCurrentStep && cascadeStep % 2 === 1 && (
                      <div className="text-blue-600 font-medium">
                        <span className="animate-pulse">Checking...</span>
                      </div>
                    )}

                    {isSelected && (
                      <div className="text-green-600 font-bold">
                        <span className="animate-bounce">✓ Your Vote!</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Animation Messages */}
            <div className="mt-6 text-center">
              {cascadeStep === 1 && (
                <p className="text-blue-700 animate-pulse">
                  Checking your #1 choice:{" "}
                  {delegates.find((d) => d.id === selectedDelegates[0])?.name}
                  ...
                </p>
              )}
              {cascadeStep === 2 && (
                <p className="text-yellow-700">
                  😅{" "}
                  {delegates.find((d) => d.id === selectedDelegates[0])?.name}{" "}
                  abstained: &ldquo;{finalResult?.abstainedDelegates[0]?.reason}
                  &rdquo;
                </p>
              )}
              {cascadeStep === 3 && (
                <p className="text-blue-700 animate-pulse">
                  Moving to #2 choice:{" "}
                  {delegates.find((d) => d.id === selectedDelegates[1])?.name}
                  ...
                </p>
              )}
              {cascadeStep >= 4 &&
                finalResult?.resolvedDelegate &&
                selectedDelegates[1] &&
                delegates.find((d) => d.id === selectedDelegates[1])?.vote ===
                  null && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <p className="text-blue-700 text-sm">
                      🎲 {finalResult.resolvedDelegate} had no signaled
                      preference, so they voted based on their judgment in the
                      moment!
                    </p>
                  </div>
                )}
              {cascadeStep >= 4 && finalResult?.vote && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <h5 className="text-xl font-bold text-green-800 mb-3">
                    {finalResult.smartDelegation
                      ? "🎯 Smart Delegation Success!"
                      : "🎉 Success! Your Vote Still Counted!"}
                  </h5>
                  <div className="space-y-2">
                    {finalResult.smartDelegation ? (
                      <p className="text-green-700 font-medium">
                        Even though your top choice missed the vote, your
                        preference was preserved because you delegated to
                        multiple delegates.
                      </p>
                    ) : finalResult.firstTwoHavePreferences ? (
                      <p className="text-green-700 font-medium">
                        Even though your top choice was absent, your vote still
                        counted because it cascaded to your second choice who
                        had a clear preference.
                      </p>
                    ) : (
                      <p className="text-green-700 font-medium">
                        Your top delegate abstained, but your voting power was
                        automatically delegated to your second choice. Your vote
                        still counted!
                      </p>
                    )}
                    <div className="bg-white/60 rounded-lg p-3 border border-green-300">
                      <p className="text-green-800">
                        <strong>Final Result:</strong> Your 500 tokens voted for{" "}
                        <strong className={getVoteColor(finalResult.vote)}>
                          {getVoteEmoji(finalResult.vote)}{" "}
                          {finalResult.vote?.charAt(0).toUpperCase() +
                            finalResult.vote.slice(1)}
                        </strong>
                      </p>
                      <p className="text-green-700 text-sm mt-1">
                        Decided by:{" "}
                        <strong>{finalResult.resolvedDelegate}</strong> (your
                        2nd choice)
                      </p>
                    </div>
                    {finalResult.smartDelegation ? (
                      <p className="text-green-600 text-sm italic">
                        This is the power of ranked delegation: your preference
                        was retained even when your top choice was unavailable!
                      </p>
                    ) : finalResult.firstTwoHavePreferences ? (
                      <p className="text-green-600 text-sm italic">
                        Ranked delegation ensures your vote always counts by
                        automatically falling back to your next preferred
                        delegate!
                      </p>
                    ) : (
                      <p className="text-green-600 text-sm italic">
                        With traditional delegation, your vote would have been
                        lost when your delegate didn&apos;t participate!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {cascadeStep >= 4 && (
            <div className="text-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
