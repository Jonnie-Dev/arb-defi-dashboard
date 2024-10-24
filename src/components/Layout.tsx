import React from 'react';
import { Activity, TrendingUp, PieChart, Wallet } from 'lucide-react';

const navigation = [
  { name: 'Overview', icon: Activity },
  { name: 'Positions', icon: TrendingUp },
  { name: 'Analytics', icon: PieChart },
  { name: 'Wallet', icon: Wallet },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <nav className="hidden lg:flex flex-col w-64 bg-black/20 backdrop-blur-xl p-4">
        <div className="flex items-center gap-2 mb-8">
          <Activity className="w-8 h-8 text-purple-400" />
          <span className="text-xl font-bold text-white">ArbiDeFi</span>
        </div>
        <div className="space-y-2">
          {navigation.map((item) => (
            <button
              key={item.name}
              className="flex items-center gap-3 w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </div>
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  );
}