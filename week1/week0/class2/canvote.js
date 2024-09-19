function canvote(age){
    if(age>=18){
        return true;
    }else{
        return false;
    }
}

var age = canvote(20);
console.log(age);
