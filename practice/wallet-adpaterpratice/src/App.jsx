import React from "react";
import { ConnectionProvider,WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider,WalletMultiButton,WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';
import { Airdrop } from "./Airdrop";
import { SendToken } from "./SendToken";
import { SignMessage } from "./Signmessage";
import { ShowBalnace } from "./showsolbalance";
import { Buffer } from "buffer";

globalThis.Buffer= Buffer;

 function App(){
  return(
  <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/DEhoo-faZJyJO03UWMXSsKycjKrK_w9G">
    <WalletProvider wallets={[]} autoConnect>
      <WalletModalProvider>
        <WalletMultiButton />
          <WalletDisconnectButton />
        <Airdrop></Airdrop>
        <SendToken></SendToken>
        <SignMessage></SignMessage>
        <ShowBalnace></ShowBalnace>
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
  )
}
export default App