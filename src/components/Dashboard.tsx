import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Coins, TrendingUp, DollarSign } from "lucide-react";
import { StatCard } from "./StatCard";
import { DeFiActions } from "./DefiActions";

const mockData = [
  { name: "Jan", tvl: 4000 },
  { name: "Feb", tvl: 3000 },
  { name: "Mar", tvl: 5000 },
  { name: "Apr", tvl: 2780 },
  { name: "May", tvl: 1890 },
  { name: "Jun", tvl: 2390 },
];

const pools = [
  {
    name: "ETH-USDC",
    apy: "12.5%",
    tvl: "$2.1M",
    volume24h: "$450K",
  },
  {
    name: "ARB-ETH",
    apy: "8.2%",
    tvl: "$1.8M",
    volume24h: "$320K",
  },
  {
    name: "MAGIC-ETH",
    apy: "15.1%",
    tvl: "$900K",
    volume24h: "$150K",
  },
];

export function Dashboard(isDarkMode: boolean | undefined) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Value Locked"
          value="$4.8M"
          change="+12.5%"
          icon={Coins}
        />
        <StatCard
          title="24h Volume"
          value="$920K"
          change="+8.2%"
          icon={TrendingUp}
        />
        <StatCard
          title="Total Earnings"
          value="$156K"
          change="+15.1%"
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">TVL History</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="tvl"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Top Pools</h2>
          <div className="space-y-4">
            {pools.map((pool) => (
              <div
                key={pool.name}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div>
                  <h3 className="text-white font-medium">{pool.name}</h3>
                  <p className="text-gray-400 text-sm">TVL: {pool.tvl}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-medium">{pool.apy} APY</p>
                  <p className="text-gray-400 text-sm">24h: {pool.volume24h}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DeFiActions isDarkMode={isDarkMode} />
    </div>
  );
}
