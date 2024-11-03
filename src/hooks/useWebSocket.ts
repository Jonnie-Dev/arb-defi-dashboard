import { useState, useEffect, useCallback } from "react";

function getURL(domain: string, query: string): string {
  const API_ENDPOINT = `https://${domain}.llama.fi/${query}`;
  return API_ENDPOINT;
}
const POLLING_INTERVAL = 30000; // 30 seconds

interface MarketData {
  at?: any;
  tvl?: number;
  tvlChange?: number;
  volume24h?: number;
  volumeChange?: number;
  prices: {
    [key: string]: number;
  };
  fee?: number;
  feeChange?: number;
  tvlHistory?: number[];
  pools: {
    symbol?: string;
    project: string;
    tvlUsd: number;
    apy?: number;
    volumeUsd1d?: number;
  }[];
}

type CoinData = {
  decimals: number;
  symbol: string;
  price: number;
  timestamp: number;
  confidence: number;
};

type Coins = {
  [key: string]: CoinData;
};

// const mockData: any = [];

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);

  const [marketData, setMarketData] = useState<MarketData>({
    tvl: 0,
    tvlChange: 0,
    volume24h: 0,
    volumeChange: 0,
    fee: 0,
    feeChange: 0,
    prices: {},
    pools: [],
  });

  const fetchTVL = useCallback(async () => {
    try {
      const url = getURL("api", "v2/historicalChainTvl/arbitrum");
      const response = await fetch(url);

      if (!response.ok) throw new Error("Network response was not ok");

      const data: any = await response.json();
      const currentTvl: number = data.at(-1).tvl;
      const recentTvl: number = data.at(-2).tvl;

      setMarketData((prevData) => ({
        ...prevData,
        tvl: currentTvl,
        tvlChange: (currentTvl - recentTvl) / recentTvl,
        tvlHistory: data,
      }));

      setIsConnected(true);
    } catch (error) {
      console.error("Failed to fetch TVL:", error);
      setIsConnected(false);
    }
  }, []);

  const fetchVol = useCallback(async () => {
    try {
      const url = getURL("api", "overview/dexs/arbitrum");
      const response = await fetch(url);
      const data = await response.json();
      let curr_data = 0;
      let prev_data = 0;
      const curr_data_obj = data.totalDataChartBreakdown.at(-1);
      for (let key in curr_data_obj[1]) {
        curr_data += curr_data_obj[1][key];
      }
      const prev_data_obj = data.totalDataChartBreakdown.at(-2);
      for (let key in prev_data_obj[1]) {
        prev_data += prev_data_obj[1][key];
      }
      setMarketData((prevData) => ({
        ...prevData,
        volume24h: curr_data,
        volumeChange: (curr_data - prev_data) / prev_data,
      }));
    } catch (error) {
      console.error("Error fetching volume:", error);
    }
  }, []);

  const fetchFees = useCallback(async () => {
    try {
      const url = getURL("api", "overview/fees/arbitrum");
      const response = await fetch(url);
      const data = await response.json();
      let curr_data = data.totalDataChartBreakdown.at(-1)[1]["Arbitrum"];
      let prev_data = data.totalDataChartBreakdown.at(-2)[1]["Arbitrum"];

      setMarketData((prevData) => ({
        ...prevData,
        fee: curr_data,
        feeChange: (curr_data - prev_data) / prev_data,
      }));
    } catch (error) {
      console.error("Error fetching volume:", error);
    }
  }, []);

  const fetchPrices = useCallback(async () => {
    const extractTokenPrices = (coins: Coins): Record<string, number> => {
      const result: Record<string, number> = {};

      for (const key in coins) {
        const { symbol, price } = coins[key];
        result[symbol] = price;
      }

      return result;
    };
    try {
      const url = getURL(
        "coins",
        "prices/current/arbitrum:0xaf88d065e77c8cc2239327c5edb3a432268e5831,arbitrum:0x912CE59144191C1204E64559FE8253a0e49E6548,arbitrum:0x82af49447d8a07e3bd95bd0d56f35241523fbab1"
      );
      const response = await fetch(url);
      const data = await response.json();
      const latest_prices = extractTokenPrices(data.coins);
      console.log(latest_prices);

      setMarketData((prevData) => ({
        ...prevData,
        prices: latest_prices,
      }));
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  }, []);

  const fetchPools = useCallback(async () => {
    try {
      const url = getURL("yields", "pools");
      const response = await fetch(url);
      const data = await response.json();
      const pools = data.data;
      console.log(pools.sort((a: any, b: any) => b.tvlUsd - a.tvlUsd));
      setMarketData((prevData) => ({
        ...prevData,
        pools: pools.sort((a: any, b: any) => b.tvlUsd - a.tvlUsd),
      }));
    } catch (error) {
      console.error("Error fetching pools:", error);
    }
  }, []);

  // -------------------------------------

  useEffect((): any => {
    // Initial fetch
    Promise.all([
      fetchTVL(),
      fetchVol(),
      fetchPools(),
      fetchFees(),
      fetchPrices(),
    ]);

    // Set up polling
    const intervalID = setInterval(() => {
      Promise.all([
        fetchTVL(),
        fetchVol(),
        fetchPools(),
        fetchFees(),
        fetchPrices(),
      ]);
    }, POLLING_INTERVAL);

    // Cleanup
    return () => {
      clearInterval(intervalID);
    };
  }, [fetchTVL, fetchVol, fetchPools, fetchPrices]);

  return { ...marketData, isConnected };
}
