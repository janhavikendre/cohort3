
//craete a map function that takes 2 inputs 
//an array and a transformation callback/fn
//and transforms that array into a new one using the transformation fn

function yash(array,transformation){
    return array.map(transformation)
}

const numbers = [1,2,3,4,5];
const doubled = yash(numbers,num=>num*2);
console.log(doubled)