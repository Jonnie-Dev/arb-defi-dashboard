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
