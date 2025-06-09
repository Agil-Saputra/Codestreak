"use client"

import { Coins } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CoinsCardProps {
  totalCoins: number
}

export function CoinsCard({ totalCoins }: CoinsCardProps) {
  return (
    <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-4">
          <Coins className="w-8 h-8" />
          <div className="text-3xl">💰</div>
        </div>
        <div className="mb-2">
          <div className="text-3xl font-bold">{totalCoins}</div>
          <div className="text-amber-100">Total Coins</div>
        </div>
        <div className="text-sm text-amber-100">Keep solving to earn more!</div>
      </CardContent>
    </Card>
  )
}
