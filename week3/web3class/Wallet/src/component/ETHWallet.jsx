import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export const EthWallet = ({ mnemonic }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);

    const addEthWallet = async () => {
        try {
            const seed = await mnemonicToSeed(mnemonic);
            const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(derivationPath);
            const wallet = new Wallet(child.privateKey);

            setCurrentIndex(currentIndex + 1);
            setAddresses([...addresses, wallet.address]);
        } catch (error) {
            console.error("Error generating wallet:", error);
        }
    };

    return (
        <div className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ethereum Wallets</h2>

            <button
                onClick={addEthWallet}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
                Add ETH Wallet
            </button>

            <div className="mt-6">
                {addresses.length > 0 ? (
                    addresses.map((address, index) => (
                        <div key={index} className="mb-2 text-sm font-mono text-gray-700">
                            ETH Wallet {index + 1}: <a href={`https://etherscan.io/address/${address}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{address}</a>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500">No wallets generated yet.</div>
                )}
            </div>
        </div>
    );
};
