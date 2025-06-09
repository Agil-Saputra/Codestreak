"use client"

import { TrendingUp, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressCardsProps {
  currentStreak: number
}

export function ProgressCards({ currentStreak }: ProgressCardsProps) {
  const weeklyProgress = (currentStreak % 7) * (100 / 7)
  const monthlyProgress = (currentStreak % 30) * (100 / 30)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={weeklyProgress} className="h-3 bg-slate-700" />
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">{currentStreak % 7}/7 days</span>
              <span className="font-semibold text-green-400">{Math.round(weeklyProgress)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="w-5 h-5 text-purple-400" />
            Monthly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={monthlyProgress} className="h-3 bg-slate-700" />
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">{currentStreak % 30}/30 days</span>
              <span className="font-semibold text-purple-400">{Math.round(monthlyProgress)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
