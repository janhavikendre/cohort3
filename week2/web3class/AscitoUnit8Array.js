function assccistring(asciiString){
    return new Uint8Array([...asciiString].map(char=>char.charCodeAt(0)));
}
const ascii = "yash";
const byteArray = assccistring(ascii);
console.log(byteArray);