import { useState } from "react";
import { generateMnemonic } from 'bip39'; 
import { SolanaWallet } from "./component/SolanaWallet";
import { SendTransaction } from "./component/sendTransaction";
import { FetchBalance } from "./component/FetchBalance";
import { EthWallet } from "./component/ETHWallet";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  const handleGenerateMnemonic = async () => {
    try {
      const mn = await generateMnemonic();
      setMnemonic(mn);
    } catch (error) {
      console.error("Error generating mnemonic:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 flex justify-center items-center p-6">
      <div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Wallet </h1>
          <p className="text-gray-600">Create and manage your blockchain wallets seamlessly.</p>
        </div>
        <div className="text-center mb-8">
          <button
            onClick={handleGenerateMnemonic}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            Create Seed Phrase
          </button>
        </div>
        <div className="mb-8">
          <input
            type="text"
            value={mnemonic}
            readOnly
            className="border border-gray-300 p-3 w-full rounded-lg text-center bg-gray-50"
            placeholder="Your Seed Phrase will appear here"
          />
        </div>

        {mnemonic && (
          <div className="space-y-8">
            <SolanaWallet mnemonic={mnemonic} />
            <EthWallet mnemonic={mnemonic} />
            <SendTransaction mnemonic={mnemonic} />
            <FetchBalance />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
