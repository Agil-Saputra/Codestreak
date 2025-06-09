"use client"

import { Target, FlameIcon as Fire, Trophy, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function EarningGuide() {
  const earningMethods = [
    {
      icon: Target,
      title: "Daily Problem",
      description: "+10 coins per problem",
      bgColor: "bg-green-900/50",
      textColor: "text-green-400",
    },
    {
      icon: Fire,
      title: "Streak Bonus",
      description: "+2 coins per day in streak",
      bgColor: "bg-orange-900/50",
      textColor: "text-orange-400",
    },
    {
      icon: Trophy,
      title: "Weekly Milestone",
      description: "+50 coins every 7 days",
      bgColor: "bg-purple-900/50",
      textColor: "text-purple-400",
    },
    {
      icon: Zap,
      title: "Monthly Milestone",
      description: "+200 coins every 30 days",
      bgColor: "bg-blue-900/50",
      textColor: "text-blue-400",
    },
  ]

  return (
    <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">How to Earn Coins</CardTitle>
        <CardDescription className="text-base text-slate-400">Multiple ways to boost your coin balance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {earningMethods.map((method, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-xl">
              <div className={`w-12 h-12 ${method.bgColor} rounded-full flex items-center justify-center`}>
                <method.icon className={`h-6 w-6 ${method.textColor}`} />
              </div>
              <div>
                <p className="font-semibold text-lg">{method.title}</p>
                <p className={`${method.textColor} font-medium`}>{method.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
