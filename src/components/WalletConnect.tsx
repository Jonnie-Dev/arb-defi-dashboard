import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function WalletConnect() {
  return (
    <ConnectButton
      showBalance={false}
      label="Connect Wallet"
      accountStatus={{
        smallScreen: "avatar",
        largeScreen: "full",
      }}
    />
  );
}
