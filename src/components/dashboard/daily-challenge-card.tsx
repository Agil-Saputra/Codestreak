"use client"

import { CheckCircle2, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DailyChallengeCardProps {
  onSolveProblem: () => void
}

export function DailyChallengeCard({ onSolveProblem }: DailyChallengeCardProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl border-slate-700/50">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Ready for Today&apos;s Challenge?
            </h3>
            <p className="text-blue-200 text-lg">Solve a problem to maintain your streak and earn coins</p>
          </div>
          <Button
            onClick={onSolveProblem}
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-100 font-semibold px-8 py-4 text-lg shadow-lg"
          >
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Mark as Solved
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
