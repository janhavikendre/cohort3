import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useDebugValue } from "react";
export function Airdrop(){
    const wallet = useWallet();
    const {connection} = useConnection();
    async function airdrop(){
        const amount = document.getElementById("amount").value;
        try{
            await connection.requestAirdrop(wallet.publicKey, amount*LAMPORTS_PER_SOL);
            alert("Airdropped"+amount +"SOL TO" + wallet.publicKey.toBase58());

        }catch(error){
           alert("failed to airdrop"+ error.message);
        }
    }
    return(
        <div>
        <input type="text" id="amount" />
        <button onClick={airdrop}>Request Airdrop</button>
        </div>
    )
}