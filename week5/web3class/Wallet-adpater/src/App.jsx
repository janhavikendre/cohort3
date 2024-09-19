import React from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Airdrop } from './Airdrop';

import '@solana/wallet-adapter-react-ui/styles.css';
import { Buffer } from 'buffer';  // Correct import from 

// Ensure Buffer is available globally
window.Buffer = window.Buffer || Buffer;

function App() {
    return (
        <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/DEhoo-faZJyJO03UWMXSsKycjKrK_w9G">
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                    
                    <Airdrop />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;
