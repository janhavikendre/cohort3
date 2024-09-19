function asciitoBytes(asciiString){
    const byteArray = [];
    for(let i=0;i<asciiString.length;i++){
        byteArray.push(asciiString.charCodeAt(i));
    }
    return byteArray;
}
const ascii = "yash";
const byteArray = asciitoBytes(ascii);
console.log(byteArray)