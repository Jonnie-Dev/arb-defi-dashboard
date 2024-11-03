import { Coins } from "lucide-react";

interface TokenBalanceProps {
  symbol: string;
  balance: string;
  usdValue?: string;
}

export function TokenBalance({ symbol, balance, usdValue }: TokenBalanceProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <Coins className="w-6 h-6 text-purple-600" />
        <h3 className="text-lg font-semibold ">{symbol} </h3>
      </div>
      <p className="text-2xl font-bold">{balance}</p>
      {usdValue && <p className="text-gray-400 text-sm">${usdValue}</p>}
    </div>
  );
}
