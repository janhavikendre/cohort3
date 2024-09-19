const fs = require('fs');

function cleanfile(filepath,cb){
    return new Promise(function(resolve){
        fs.readFile(filepath,"utf-8",function(err,data){
            data = data.trim();
            fs.writeFile(filepath,data,function(){
                resolve()})
        })
    })
}

async function main(){
    await cleanfile("a.txt");
    console.log("File cleaned");
}
main();