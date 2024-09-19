function greetUser(user) {
    let title;

    if (user.gender.toLowerCase() === 'male') {
        title = 'Mr.';
    } else if (user.gender.toLowerCase() === 'female') {
        title = 'Mrs.';
    } else {
        title = 'Others';
    }

    let votingEligibility = user.age >= 18 ? 'You are legal to vote.' : 'You are not legal to vote yet.';

    console.log(`Hi ${title} ${user.name}, your age is ${user.age}. ${votingEligibility}`);
}


const newUser = {
    name: 'Yash',
    age: 19,
    gender: 'male'
};

greetUser(newUser);

