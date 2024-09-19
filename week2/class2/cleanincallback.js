const fs = require('fs');

function cleanfile(filepath,cb){
    fs.readFile(filepath,"utf-8",function(err,data){
     data = data.trim();
     fs.writeFile(filepath,data,function(){
        cb()
     })
    })
}

function onDone(){
    console.log("File cleaned")
}
cleanfile("a.txt",onDone)
