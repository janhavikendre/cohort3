import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function RequestAirdrop(){

    const wallet = useWallet()
    const {connection} = useConnection()
    function requestAirdrop(){
       const publicKey = wallet.publicKey;
       const amount = document.getElementById("amount").value
       connection.requestAirdrop(publicKey,amountLAMPORTS_PER_SOL)
    }

    return <div>
        <input id="amount" type="text" placeholder="Amount .." />
        <button onClick={requestAirdrop}>Request Amount</button>
        {/ {wallet.publicKey?.toBase58()} */}
    </div>
}
import React from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";

import '@solana/wallet-adapter-react-ui/styles.css';


function App(){
  return(
  <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
    <WalletProvider wallets={[]} autoConnect>
    <WalletModalProvider>

      <div style={{width:"100vw",display:"flex",justifyContent:'center'}}>
      <WalletMultiButton />
    <RequestAirdrop/>
      </div>
    </WalletModalProvider>

    </WalletProvider>
  </ConnectionProvider>
  )
}
export default App
