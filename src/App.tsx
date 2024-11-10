import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { WalletConnect } from "./components/WalletConnect";
import { Sun, Moon, Activity } from "lucide-react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
        <div className="container mx-auto px-4 py-8">
          <header className="flex items-center justify-between p-4 mb-12">
            <div className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold text-white">ArbiTrack</span>
            </div>
            <div className="flex items-center gap-4">
              <WalletConnect />
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg text-gray-300 hover:text-white transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-8 h-8" />
                ) : (
                  <Moon className="w-8 h-8" />
                )}
              </button>
            </div>
          </header>
          <Dashboard isDarkMode={isDarkMode} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
