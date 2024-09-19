function greet(user){
    return `Hi  ${user.name}, you are ${ user.age}  years old`;
}

console.log(greet({
    name:"yash",
    age:19
}))
