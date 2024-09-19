import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wallets, setWallets] = useState([]);

    async function generatewallet(){
        const seed = await mnemonicToSeed(mnemonic);
         const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey);

 
        setWallets([...wallets, { publicKey: keypair.publicKey}]);
        setCurrentIndex(currentIndex + 1);
    }

    return <div>
    <button onClick={generatewallet}>Add wallet</button>
    {wallets.map((wallet,index)=>(
        <div key={index}>
           <p>Public Key : {wallet.publicKey.toBase58()}</p>

        </div>
    ))}
    </div>
}