"use client"

import { StreakCard } from "./streak-card"
import { CoinsCard } from "./coins-card"
import { DailyChallengeCard } from "./daily-challenge-card"

interface UserStats {
  currentStreak: number
  longestStreak: number
  totalCoins: number
  lastSolvedDate: string
  solvedDates: string[]
  totalProblems: number
}

interface DashboardViewProps {
  stats: UserStats
  onSolveProblem: () => void
  getStreakLevel: () => {
    level: string
    color: string
    textColor: string
  }
}

export function DashboardView({ stats, onSolveProblem, getStreakLevel }: DashboardViewProps) {
  const streakLevel = getStreakLevel()

  return (
    <div className="space-y-8">
      {/* Hero Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StreakCard
          currentStreak={stats.currentStreak}
          longestStreak={stats.longestStreak}
          totalProblems={stats.totalProblems}
          streakLevel={streakLevel}
        />
        <CoinsCard totalCoins={stats.totalCoins} />
      </div>

      {/* Daily Challenge Section */}
      <DailyChallengeCard onSolveProblem={onSolveProblem} />

    </div>
  )
}
