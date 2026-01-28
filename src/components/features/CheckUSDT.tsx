import React, { useState } from 'react';
import { useBalance, useChainId } from 'wagmi';
import { isAddress } from 'viem'; // Address validate karne ke liye
import { mainnet, sepolia } from 'wagmi/chains';

// Reusable Components Imports
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

// Configuration: USDT Address for different networks
const USDT_CONTRACT_ADDRESS: Record<number, `0x${string}`> = {
  [mainnet.id]: '0x8806a520C98aF55804Bc4e591bbEBaCDE6528463', // Real USDT
  [sepolia.id]: '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06', // Dummy USDT (Sepolia)
};

export const CheckUSDT = () => {
  // 1. State for Input (Jo user type karega)
  const [inputValue, setInputValue] = useState('');
  
  // 2. State for Search (Jo button dabane par set hoga)
  const [searchAddress, setSearchAddress] = useState<`0x${string}` | undefined>(undefined);
  
  const chainId = useChainId();
  const tokenAddress = USDT_CONTRACT_ADDRESS[chainId];

  // 3. Balance Fetch Hook
  // Ye hook automatically run karega jab 'searchAddress' update hoga
  const { data, isLoading, isError, error, refetch } = useBalance({
    address: searchAddress, // Kiska balance check karna hai?
    token: tokenAddress,    // Kaunsa coin check karna hai?
    query: {
        enabled: !!searchAddress && !!tokenAddress // Tab tak run mat karo jab tak address na mile
    }
  });

  // Handle Search Click
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Kya ye sahi address hai?
    if (!isAddress(inputValue)) {
      alert("Please enter a valid Ethereum address (starts with 0x)");
      return;
    }

    // Agar sahi hai, to state update karo -> Hook trigger hoga
    setSearchAddress(inputValue as `0x${string}`);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8 border-violet-500/30">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-white">🔍 USDT Inspector</h2>
        <p className="text-slate-400 text-xs">Check USDT balance of any wallet</p>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        <Input 
          label="Enter Wallet Address"
          placeholder="0x123...abc"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <Button type="submit" isLoading={isLoading}>
          Check Balance
        </Button>
      </form>

      {/* Result Display Section */}
      {searchAddress && (
        <div className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800 animate-fade-in">
          <p className="text-xs text-slate-500 mb-1">Result for:</p>
          <p className="text-xs font-mono text-slate-400 break-all mb-4">{searchAddress}</p>

          {isError ? (
            <div className="text-red-400 text-sm text-center">
              Failed to fetch. {(error as any)?.shortMessage || "Check network"}
            </div>
          ) : data ? (
            <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700">
              <span className="font-bold text-slate-300">Balance:</span>
              <span className="text-xl font-mono font-bold text-emerald-400">
                {Number(data.formatted).toFixed(2)} {data.symbol}
              </span>
            </div>
          ) : null}
          
          {!tokenAddress && (
            <p className="text-yellow-500 text-xs mt-2 text-center">
              ⚠️ USDT not configured for this network
            </p>
          )}
        </div>
      )}
    </Card>
  );
};