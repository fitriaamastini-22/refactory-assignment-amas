const CryptoJS = require("./plugins/crypto-js");

class Hash {
	static md5 (str) {
	  return CryptoJS.MD5(str).toString();

	}

	static sha1 (str) {
	  return CryptoJS.SHA1(str).toString();
	}

	static sha256 (str) {
	  return CryptoJS.SHA256(str).toString();
	}

	static sha512 (str) {
		return CryptoJS.SHA512(str).toString();
	 }
}

console.log( Hash.md5('secret') ); // 5ebe2294ecd0e0f08eab7690d2a6ee69

console.log( Hash.sha1('secret') ); // e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4

console.log( Hash.sha256('secret') ); // 2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b

console.log( Hash.sha512('secret') ); // bd2b1aaf7ef4f09be9f52ce2d8d599674d81aa9d6a4421696dc4d93dd0619d682ce56b4d64a9ef097761ced99e0f67265b5f76085e5b0ee7ca4696b2ad6fe2b2