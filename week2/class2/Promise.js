function setPromisifed(ms){
    return new Promise(resolve=>setTimeout(resolve, ms));
}

function callback(){
    console.log('3 seconds to go');
}
setPromisifed(3000).then(callback);