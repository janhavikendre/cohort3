const fs = require('fs');

function dealy(ms){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        },ms);
    })

}
function fetchwithPromise(url,options){
    return new Promise((resolve,reject)=>{
        fetch(url,options)
        .then(response=>{
            if(response.ok){
                resolve(response.json());
            }else{
                reject(response.statusText);
            }
        })
        .catch(error=>{
            reject(error);
        });
    });
}

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

async function example(){
    await dealy(1000);
    console.log('Hello');

    try{
        const data = await fetchwithPromise('https://jsonplaceholder.typicode.com/posts/1');
        console.log(data);
    }catch(error){
        console.log(error);
    }   

    try{
        const filecontent = await readFilePromise('./a.txt');
        console.log(filecontent);

    }catch(error){
        console.log(error);
    }   
}