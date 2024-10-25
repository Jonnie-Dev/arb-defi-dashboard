import React from "react";
import { Activity, TrendingUp, PieChart, Wallet } from "lucide-react";

const navigation = [
  { name: "Overview", icon: Activity },
  { name: "Positions", icon: TrendingUp },
  { name: "Analytics", icon: PieChart },
  { name: "Wallet", icon: Wallet },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <main className="flex-1">{children}</main>
    </div>
  );
}
