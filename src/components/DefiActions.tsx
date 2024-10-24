import React from "react";
import { ArrowLeftRight, Wallet, Coins, BookOpen } from "lucide-react";

interface DeFiActionsProps {
  isDarkMode?: boolean;
}

export function DeFiActions({ isDarkMode }: DeFiActionsProps) {
  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl shadow-md p-6`}
    >
      <h2
        className={`text-2xl font-bold mb-4 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          className={`p-4 flex flex-col items-center gap-2 rounded-lg transition-colors
          ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600 text-purple-400"
              : "bg-purple-50 hover:bg-purple-100 text-purple-600"
          }`}
        >
          <ArrowLeftRight className="w-6 h-6" />
          <span>Swap Tokens</span>
        </button>
        <button
          className={`p-4 flex flex-col items-center gap-2 rounded-lg transition-colors
          ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600 text-purple-400"
              : "bg-purple-50 hover:bg-purple-100 text-purple-600"
          }`}
        >
          <Wallet className="w-6 h-6" />
          <span>Bridge Assets</span>
        </button>
        <button
          className={`p-4 flex flex-col items-center gap-2 rounded-lg transition-colors
          ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600 text-purple-400"
              : "bg-purple-50 hover:bg-purple-100 text-purple-600"
          }`}
        >
          <Coins className="w-6 h-6" />
          <span>Stake Tokens</span>
        </button>
        <button
          className={`p-4 flex flex-col items-center gap-2 rounded-lg transition-colors
          ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600 text-purple-400"
              : "bg-purple-50 hover:bg-purple-100 text-purple-600"
          }`}
        >
          <BookOpen className="w-6 h-6" />
          <span>Learn DeFi</span>
        </button>
      </div>
    </div>
  );
}
