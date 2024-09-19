function hextoArray(hexString){
    const byteArray = new Uint8Array(hexString.length);
    for(let i=0;i<byteArray.length;i++){
        byteArray[i]= parseInt(hexString.substr(i*2,2),16);
    }
    return byteArray;
}

const hex = "48656c6c6f";
const byteArrayFromHex = hextoArray(hex);
console.log(hex);