"use client"

import { Trophy, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StreakCardProps {
  currentStreak: number
  longestStreak: number
  totalProblems: number
  streakLevel: {
    level: string
    color: string
    textColor: string
  }
}

export function StreakCard({ currentStreak, longestStreak, totalProblems, streakLevel }: StreakCardProps) {
  return (
    <Card className="lg:col-span-2 bg-slate-800/60 backdrop-blur-sm border-slate-700/50 shadow-xl">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Current Streak</h2>
            <Badge className={`bg-gradient-to-r ${streakLevel.color} text-white border-0`}>{streakLevel.level}</Badge>
          </div>
          <div className="text-6xl">🔥</div>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-6xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            {currentStreak}
          </span>
          <span className="text-2xl text-slate-400">days</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span>Best: {longestStreak} days</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>{totalProblems} problems solved</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
