import React, { useState, useEffect } from "react";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useBalance,
} from "wagmi";
import { parseEther } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";

// Importing our Reusable Components
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export const CoffeeForm = () => {
  const [amount, setAmount] = useState<string>("0.001");
  const { address, isConnected } = useAccount();

  // Balance Fetch
  const { data: balance } = useBalance({ address });

  // Transaction Hooks
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  // Confirmation Hook
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    sendTransaction({
      to: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // Replace with your wallet
      value: parseEther(amount),
    });
  };

  // Reset form on success
  useEffect(() => {
    if (isConfirmed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAmount("");
      alert("Coffee Received! ☕ Thanks!");
    }
  }, [isConfirmed]);

  return (
    <Card className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent mb-2">
          Buy Me A Coffee
        </h1>
        <p className="text-slate-400 text-sm">Support my work with crypto</p>
      </div>

      {/* Wallet Connection Status */}
      <div className="flex justify-center mb-8">
        <ConnectButton showBalance={false} />
      </div>

      {isConnected ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Balance Display */}
          <div className="bg-slate-800/50 p-3 rounded-lg flex justify-between text-sm">
            <span className="text-slate-400">Available:</span>
            <span className="font-mono text-emerald-400">
              {balance?.formatted.slice(0, 6)} {balance?.symbol}
            </span>
          </div>

          <Input
            label="Donation Amount"
            type="number"
            step="0.0001"
            placeholder="0.01"
            rightAdornment="ETH"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isPending || isConfirming}
          />

          <Button
            type="submit"
            isLoading={isPending || isConfirming}
            disabled={!amount}
          >
            {isPending
              ? "Check Wallet"
              : isConfirming
              ? "Confirming..."
              : "☕ Send Coffee"}
          </Button>

          {/* Error Message */}
          {error && (
            <p className="text-red-400 text-xs text-center mt-2 bg-red-500/10 p-2 rounded">
              {error.message}
            </p>
          )}
        </form>
      ) : (
        <div className="text-center py-6 bg-slate-800/30 rounded-xl border border-dashed border-slate-700">
          <p className="text-slate-400">
            Please connect your wallet to donate.
          </p>
        </div>
      )}
    </Card>
  );
};
