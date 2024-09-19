import { useState } from "react";
import { sendJsonRpcRequest } from "../utils/jsonRpc";

export function FetchBalance() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchBalance = async () => {
    try {
      setError(null);

      const result = await sendJsonRpcRequest(
        "https://eth-mainnet.g.alchemy.com/v2/Xy4Y5_8R2ks3ytY6JeL4az8I4Z6w5Hj5",
        "eth_getBalance",
        [address, "latest"]
      );

      const balanceInEth = parseInt(result, 16) / 1e18;
      setBalance(balanceInEth);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Fetch Balance</h2>
      
      <div className="mb-6">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Wallet Address
        </label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x..."
          className="border border-gray-300 p-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      <div className="mb-6">
        <button
          onClick={handleFetchBalance}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Fetch Balance
        </button>
      </div>

      {balance !== null && (
        <div className="text-green-600 mt-4">
          Balance: {balance.toFixed(4)} ETH
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
