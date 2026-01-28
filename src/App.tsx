import "@rainbow-me/rainbowkit/styles.css";

// Providers
import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";

import { CoffeeForm } from "./components/features/CoffeeForm";
import { config, queryClient } from "./config/wagami";
import { CheckUSDT } from "./components/features/CheckUSDT";

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#7c3aed", // Violet color
            accentColorForeground: "white",
            borderRadius: "large",
          })}
        >
          {/* Main Layout */}
          <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decoration (Optional Blobs) */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Feature Component */}
            <div className="relative z-10 w-full">
              <CoffeeForm />
              <CheckUSDT />
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
