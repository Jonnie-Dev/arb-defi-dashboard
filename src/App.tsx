import React, { useState } from "react";

import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
// import { WalletConnect } from "./components/WalletConnect";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Sun, Moon } from "lucide-react";

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
              padding: 12,
            }}
            className="mb-8"
          >
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
