import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, mainnet } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
  chains: [arbitrum, mainnet],
});
