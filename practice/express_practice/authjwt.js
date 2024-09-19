const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRTE = "kahipn";
app.use(express.json());

const users = [];

function auth(req, res, next) {
    const token = req.headers.authorization;
    
    
    console.log("Authorization header:", token); 

    if (token) {
        
        const auth = token.split(' ')[1];
        
        
        console.log("Extracted token:", auth);

        jwt.verify(auth, JWT_SECRTE, (err, decode) => {
            if (err) {
                console.log("JWT verification error:", err); 
                return res.status(401).send({
                    message: "Unauthorized"
                });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        return res.status(401).send({
            message: "Unauthorized"
        });
    }
}

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
    });

    res.send({
        message: "Signed up"
    });
});

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        const token = jwt.sign({ username: user.username }, JWT_SECRTE);
        
        
        console.log("Generated token:", token);
        
        return res.status(200).send({ token });
    }
    
    return res.status(403).send({ message: "Invalid username or password" });
});

app.get('/me', auth, (req, res) => {
    const user = req.user;
    
    
    console.log("Authenticated user:", user);
    
    res.send({
        username: user.username
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
