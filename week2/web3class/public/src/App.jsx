import {ethers} from 'ethers';
import { HDNode } from '@ethersproject/hdnode';
import { useState } from 'react';

const WalletGenerator = ()=>{
  const [mnemonic,setMnemonic]= useState('');
  const [wallets,setWallets]= useState([]);

  const generateMnemonic =()=>{
    const janhavi = ethers.Wallet.createRandom();
    setMnemonic(janhavi.mnemonic.phrase);
  }
const addWallet = ()=>{
  if(!mnemonic){
    alert('pahila memonic tak');
    return;
  }
  
  const node = HDNode.fromMnemonic(mnemonic);
  const path = `m/44'/60'/0'/0/${wallets.length}`;
  const derived = node.derivePath(path);
  const wallet = new ethers.Wallet(derived.privateKey);
  setWallets([...wallets,wallet])
}
return (
  <div>
    My wallet
    <div>
      <button onClick={generateMnemonic}>Generate button</button>
      {mnemonic &&<p>{mnemonic}</p> }
    </div>
    <div>
      <button onClick={addWallet}>add your wallet</button>
      <div>
        {wallets.map((wallet,index)=>(
          <div key={index}>
            <p>Wallet {index+1}:{wallet.address}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)
}

export default WalletGenerator;