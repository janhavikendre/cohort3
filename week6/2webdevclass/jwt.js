const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const JWT_SECRET = "kahi";
app.use(express.json());

const users = [];

app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/index.html')
})

app.post('/signup', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
    });

    res.status(200).send({
        message: "User signed up"
    });
});

app.post('/signin', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(user => user.username === username && user.password === password);

    if (!foundUser) {
        return res.status(401).send({
            message: "Credentials incorrect"
        });
    }

    const token = jwt.sign({
        username: foundUser.username
    }, JWT_SECRET);

    foundUser.token = token;
    res.send({
        token
    });
});

function auth(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).send({ message: "Token is missing" });
    }

    try {
        const decodedData = jwt.verify(token, JWT_SECRET);
        req.username = decodedData.username;
        next();
    } catch (err) {
        res.status(401).send({ message: "Invalid token" });
    }
}

app.get('/me', auth, function(req, res) {
    const foundUser = users.find(user => user.username === req.username);

    if (foundUser) {
        res.send({
            username: foundUser.username
        });
    } else {
        res.status(404).send({
            message: "User not found"
        });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
