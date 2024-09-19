import {Keypair} from "@solana/web3.js";
import { sign } from "crypto";
import nacl from "tweetnacl";

const keypair = Keypair.generate();
const publickey = keypair.publicKey.toString();
const secretKey = keypair.secretKey;

console.log("Public key :",publickey);
console.log("private Key (Secret Key):",secretKey);

const message = new TextEncoder().encode("Hello,world!");
const signature = nacl.sign.detached(message, secretKey);

const result = nacl.sign.detached.verify(
    message,
    signature,
    keypair.publicKey.toBytes(),
)

console.log(result);
