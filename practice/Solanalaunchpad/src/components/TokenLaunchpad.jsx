import { useState } from 'react';
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { 
  MINT_SIZE, 
  TOKEN_2022_PROGRAM_ID, 
  createMintToInstruction, 
  createAssociatedTokenAccountInstruction, 
  getMintLen, 
  createInitializeMetadataPointerInstruction, 
  createInitializeMintInstruction, 
  TYPE_SIZE, 
  LENGTH_SIZE, 
  ExtensionType, 
  getAssociatedTokenAddressSync 
} from "@solana/spl-token";
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';

export function TokenLaunch() {
  const { connection } = useConnection();
  const wallet = useWallet();

  
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [uri, setUri] = useState('');
  const [initialSupply, setInitialSupply] = useState(0);

  async function createToken() {
    const mintKeypair = Keypair.generate();
    
    
    const metadata = {
      mint: mintKeypair.publicKey,
      name: name, 
      symbol: symbol, 
      uri: uri, 
      additionalMetadata: []
    };

    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
    const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: mintLen,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      }),
      createInitializeMetadataPointerInstruction(
        mintKeypair.publicKey, 
        wallet.publicKey, 
        mintKeypair.publicKey, 
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeMintInstruction(mintKeypair.publicKey, 9, wallet.publicKey, null, TOKEN_2022_PROGRAM_ID),
      createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: mintKeypair.publicKey,
        metadata: mintKeypair.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        mintAuthority: wallet.publicKey,
        updateAuthority: wallet.publicKey,
      })
    );
    
    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.partialSign(mintKeypair);
    
    await wallet.sendTransaction(transaction, connection);

    const associatedToken = getAssociatedTokenAddressSync(mintKeypair.publicKey, wallet.publicKey, false, TOKEN_2022_PROGRAM_ID);

    const transaction2 = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey, 
        associatedToken, 
        wallet.publicKey, 
        mintKeypair.publicKey, 
        TOKEN_2022_PROGRAM_ID
      )
    );

    await wallet.sendTransaction(transaction2, connection);

    const transaction3 = new Transaction().add(
      createMintToInstruction(
        mintKeypair.publicKey, 
        associatedToken, 
        wallet.publicKey, 
        initialSupply * 1e9, 
        [], 
        TOKEN_2022_PROGRAM_ID
      )
    );

    await wallet.sendTransaction(transaction3, connection);
    
    console.log('Token created successfully');
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Solana Token Launchpad</h1>
      <div className="space-y-4">
        
        <input 
          type="text" 
          className="px-4 py-2 border rounded-md w-80" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="text" 
          className="px-4 py-2 border rounded-md w-80" 
          placeholder="Symbol" 
          value={symbol} 
          onChange={(e) => setSymbol(e.target.value)}
        />
        <input 
          type="text" 
          className="px-4 py-2 border rounded-md w-80" 
          placeholder="Image URL" 
          value={uri} 
          onChange={(e) => setUri(e.target.value)}
        />
        <input 
          type="number" 
          className="px-4 py-2 border rounded-md w-80" 
          placeholder="Initial Supply" 
          value={initialSupply} 
          onChange={(e) => setInitialSupply(Number(e.target.value))}
        />
      </div>
      <button onClick={createToken} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
        Create Token
      </button>
    </div>
  );
}
