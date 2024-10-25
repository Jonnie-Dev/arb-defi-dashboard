import { useState, useEffect, useCallback } from "react";

const API_ENDPOINT = "https://api.llama.fi/v2/historicalChainTvl/arbitrum";
const POLLING_INTERVAL = 30000; // 30 seconds

interface TVLResponse {
  slice(arg0: number, length: any): any;
  length: number;
  at: any;
  tvl: number[];
  chainTvls: {
    Arbitrum: {
      tvl: number[];
    };
  };
}

const mockData = [
  { name: "Jan", tvl: 4000 },
  { name: "Feb", tvl: 3000 },
  { name: "Mar", tvl: 5000 },
  { name: "Apr", tvl: 2780 },
  { name: "May", tvl: 1890 },
  { name: "Jun", tvl: 2390 },
];

export function useWebSocket() {
  const [tvl, setTvl] = useState<number>(0);
  const [tvlHistory, setTvlHistory] = useState<any>(mockData);
  const [isConnected, setIsConnected] = useState(false);

  const fetchTVL = useCallback(async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) throw new Error("Network response was not ok");

      const data: TVLResponse = await response.json();
      const currentTvl: number = data.at(-1).tvl;

      setTvlHistory(data);
      setTvl(currentTvl);
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to fetch TVL:", error);
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchTVL();

    // Set up polling
    const intervalId = setInterval(fetchTVL, POLLING_INTERVAL);

    return () => {
      clearInterval(intervalId);
      setIsConnected(false);
    };
  }, [fetchTVL]);

  return { tvlHistory, tvl, isConnected };
}
