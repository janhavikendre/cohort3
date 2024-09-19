import { generateMnemonic } from "bip39";
import { useState } from "react";
import { SolanaWallet } from "./components/solwallet";
function App(){
  const[mnemonic,setMnemonic]= useState('');

  return(
    <div>
      <button onClick={async function(){
        const mn = generateMnemonic();
        setMnemonic(mn)
      }}>Create seed</button>
      <input type="text" value={mnemonic} />
      <SolanaWallet/>
    </div>
  )
}
export default App