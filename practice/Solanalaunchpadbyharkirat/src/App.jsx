import './App.css'

import { ConnectionProvider,WalletProvider } from '@solana/wallet-adapter-react'
import{
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { TokenLaunch } from './components/Tokenlaunch';
export default function App(){
  return(
    <div className='TokenLaunch flex flex-col items-center justify-center bg-gray-100 '>
      <ConnectionProvider endpoint={'https://solana-devnet.g.alchemy.com/v2/DEhoo-faZJyJO03UWMXSsKycjKrK_w9G'}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className='container mx-auto p-8 mb-10'>
            <div className='flex justify-between items-center bg-white shadow-md p-6 rounded-lg'>
              <WalletMultiButton className='btn btn-primary' />
              <WalletDisconnectButton className='btn btn-danger' />
          <TokenLaunch></TokenLaunch>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
      </ConnectionProvider>

    </div>
  )
}       