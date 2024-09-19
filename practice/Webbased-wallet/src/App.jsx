import { generateMnemonic } from "bip39";
import { useState } from "react";
import { SolanaWallet } from "./components/SolWallet";
// import { SolanaWallet } from "./components/solwallet2";
import { EthWallet } from "./components/EthWallet";
function  App(){
  const [mnemonic,setMnemonic]=useState('')

  return(
    <div>
      <button onClick={async function(){
        const mn = await generateMnemonic();
        setMnemonic(mn)
      }}>Create Seed</button>
      <input type="text" value={mnemonic} />
      <SolanaWallet mnemonic={mnemonic} />
      <EthWallet mnemonic={mnemonic} />
    </div>
  )
}
export default App
