import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function WalletConnect() {
  return (
    <div className="w-full sm:w-auto">
      <ConnectButton
        showBalance={false}
        label="Connect Wallet"
        chainStatus="none"
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
      />
    </div>
  );
}
