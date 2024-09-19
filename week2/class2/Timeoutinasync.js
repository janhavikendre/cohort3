function setTimeoutPrmoisified(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}

async function solve(){
    await setTimeoutPrmoisified(1000);
    console.log('hi');
    await setTimeoutPrmoisified(3000);
    console.log('hello');
    await setTimeoutPrmoisified(5000);
    console.log('hello there');
}
solve();
