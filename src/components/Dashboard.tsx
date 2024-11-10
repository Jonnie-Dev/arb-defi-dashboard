import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Coins, TrendingUp, DollarSign, WifiOff, Wifi } from "lucide-react";
import { StatCard } from "./StatCard";
import { DeFiActions } from "./DefiActions";
import { TokenBalance } from "./TokenBalance";
import { useWebSocket } from "../hooks/useWebSocket";
import { formatVal, formatChange, formatYAxisTick } from "../utils/formatters";

export function Dashboard({ isDarkMode }: { isDarkMode: boolean }) {
  const {
    tvlHistory,
    tvl,
    tvlChange,
    isConnected,
    volume24h,
    volumeChange,
    fee,
    feeChange,
    prices,
    pools,
    balance,
  } = useWebSocket();

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-end gap-2 text-sm">
        {isConnected ? (
          <>
            <Wifi className="w-4 h-4 text-green-400" />
            <span className="text-green-400">Live updates enabled</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4 text-red-400" />
            <span className="text-red-400">Connecting to server...</span>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Value Locked"
          value={formatVal(tvl || "__")}
          change={formatChange(tvlChange) || "__"}
          icon={Coins}
          isLive={isConnected}
          up={typeof tvlChange == "number" && tvlChange >= 0}
        />
        <StatCard
          title="24h Volume"
          value={formatVal(volume24h || "__")}
          change={formatChange(volumeChange) || "__"}
          icon={TrendingUp}
          isLive={isConnected}
          up={typeof volumeChange == "number" && volumeChange >= 0}
        />
        <StatCard
          title="Fees (24hrs)"
          value={formatVal(fee || "__")}
          change={formatChange(feeChange) || "__"}
          icon={DollarSign}
          isLive={isConnected}
          up={typeof feeChange == "number" && feeChange >= 0}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white/90">Your Balances</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TokenBalance
            symbol="ETH"
            balance={String(balance.eth)}
            usdValue={prices.weth ? prices.weth.toFixed(2) : "__"}
          />
          <TokenBalance
            symbol="ARB"
            balance={String(balance.arb)}
            usdValue={prices.arb ? prices.arb.toFixed(3) : "__"}
          />
          <TokenBalance
            symbol="USDC"
            balance={String(balance.usdc)}
            usdValue={prices.usdc ? prices.usdc.toFixed(2) : "__"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">TVL History</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tvlHistory}>
                <CartesianGrid strokeDasharray="1 1" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" tickMargin={10} />
                <YAxis
                  stroke="#9CA3AF"
                  tickFormatter={formatYAxisTick}
                  tickMargin={8}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value: any) => [
                    `$${formatYAxisTick(value)}`,
                    "TVL",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="tvl"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Top Pools</h2>
          <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
            {pools.slice(0, 10).map((pool) => (
              <div
                key={pool.project}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div>
                  <h3 className="text-white font-medium">
                    {pool.project}
                    <span className="ml-1 opacity-75">({pool.symbol})</span>
                  </h3>
                  <p className="text-gray-400 text-sm">
                    TVL: {formatVal(pool.tvlUsd)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-medium">
                    APY: {formatChange(pool.apy)}%
                  </p>
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
