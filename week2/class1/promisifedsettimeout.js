function delay(ms){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

delay(1000).then(() => {
    console.log('Hello');
    return delay(1000);

})