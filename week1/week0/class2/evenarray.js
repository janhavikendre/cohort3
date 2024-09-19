function getEvenNumbers(numbers) {
    return numbers.filter(function(number) {
        return number % 2 === 0;
    });
}


const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = getEvenNumbers(inputArray);

console.log(evenNumbers); 

