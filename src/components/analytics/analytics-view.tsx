"use client"

import { ProgressCards } from "../analytics/progress-card"
import { ActivityCalendar } from "../analytics/activity-calendar"

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
}

export function AnalyticsView({ stats }: DashboardViewProps) {

  return (
	<div className="space-y-8">
	  <ProgressCards currentStreak={stats.currentStreak} />
	  <ActivityCalendar solvedDates={stats.solvedDates} />
	</div>
  )
}
