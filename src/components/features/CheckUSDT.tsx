import React, { useState } from 'react';
import { useBalance, useChainId } from 'wagmi';
import { isAddress } from 'viem';
import { mainnet, sepolia } from 'wagmi/chains';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

// Configuration: USDT Address for different networks
const USDT_CONTRACT_ADDRESS: Record<number, `0x${string}`> = {
  [mainnet.id]: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  [sepolia.id]: '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06',
};

export const CheckUSDT = () => {

  const [inputValue, setInputValue] = useState('');
  const [searchAddress, setSearchAddress] = useState<`0x${string}` | undefined>(undefined);
  
  const chainId = useChainId();
  const tokenAddress = USDT_CONTRACT_ADDRESS[chainId];
  const { data, isLoading, isError, error } = useBalance({
    address: searchAddress, 
    token: tokenAddress,   
    query: {
        enabled: !!searchAddress && !!tokenAddress 
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAddress(inputValue)) {
      alert("Please enter a valid Ethereum address (starts with 0x)");
      return;
    }

    setSearchAddress(inputValue as `0x${string}`);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8 border-violet-500/30">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-white"> USDT Inspector</h2>
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
              USDT not configured for this network
            </p>
          )}
        </div>
      )}
    </Card>
  );
};