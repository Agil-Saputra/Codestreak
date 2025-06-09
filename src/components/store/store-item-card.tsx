"use client"

import { Star, Coins } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface StoreItem {
  id: string
  name: string
  description: string
  cost: number
  icon: string
  category: string
  popular?: boolean
}

interface StoreItemCardProps {
  item: StoreItem
  totalCoins: number
  onPurchase: (item: StoreItem) => void
}

export function StoreItemCard({ item, totalCoins, onPurchase }: StoreItemCardProps) {
  return (
    <Card
      className={`
        bg-slate-800/60 backdrop-blur-sm border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1
        ${item.popular ? "ring-2 ring-amber-500/50" : ""}
      `}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-4xl">{item.icon}</div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-slate-700 text-slate-300">
              {item.category}
            </Badge>
            {item.popular && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                Popular
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className="text-xl">{item.name}</CardTitle>
        <CardDescription className="text-base text-slate-400">{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-xl">{item.cost}</span>
          </div>
          <Button
            onClick={() => onPurchase(item)}
            disabled={totalCoins < item.cost}
            className={
              totalCoins >= item.cost
                ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                : ""
            }
            variant={totalCoins >= item.cost ? "default" : "secondary"}
          >
            {totalCoins >= item.cost ? "Buy Now" : "Need more coins"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
