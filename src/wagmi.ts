import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "ArbiTrack",
  projectId: "DUMMY",
  chains: [arbitrum],
});
