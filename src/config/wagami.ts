import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  linea,
  bsc,
  avalanche,
  fantom,
  gnosis,
  sepolia,
  megaethTestnet,
} from "wagmi/chains";
import { QueryClient } from "@tanstack/react-query";

const projectId = "d3277a89c7d2d436c416d5c2d82880be";

// 2. Wagmi Config
export const config = getDefaultConfig({
  appName: "Crypto Coffee",
  projectId,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    linea,
    bsc,
    avalanche,
    fantom,
    gnosis,
    sepolia,
    megaethTestnet,
  ],
  ssr: true,
});

// 3. Query Client Singleton
export const queryClient = new QueryClient();
