import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wallets, setWallets] = useState([]);

    const getBalance = async (publicKey) => {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const balance = await connection.getBalance(publicKey);
        return balance / 1e9; 
    };

    return (
        <div>
            <button
                onClick={async function () {
                    const seed = await mnemonicToSeed(mnemonic);
                    const path = `m/44'/501'/${currentIndex}'/0'`;
                    const derivedSeed = derivePath(path, seed.toString("hex")).key;
                    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
                    const keypair = Keypair.fromSecretKey(secret);
                    const balance = await getBalance(keypair.publicKey);

                    setWallets([...wallets, { publicKey: keypair.publicKey, balance }]);
                    setCurrentIndex(currentIndex + 1);
                }}
            >
                Add wallet
            </button>
            {wallets.map((wallet, index) => (
                <div key={index}>
                    <p>Public Key: {wallet.publicKey.toBase58()}</p>
                    <p>Balance: {wallet.balance} SOL</p>
                </div>
            ))}
        </div>
    );
}

// import { useState } from "react";
// import { mnemonicToSeed } from "bip39";
// import { derivePath } from "ed25519-hd-key";
// import { Keypair,Connection,clusterApiUrl,PublicKey } from "@solana/web3.js";


// export function SolanaWallet({mnemonic}){
//     const [currentIndex,setCurrentIndex]= useState(0);
//     const [wallets,setWallets]= useState([]);
// async function getBalance(publicKey){
//     const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
//     const balance = await connection.getBalance(publicKey);
//     return balance / 1e9;

// }

//    async function generatewallet(){
//         const seed =await mnemonicToSeed(mnemonic);
//         const path = `m/44'/501'/${currentIndex}'/0'`;
//         const derivedseed = derivePath(path,seed.toString("hex")).key
        
//         const keypair = Keypair.fromSeed(derivedseed);
//         const balance = await getBalance(keypair.publicKey);

//         setWallets([...wallets,{publicKey:keypair.publicKey,balance}]);
//         setCurrentIndex(currentIndex+1);
//     }
//     return(
//         <>
//         <div>
//             <button onClick={generatewallet}>Add wallet</button>
//             {wallets.map((wallet,index)=>(
//                 <div key={index}>
//                     <p>Public key :{wallet.publicKey.toBase58()}</p>
//                     <p>Balance : {wallet.balance} Sol</p>
//                 </div>
//             ))}
//         </div>
//         </>
//     )
// }
