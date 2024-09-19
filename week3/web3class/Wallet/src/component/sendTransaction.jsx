import { useState } from "react";
import { ethers } from "ethers";
import { HDNode } from '@ethersproject/hdnode';

export function SendTransaction({ mnemonic }) {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [error, setError] = useState("");

  const handleSendTransaction = async () => {
    try {
      setError("");

      const parsedAmount = ethers.parseEther(amount);
      
      const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/5fdd7d40896c45ca95de195e0aff6a5b');
      const hdNode = HDNode.fromMnemonic(mnemonic);
      const wallet = new ethers.Wallet(hdNode.privateKey, provider);

      const txParams = {
        nonce: await wallet.getNonce(),
        gasLimit: 21000, 
        gasPrice: ethers.parseUnits('20', 'gwei'), 
        to: toAddress,
        value: parsedAmount,
      };

      const txResponse = await wallet.sendTransaction(txParams);
      const receipt = await txResponse.wait();

      setTransactionHash(receipt.transactionHash);
    } catch (error) {
      console.error("Error sending transaction:", error);
      setError(error.message);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-gray-100 shadow-lg rounded-xl border border-gray-300">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Transaction</h2>
      
      <div className="mb-6">
        <label htmlFor="toAddress" className="block text-sm font-medium text-gray-700 mb-2">
          Recipient Address
        </label>
        <input
          id="toAddress"
          type="text"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          placeholder="0x..."
          className="border border-gray-300 p-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
          Amount (ETH)
        </label>
        <input
          id="amount"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="border border-gray-300 p-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>
      
      <div className="mb-6">
        <button
          onClick={handleSendTransaction}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Send Transaction
        </button>
      </div>

      {transactionHash && (
        <div className="text-green-600 mt-4">
          Transaction successful! Hash: <a href={`https://rinkeby.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer" className="underline">{transactionHash}</a>
        </div>
      )}

      {error && (
        <div className="text-red-600 mt-4">
          Error: {error}
        </div>
      )}
    </div>
  );
}
