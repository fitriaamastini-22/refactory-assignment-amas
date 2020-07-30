const CryptoJS = require("./plugins/crypto-js");

class Cipher{
	static encrypt(raw_message, key){
		return CryptoJS.AES.encrypt(raw_message, key).toString();
	}

	static decrypt(encrypt_message, key){
		return CryptoJS.AES.decrypt(encrypt_message, key).toString(CryptoJS.enc.Utf8) ;
	}
}

const message = Cipher.encrypt('Ini tulisan rahasia', 'p4$$w0rd');

console.log(message); // Anyone without password can't read this message

const decryptedMessage = Cipher.decrypt(message, 'p4$$w0rd');

console.log(decryptedMessage); // Ini tulisan rahasia