//[1,2,3,4,5]
//[2,4,6,8,10]



// const input = [1,2,3,4,5];
// const newArray = [];
// for(let i=o;i<input.length;i++){
//     newArray.push(input[i]*2);
// }
// console.log(newArray)


//one solution
// const input = [1,2,3,4,5]
// function TransformStrea(i){
// return i*2
// }
// const ams = input.map(TransformStrea)
// console.log(ams)

const input = [1,2,3,4,5]

const ans = input.map(function(i){
    return i*2;
})
console.log(ans)
