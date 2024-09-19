const jwt = require('jsonwebtoken');
const jwtpassword = 'secrete';
const zod = require('zod');

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signjwt(username,password){
    const usernameresponse = emailSchema.safeParse(username);
    const passwordresponse = passwordSchema.safeParse(password);

    if(!usernameresponse.success || !passwordresponse.success){
        return null;
    }

    const signature = jwt.sign({
        username
    },jwtpassword)
    return signature;
}

function verifyjwt(token){
    let ans = true;
    try{
      jwt.verify(token,jwtpassword);

    }catch(e){
        return false
    }
    return ans

}

function decodeJWT(token){
    const decode = jwt.decode(token);
    if(decode){
        return true;
    }else{
        return false
    }
}
const token = signjwt("yash@gmail.com","sgeeeugsu");
console.log(token)
const verify =decodeJWT(token);
console.log(verify)
const yash =verifyjwt(token);
console.log(yash)
