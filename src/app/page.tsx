"use client";

import { useState, useEffect } from "react";
import { FlameIcon as Fire, Home, ShoppingBag, BarChart3 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { toast } from "sonner";

import { DashboardView } from "@/components/dashboard/dashboard-view";
import { StoreView } from "@/components/store/store-view";
import { AnalyticsView } from "@/components/analytics/analytics-view";

interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalCoins: number;
  lastSolvedDate: string;
  solvedDates: string[];
  totalProblems: number;
}

interface StoreItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  category: string;
  popular?: boolean;
}

const STORE_ITEMS: StoreItem[] = [
  {
    id: "hint",
    name: "Problem Hint",
    description: "Get a hint for any problem",
    cost: 50,
    icon: "💡",
    category: "Help",
    popular: true,
  },
  {
    id: "solution",
    name: "Solution Access",
    description: "View solution for any problem",
    cost: 100,
    icon: "🔍",
    category: "Help",
  },
  {
    id: "badge1",
    name: "Speed Demon Badge",
    description: "Show off your solving speed",
    cost: 200,
    icon: "⚡",
    category: "Badges",
  },
  {
    id: "badge2",
    name: "Consistency Master",
    description: "Prove your dedication",
    cost: 300,
    icon: "🏆",
    category: "Badges",
    popular: true,
  },
  {
    id: "theme1",
    name: "Dark Theme Pro",
    description: "Premium dark theme",
    cost: 150,
    icon: "🌙",
    category: "Themes",
  },
  {
    id: "theme2",
    name: "Neon Theme",
    description: "Futuristic neon theme",
    cost: 250,
    icon: "🌈",
    category: "Themes",
  },
];

const menuItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Analytics",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "Store",
    url: "#",
    icon: ShoppingBag,
  },
];

export default function CodingTracker() {
  const [stats, setStats] = useState<UserStats>({
    currentStreak: 0,
    longestStreak: 0,
    totalCoins: 0,
    lastSolvedDate: "",
    solvedDates: [],
    totalProblems: 0,
  });

  const [activeView, setActiveView] = useState("Dashboard");

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedStats = localStorage.getItem("codingTrackerStats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("codingTrackerStats", JSON.stringify(stats));
  }, [stats]);

  const getTodayString = () => {
    return new Date().toISOString().split("T")[0];
  };

  const getYesterdayString = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split("T")[0];
  };

  const getStreakLevel = () => {
    if (stats.currentStreak >= 100)
      return {
        level: "Legendary",
        color: "from-purple-500 to-pink-500",
        textColor: "text-purple-400",
      };
    if (stats.currentStreak >= 50)
      return {
        level: "Master",
        color: "from-orange-500 to-red-500",
        textColor: "text-orange-400",
      };
    if (stats.currentStreak >= 30)
      return {
        level: "Expert",
        color: "from-blue-500 to-purple-500",
        textColor: "text-blue-400",
      };
    if (stats.currentStreak >= 14)
      return {
        level: "Advanced",
        color: "from-green-500 to-blue-500",
        textColor: "text-green-400",
      };
    if (stats.currentStreak >= 7)
      return {
        level: "Intermediate",
        color: "from-yellow-500 to-orange-500",
        textColor: "text-yellow-400",
      };
    return {
      level: "Beginner",
      color: "from-gray-600 to-gray-500",
      textColor: "text-gray-400",
    };
  };

  const solveProblem = () => {
    const today = getTodayString();
    const yesterday = getYesterdayString();

    if (stats.solvedDates.includes(today)) {
      toast.warning("Already solved today!", {
        description:
          "You've already solved a problem today. Come back tomorrow!",
      });
      return;
    }

    let newStreak = 1;
    let coinsEarned = 10;

    // Calculate streak
    if (stats.lastSolvedDate === yesterday) {
      newStreak = stats.currentStreak + 1;
    } else if (stats.lastSolvedDate === today) {
      newStreak = stats.currentStreak;
    }

    // Bonus coins for streak milestones
    if (newStreak % 7 === 0) coinsEarned += 50; // Weekly bonus
    if (newStreak % 30 === 0) coinsEarned += 200; // Monthly bonus
    if (newStreak > stats.currentStreak) coinsEarned += newStreak * 2; // Streak bonus

    setStats((prev) => ({
      ...prev,
      currentStreak: newStreak,
      longestStreak: Math.max(prev.longestStreak, newStreak),
      totalCoins: prev.totalCoins + coinsEarned,
      lastSolvedDate: today,
      solvedDates: [...prev.solvedDates, today],
      totalProblems: prev.totalProblems + 1,
    }));

    // Show success toast with special effects for milestones
    if (newStreak % 30 === 0) {
      toast.success("🎊 Monthly Milestone Achieved!", {
        description: `Amazing! ${newStreak} day streak! +${coinsEarned} coins earned!`,
        duration: 6000,
      });
    } else if (newStreak % 7 === 0) {
      toast.success("🔥 Weekly Streak Bonus!", {
        description: `Great job! ${newStreak} day streak! +${coinsEarned} coins earned!`,
        duration: 5000,
      });
    } else {
      toast.success("Problem Solved! 🎉", {
        description: `+${coinsEarned} coins earned! Current streak: ${newStreak} days`,
      });
    }
  };

  const purchaseItem = (item: StoreItem) => {
    if (stats.totalCoins >= item.cost) {
      setStats((prev) => ({
        ...prev,
        totalCoins: prev.totalCoins - item.cost,
      }));
      toast.success("Purchase Successful! 🛍️", {
        description: `You bought ${item.name} for ${item.cost} coins!`,
        action: {
          label: "View",
          onClick: () => toast.info("Item added to your inventory!"),
        },
      });
    } else {
      toast.error("Insufficient Coins 💰", {
        description: `You need ${
          item.cost - stats.totalCoins
        } more coins to buy this item.`,
      });
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "Dashboard":
        return (
          <DashboardView
            stats={stats}
            onSolveProblem={solveProblem}
            getStreakLevel={getStreakLevel}
          />
        );
      case "Analytics":
        return <AnalyticsView stats={stats} />;
      case "Store":
        return (
          <StoreView
            storeItems={STORE_ITEMS}
            totalCoins={stats.totalCoins}
            onPurchaseItem={purchaseItem}
          />
        );
      default:
        return (
          <DashboardView
            stats={stats}
            onSolveProblem={solveProblem}
            getStreakLevel={getStreakLevel}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-200">
      <SidebarProvider>
        <Sidebar className="border-slate-700/50">
          <SidebarHeader className="border-b border-slate-700/50">
            <div className="flex items-center gap-2 px-4 py-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
                <Fire className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  CodeStreak
                </h1>
                <p className="text-xs text-slate-400">Coding Tracker</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => setActiveView(item.title)}
                        isActive={activeView === item.title}
                        className="w-full"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-3 py-2 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Current Streak</span>
                    <span className="font-semibold text-orange-400 flex items-center gap-1">
                      <Fire className="w-3 h-3" />
                      {stats.currentStreak} days
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Total Coins</span>
                    <span className="font-semibold text-amber-400">
                      {stats.totalCoins}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Problems Solved</span>
                    <span className="font-semibold text-green-400">
                      {stats.totalProblems}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Best Streak</span>
                    <span className="font-semibold text-purple-400">
                      {stats.longestStreak} days
                    </span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-700/50 px-4 bg-slate-900/80 backdrop-blur-sm"></header>

          <div className="flex flex-1 flex-col gap-4 p-6">
            {renderContent()}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
