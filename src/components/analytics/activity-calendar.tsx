"use client"

import { Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CalendarDay {
  date: string
  day: number
  isSolved: boolean
  isToday: boolean
}

interface ActivityCalendarProps {
  solvedDates: string[]
}

export function ActivityCalendar({ solvedDates }: ActivityCalendarProps) {
  const getTodayString = () => {
    return new Date().toISOString().split("T")[0]
  }

  const getCalendarDays = (): CalendarDay[] => {
    const days = []
    const today = new Date()

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateString = date.toISOString().split("T")[0]
      const isSolved = solvedDates.includes(dateString)
      const isToday = dateString === getTodayString()

      days.push({
        date: dateString,
        day: date.getDate(),
        isSolved,
        isToday,
      })
    }

    return days
  }

  return (
    <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calendar className="w-6 h-6 text-cyan-400" />
          Activity Calendar
        </CardTitle>
        <CardDescription className="text-base text-slate-400">
          Your coding journey over the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-10 gap-3 mb-6">
          {getCalendarDays().map((day, index) => (
            <div
              key={index}
              className={`
                w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 hover:scale-110
                ${
                  day.isSolved
                    ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg"
                    : day.isToday
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg ring-2 ring-blue-400/30"
                      : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                }
              `}
              title={`${day.date} ${day.isSolved ? "- Solved!" : ""}`}
            >
              {day.day}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-md"></div>
            <span className="text-slate-400">Solved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md ring-2 ring-blue-400/30"></div>
            <span className="text-slate-400">Today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-700 rounded-md"></div>
            <span className="text-slate-400">Not solved</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
