import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);

    const addWallet = async () => {
        try {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);

            setCurrentIndex(currentIndex + 1);
            setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
        } catch (error) {
            console.error("Failed to generate wallet:", error);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Solana Wallets</h2>
            <button
                onClick={addWallet}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
            >
                Add Solana Wallet
            </button>

            <div className="mt-6">
                {publicKeys.length > 0 ? (
                    publicKeys.map((publicKey, index) => (
                        <div key={index} className="mb-2 p-3 bg-gray-100 rounded-lg shadow-md">
                            <p className="text-sm text-gray-700">Wallet {index + 1}:</p>
                            <p className="font-mono text-sm text-gray-900">{publicKey}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No wallets added yet.</p>
                )}
            </div>
        </div>
    );
}
