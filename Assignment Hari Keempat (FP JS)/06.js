const convertToAsterisk = (word)  => {
    let asteriskSentence = '';
    for(let asterisks=0;asterisks<word.length;asterisks++) {
        asteriskSentence+='*';
    }
    return asteriskSentence;
}


const censoringWord = (sentence, bannedWords) => {
	

	for(let word=0; word < bannedWords.length; word++) {
	    sentence = sentence.replace(bannedWords[word], convertToAsterisk(bannedWords[word]));
	}

	return sentence;
}

const bannedWords = ["dolor", "elit", "quis", "nisi", "fugiat", "proident", "laborum"];
const sentence    = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

console.log(censoringWord(sentence, bannedWords));