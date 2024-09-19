function bytestoasci(byteArray){
    return byteArray.map(byte=>String.fromCharCode(byte)).join('');
}
const bytes = [72,101,108,108,111];
const assccistring = bytestoasci(bytes);
console.log(assccistring)