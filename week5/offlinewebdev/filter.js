//filtering
//give an input array , give me back all the even values from iy

const arr = [1,2,3,4,5,6];

// const newArr= [];
// for(let i=0;i<arr.length;i++){
//  if(arr[i]%2 == 0){
//     newArr.push(arr[i]);
//  }   
// }
// console.log(newArr)

// function filterlogic(n){
//     if(n%2 ==0){
//         return true;
//     }else{
//         return false;
//     }
// }
// const ans = arr.filter(filterlogic);
// console.log(ans)

const ans = arr.filter(function(n){
    if(n%2 == 0){
        return true
    }else{
        return false
    }
})
console.log(ans)