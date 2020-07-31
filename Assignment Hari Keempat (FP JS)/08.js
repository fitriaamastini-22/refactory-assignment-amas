String.prototype.capitalize = function() {
	arr_word = this.split(" ");
	for(idx in arr_word){
		arr_word[idx] = arr_word[idx].charAt(0).toUpperCase() + arr_word[idx].slice(1);
	}
    return arr_word.join(" ");
}

const randomString = (length) => {
	let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

class Str{
	static lower(str){
		return str.toLowerCase();
	}

	static upper(str){
		return str.toUpperCase();
	}

	static capitalize(str){
		return str.capitalize();
	}

	static reverse(str){
		let splitString = str.split("");
		let reverseArray = splitString.reverse(); 
		let joinArray = reverseArray.join(""); 
		return joinArray; // "olleh"
	}

	static contains(str, containWords){
		if( typeof containWords === 'string' ){
			// console.log("string");
			return str.includes(containWords);
		}
		else if ( Array.isArray(containWords) ){
			// console.log("array");
			let matching = 0;

			for(let word of containWords){
				if(str.includes(word)){
					matching+= 1;
				}
			}

			if(matching == containWords.length){
				return true;
			}
			return false;
		}
		// else if( typeof containWords === 'object' ){
		// 	//console.log("object");
		// }
	}

	static random(length=16){
		return randomString(length);
	}

	static slug(title, sep = '-'){
		return title.replace(/[^a-zA-Z0-9 ]/g,"").replace(/[ \t]{2,}/g," ").toLowerCase().split(" ").join(sep);
	}

	static count(str){
		return str.length;
	}

	static countWords(str){
		return str.replace(/[^a-zA-Z0-9 ]/g,"").replace(/[ \t]{2,}/g," ").toLowerCase().split(" ").length;
	}

	static trim(str, maxLength = 100, wrapStr = "..."){
		let newStr = str.substring(0, maxLength);

		if (str.length > maxLength){
			newStr += wrapStr;
		}
		return newStr;
	}

	static trimWords(str, maxWord = 30, wrapStr = "..."){
		const arr_words = str.split(" ");
		const trimming_words = arr_words.splice(0, maxWord);
		let newStr = trimming_words.join(" ");
		if (arr_words.length > maxWord){
			newStr += wrapStr;
		}
		return newStr;
	}
}

console.log(Str.lower('MAKAN'));
console.log(Str.upper('malam'));
console.log(Str.capitalize('saya ingin makan'));
console.log(Str.reverse('kasur'));
console.log(Str.contains('Saya ingin makan sate', 'makan'));
console.log(Str.contains('Saya ingin makan sate', 'rujak'));
console.log(Str.contains('Saya ingin makan sate', ['sate', 'rujak']));
console.log(Str.random() );
console.log(Str.random(6) );
console.log(Str.random(32) );

const title = 'JavaScript, TypeScript & Dart - Bahasa mana yang akan populer di 2018?';
console.log(Str.slug(title) );
console.log(Str.slug(title, '_') );
console.log(Str.count('lorem ipsum'));
console.log(Str.countWords('lorem ipsum')); // 2

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

console.log(Str.trim('Less than 100 characters')); // Less than 100 characters

console.log(Str.trim(text)); // Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...

console.log(Str.trim(text, 20)); // Lorem ipsum dolor si...

console.log(Str.trim(text, 20, '·····')); // Lorem ipsum dolor si·····

//coba trim word


console.log(Str.trimWords('Less than 30 words')); // Less than 30 words

console.log(Str.trimWords(text)); // Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi...

console.log(Str.trimWords(text, 3)); // Lorem ipsum dolor...

console.log(Str.trimWords(text, 3, '·····')); // Lorem ipsum dolor·····