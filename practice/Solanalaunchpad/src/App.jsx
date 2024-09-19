import './App.css';
import { ConnectionProvider,WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { TokenLaunch } from './components/TokenLaunchpad';

function App(){
  return(
    <div className='min-h-screen flex justify-center items-center bg-gray-50'>
       <ConnectionProvider endpoint={'https://solana-devnet.g.alchemy.com/v2/DEhoo-faZJyJO03UWMXSsKycjKrK_w9G'}>
       <WalletProvider wallets={[]} autoConnect>
       <WalletModalProvider>
        <div className='container mx-auto p-8'>
          <div className='flex justify-between items-center bg-slate-200 shadow-md p-6 rounded-lg'>
          <WalletMultiButton className='btn border-t-green-50 btn-primaer' />
          <WalletDisconnectButton className='btn btn-danger border-t-green-50' />

          </div>
          <TokenLaunch/>
        </div>
       </WalletModalProvider>
       </WalletProvider>
       </ConnectionProvider>
    </div>
  )
}

export default App;