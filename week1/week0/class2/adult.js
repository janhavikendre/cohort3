function filterAdultUsers(users) {
    return users.filter(function(user) {
        return user.age > 18;
    });
}


const users = [
    { name: 'Yash', age: 19 },
    { name: 'Aditya', age: 20 },
    { name: 'Raj', age: 13 },
    { name: 'Mayank', age: 17 }
];

const adultUsers = filterAdultUsers(users);

console.log(adultUsers); 


