const fs = require('fs');
function readFilePromise(filepath,encoding='utf-8'){
    return new Promise((resolve,reject)=>{
        fs.readFile(filepath,encoding,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}

readFilePromise('a.txt')
.then(data=>console.log(data))
.catch(error=>console.log(error));