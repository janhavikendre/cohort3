const { createMint } = require('@solana/web3.js');
const { Keypair, Connection, SystemProgram, Transaction } = require('@solana/web3.js');

const payer = Keypair.fromSecretKey(Uint8Array.from([136,9,86,200,24,230,172,10,89,196,187,18,247,133,143,235,62,103,141,147
    ,228,51,246,32,15,51,143,152,186,36,6,138,228,70,210,57,183,176,242,247
    ,188,156,165,19,237,248,147,1,231,162,20,181,24,99,221,86,16,220,51,56
    ,149,229,30,232]));

const connection = new Connection('https://api.devnet.solana.com');

async function main(){
    const newAccount = Keypair.generate();
    const owner = Keypair.generate();
    const TOTAL_BYTES = 165;
    const lamports = await connection.getMinimumBalanceForRentExemption(TOTAL_BYTES);
    const transaction = new Transaction();
    transaction.add(
        SystemProgram.createAccount({
        fromPubkey : payer.publicKey,
        newAccountPubkey:newAccount.publicKey,
        lamports:lamports,
        space:TOTAL_BYTES,
        programId:owner.publicKey
        })
    )
    await connection.sendTransaction(transaction, [payer, newAccount]);
    console.log(`New account created at ${newAccount.publicKey.toBase58()}`);
}
main()