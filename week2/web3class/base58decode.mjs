import bs58 from 'bs58';
function base58toUint8Array(base58String){
    return bs58.decode(base58String);
}
const base58 = '9Ajdvzr';
const byteArrayfrombase58 = base58toUint8Array(base58);
console.log(byteArrayfrombase58)