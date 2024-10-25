import { useState } from "react";
import { ArrowLeftRight, Wallet, Coins, BookOpen } from "lucide-react";
import { ActionPanel } from "./ActionPanel";

interface DeFiActionsProps {
  isDarkMode?: boolean;
}

export function DeFiActions({ isDarkMode }: DeFiActionsProps) {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const handleActionClick = (panel: string) => {
    setActivePanel(panel);
  };

  const handleClose = () => {
    setActivePanel(null);
  };

  const actions = [
    { id: "swap", icon: ArrowLeftRight, label: "Swap Tokens", available: true },
    { id: "bridge", icon: Wallet, label: "Bridge Assets", available: false },
    { id: "stake", icon: Coins, label: "Stake Tokens", available: false },
    { id: "learn", icon: BookOpen, label: "Learn DeFi", available: true },
  ];

  return (
    <>
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
          {actions.map(({ id, icon: Icon, label, available }) => (
            <button
              key={id}
              onClick={() => handleActionClick(id)}
              className={`p-4 flex flex-col items-center gap-2 rounded-lg transition-colors relative
                ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-purple-400"
                    : "bg-purple-50 hover:bg-purple-100 text-purple-600"
                }
                ${!available && "opacity-75"}`}
            >
              <Icon className="w-6 h-6" />
              <span>{label}</span>
              {!available && (
                <span
                  className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full
                  ${
                    isDarkMode
                      ? "bg-gray-600 text-gray-300"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  Soon
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {activePanel && (
        <ActionPanel
          type={activePanel}
          onClose={handleClose}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  );
}
