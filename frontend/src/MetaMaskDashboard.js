import React from 'react';

const MetaMaskDashboard = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-96 bg-gray-800 text-white rounded-lg shadow-md p-6">
        {/* MetaMask Logo */}
        <div className="flex justify-between items-center mb-6">
          <img
            src="/path-to-logo.png"
            alt="MetaMask Logo"
            className="w-12 h-12"
          />
          <div className="text-sm">
            <p className="font-bold">Account 1</p>
            <p className="text-gray-400">0x5dAe0...1Cc57</p>
          </div>
        </div>

        {/* Ethereum Balance */}
        <div className="bg-gray-700 p-4 rounded-lg mb-6 text-center">
          <h2 className="text-3xl font-bold">0 ETH</h2>
          <p className="text-gray-400">$0.00 USD</p>
          <p className="text-xs text-gray-400 mt-1">+ $0.00 (0.00%)</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-5 gap-2 mb-6 text-center">
          <button className="col-span-1 bg-gray-700 p-2 rounded-full text-xs hover:bg-gray-600">
            Buy & Sell
          </button>
          <button className="col-span-1 bg-gray-700 p-2 rounded-full text-xs hover:bg-gray-600">
            Send
          </button>
          <button className="col-span-1 bg-gray-700 p-2 rounded-full text-xs hover:bg-gray-600">
            Swap
          </button>
          <button className="col-span-1 bg-gray-700 p-2 rounded-full text-xs hover:bg-gray-600">
            Bridge
          </button>
          <button className="col-span-1 bg-gray-700 p-2 rounded-full text-xs hover:bg-gray-600">
            Portfolio
          </button>
        </div>

        {/* Fund Your Wallet Section */}
        <div className="bg-blue-700 rounded-lg p-4 mb-6 text-center">
          <p className="font-bold mb-2">Fund your wallet</p>
          <p className="text-sm text-gray-300 mb-4">
            Get started by adding some ETH to your wallet.
          </p>
          <button className="bg-white text-blue-700 font-bold py-2 px-4 rounded-full">
            Buy ETH
          </button>
        </div>

        {/* Other Options */}
        <div className="space-y-4">
          <p className="text-gray-400">Ethereum Mainnet</p>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <p>Receive tokens</p>
            <p>Import tokens</p>
          </div>
          <p className="text-xs text-gray-500">MetaMask support</p>
        </div>
      </div>
    </div>
  );
};

export default MetaMaskDashboard;
