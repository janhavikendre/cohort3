
//3ikRaz2j18FLdTiSKyBYKAhrd6AxXcFR4WGjbTSNiJBc1DE6BJsKf7tohPsgMZWUvFt9ZH391b9B69pRmDkWF535
//This is my private key of one of the wallet you use yours annd convert it into an array
const web3 = require("@solana/web3.js");
const bs58 = require('bs58');


const address = '3ikRaz2j18FLdTiSKyBYKAhrd6AxXcFR4WGjbTSNiJBc1DE6BJsKf7tohPsgMZWUvFt9ZH391b9B69pRmDkWF535'
const bytes = bs58.decode(address)
console.log(`[${web3.Keypair.fromSecretKey(bytes).secretKey}]`);
