"use client"

import { Coins } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { StoreItemCard } from "./store-item-card"
import { EarningGuide } from "./earning-guide"

interface StoreItem {
  id: string
  name: string
  description: string
  cost: number
  icon: string
  category: string
  popular?: boolean
}

interface StoreViewProps {
  storeItems: StoreItem[]
  totalCoins: number
  onPurchaseItem: (item: StoreItem) => void
}

export function StoreView({ storeItems, totalCoins, onPurchaseItem }: StoreViewProps) {
  return (
    <div className="space-y-8">
      {/* Store Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl border-slate-700/50">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Coin Store</h2>
              <p className="text-purple-200 text-lg">
                Spend your hard-earned coins on helpful items and exclusive rewards
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <Coins className="w-8 h-8" />
                {totalCoins}
              </div>
              <div className="text-purple-200">Available coins</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Store Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storeItems.map((item) => (
          <StoreItemCard key={item.id} item={item} totalCoins={totalCoins} onPurchase={onPurchaseItem} />
        ))}
      </div>

      {/* Earning Guide */}
      <EarningGuide />
    </div>
  )
}
