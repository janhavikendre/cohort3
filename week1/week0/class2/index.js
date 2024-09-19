function getAdultUsers(users) {
    return users.filter(user => user.age > 18);
}

const users = [{
    name:"yash",
    age:18
},{
    name:"aditya",
    age:20
},{
    name:"raj",
    age:16
}];


console.log(getAdultUsers(users));
console.log(getAdultUsers(users)); 
