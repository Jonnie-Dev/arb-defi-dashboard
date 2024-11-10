import { useState, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";
import { useBalance } from "wagmi";

import { config } from "../wagmi";

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
  balance: {
    [key: string]: bigint | string;
  };
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

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);

  const account = useAccount({ config });

  const [marketData, setMarketData] = useState<MarketData>({
    tvl: 0,
    tvlChange: 0,
    volume24h: 0,
    volumeChange: 0,
    fee: 0,
    feeChange: 0,
    prices: {},
    pools: [],
    balance: {},
  });

  if (account.status === "connected") {
    account;
  }

  const USDC = useBalance({
    address: account?.address,
    token: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
  });

  const ARB = useBalance({
    address: account?.address,
    token: "0x912CE59144191C1204E64559FE8253a0e49E6548",
  });

  const ETH = useBalance({
    address: account?.address,
    token: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
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
    } catch (error) {
      console.error("Failed to fetch TVL:", error);
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
      const pools = data.data.sort((a: any, b: any) => b.apy - a.apy);

      setMarketData((prevData) => ({
        ...prevData,
        pools: pools,
      }));
    } catch (error) {
      console.error("Error fetching pools:", error);
    }
  }, []);

  const fetchBalance = useCallback(() => {
    if (account.status === "connected") {
      const balance_obj = {
        usdc: Number(USDC.data?.value).toFixed(2) || "__",
        arb: Number(ARB.data?.value).toFixed(2) || "__",
        eth: Number(ETH.data?.value).toFixed(2) || "__",
      };

      setMarketData((prevData) => ({
        ...prevData,
        balance: balance_obj,
      }));
    } else {
      const balance_obj = {
        usdc: "__",
        arb: "__",
        eth: "__",
      };
      setMarketData((prevData) => ({
        ...prevData,
        balance: balance_obj,
      }));
    }
  }, [account.status, USDC.data, ARB.data, ETH.data]);

  const fetchAllData = useCallback(async () => {
    try {
      // Trigger all fetches and wait for their completion
      await Promise.all([
        fetchTVL(),
        fetchVol(),
        fetchPools(),
        fetchFees(),
        fetchPrices(),
        fetchBalance(),
      ]);

      // If all fetches succeed, update the connection status to true
      setIsConnected(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsConnected(false); // Set connection status to false if any fetch fails
    }
  }, [fetchTVL, fetchVol, fetchPools, fetchFees, fetchPrices, fetchBalance]);

  // --------------------------------------------------------------------

  useEffect((): any => {
    // Initial fetch
    fetchAllData();

    // Set up polling
    const intervalID = setInterval(() => {
      fetchAllData();
    }, POLLING_INTERVAL);

    // Cleanup
    return () => {
      clearInterval(intervalID);
    };
  }, [fetchAllData]);

  return { ...marketData, isConnected };
}
