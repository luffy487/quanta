import React from "react";
import { Button } from "@nextui-org/button";
import { useWallet } from "./WalletContextProvider";

const WalletButton: React.FC = () => {
  const { walletAddress, connectWallet } = useWallet();

  return (
    <div className="flex items-center space-x-2">
      {walletAddress ? (
        <div className="px-4 py-2 rounded-full flex items-center space-x-2 border text-customGreen border-customGreen">
          <p>
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
        </div>
      ) : (
        <Button
          onClick={connectWallet}
          className="border border-customGreen px-4 py-2 text-customGreen rounded-full hover:bg-black"
        >
          <span>Connect Wallet</span>
        </Button>
      )}
    </div>
  );
};

export default WalletButton;
