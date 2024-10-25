import React, { useState } from "react";

import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
// import { WalletConnect } from "./components/WalletConnect";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Sun, Moon, Activity } from "lucide-react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="container mx-auto px-4 py-8">
          <header
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: 16,
            }}
            className="mb-12"
          >
            <div className="flex mr-auto items-center gap-2 ">
              <Activity className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold text-white">ArbiDeFi</span>
            </div>
            <ConnectButton />
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg ${
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-8 h-8" />
              ) : (
                <Moon className="w-8 h-8" />
              )}
            </button>
          </header>
          <Dashboard isDarkMode={isDarkMode} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
