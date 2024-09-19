const crypto = require('crypto');

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text){
    const cipher = crypto.createCipheriv('aes-256-cbc',key,iv)
    let encrypted = cipher.update(text,'utf8','hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const textToEncrypt = "Yashvardhan";
const encryptedtext = encrypt(textToEncrypt);
const decryptedtext = decrypt(encryptedtext);

console.log(textToEncrypt);
console.log(encryptedtext);
console.log(decryptedtext);