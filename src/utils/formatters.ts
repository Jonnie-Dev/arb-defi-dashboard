export function formatVal(value: number | string): string {
  if (typeof value === "number") {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(0)}`;
  }
  return value;
}

export function formatChange(value: number | undefined): number | string {
  if (typeof value === "number") {
    return (value * 100).toFixed(2);
  }
  return "";
}

export function formatYAxisTick(value: number): string {
  if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  return value.toString();
}

export function formatPoolSymbol(symbol: string): string {
  if (!symbol) return "";

  // Handle LP token pairs
  if (symbol.includes("-")) {
    const tokens = symbol.split("-");
    // If both tokens are long, abbreviate them
    if (tokens[0].length + tokens[1].length > 8) {
      return tokens
        .map((token) => {
          if (token.length > 5) {
            return `${token.slice(0, 4)}...`;
          }
          return token;
        })
        .join("-");
    }
  }

  // For single tokens or short pairs, return as it is
  return symbol;
}
