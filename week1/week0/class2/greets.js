function greetUser(user) {
    let title;

    if (user.gender.toLowerCase() === 'male') {
        title = 'Mr.';
    } else if (user.gender.toLowerCase() === 'female') {
        title = 'Mrs.';
    } else {
        title = 'Others';
    }   

   

    console.log(`Hi ${title} ${user.name}, your age is ${user.age}.`);
}


const newUser = {
    name: 'Yash',
    age: 19,
    gender: 'male'
};

greetUser(newUser);

