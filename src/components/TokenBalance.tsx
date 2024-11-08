import { Coins } from "lucide-react";

interface TokenBalanceProps {
  symbol: string;
  balance: string;
  usdValue?: string;
}

export function TokenBalance({ symbol, balance, usdValue }: TokenBalanceProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-3">
        <Coins className="w-6 h-6 text-purple-400" />
        <h3 className="text-lg font-semibold text-foreground">{symbol}</h3>
      </div>
      <p className="text-2xl font-bold text-foreground">{balance}</p>
      {usdValue && (
        <p className="text-foreground-secondary text-sm">
          ${usdValue} / {symbol}
        </p>
      )}
    </div>
  );
}
