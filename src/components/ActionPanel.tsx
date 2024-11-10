import { useState } from "react";
import {
  X,
  ArrowLeftRight,
  Wallet,
  Coins,
  BookOpen,
  ChevronDown,
} from "lucide-react";

interface Token {
  symbol: string;
  name: string;
  icon: string;
}

interface ActionPanelProps {
  type: string;
  onClose: () => void;
  isDarkMode?: boolean;
}

const tokens: Token[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: "⟠",
  },
  {
    symbol: "ARB",
    name: "Arbitrum",
    icon: "🔷",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: "💵",
  },
];

export function ActionPanel({ type, onClose, isDarkMode }: ActionPanelProps) {
  const [fromToken, setFromToken] = useState<Token>(tokens[0]);
  const [toToken, setToToken] = useState<Token>(tokens[1]);
  const [amount, setAmount] = useState("");
  const [showFromTokens, setShowFromTokens] = useState(false);
  const [showToTokens, setShowToTokens] = useState(false);

  const getTitle = () => {
    switch (type) {
      case "swap":
        return "Swap Tokens";
      case "bridge":
        return "Bridge Assets (Coming Soon)";
      case "stake":
        return "Stake Tokens (Coming Soon)";
      case "learn":
        return "Learn DeFi (Coming Soon)";
      default:
        return "";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "swap":
        return <ArrowLeftRight className="w-6 h-6" />;
      case "bridge":
        return <Wallet className="w-6 h-6" />;
      case "stake":
        return <Coins className="w-6 h-6" />;
      case "learn":
        return <BookOpen className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const TokenSelector = ({
    selected,
    onSelect,
    show,
    onToggle,
    excludeToken,
  }: {
    selected: Token;
    onSelect: (token: Token) => void;
    show: boolean;
    onToggle: () => void;
    excludeToken: Token;
  }) => {
    const availableTokens = tokens.filter(
      (token) => token.symbol !== excludeToken.symbol
    );

    return (
      <div className="relative">
        <button
          onClick={onToggle}
          className={`w-full p-2 rounded-lg border flex items-center justify-between ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="text-xl">{selected.icon}</span>
            <span>{selected.symbol}</span>
          </span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {show && (
          <div
            className={`absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg border z-10 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-200"
            }`}
          >
            {availableTokens.map((token) => (
              <button
                key={token.symbol}
                onClick={() => {
                  onSelect(token);
                  onToggle();
                }}
                className={`w-full p-2 flex items-center gap-2 hover:${
                  isDarkMode ? "bg-gray-600" : "bg-gray-50"
                }`}
              >
                <span className="text-xl">{token.icon}</span>
                <div className="text-left">
                  <div className={isDarkMode ? "text-white" : "text-gray-900"}>
                    {token.symbol}
                  </div>
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {token.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-xl shadow-xl w-full max-w-lg mx-4`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {getIcon()}
              <h2
                className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {getTitle()}
              </h2>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                  : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {type === "_swap" ? (
            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  From
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <TokenSelector
                    selected={fromToken}
                    onSelect={setFromToken}
                    show={showFromTokens}
                    onToggle={() => setShowFromTokens(!showFromTokens)}
                    excludeToken={toToken}
                  />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`p-2 rounded-lg border ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="0.0"
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  To
                </label>
                <TokenSelector
                  selected={toToken}
                  onSelect={setToToken}
                  show={showToTokens}
                  onToggle={() => setShowToTokens(!showToTokens)}
                  excludeToken={fromToken}
                />
              </div>

              <button
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                Swap
              </button>
            </div>
          ) : type === "learn" ? (
            <div
              className={`space-y-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <h3 className="font-medium">DeFi Learning Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="http://bit.ly/4flV82z">• Introduction to DeFi</a>
                </li>
                <li>
                  <a href="https://bit.ly/3Z0WIRO">
                    • Understanding Liquidity Pools
                  </a>
                </li>
                <li>
                  <a href="https://bit.ly/3Cnu04L">• Risk Management in DeFi</a>
                </li>
              </ul>
            </div>
          ) : (
            <div
              className={`text-center py-8 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <p>This feature is coming soon!</p>
              <p className="text-sm mt-2">
                We're working hard to bring you the best DeFi experience.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
